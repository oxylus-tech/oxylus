from __future__ import annotations

from functools import cached_property
from pathlib import Path
import os
import shutil

from django.db import models, transaction
from django.conf import settings
from django.core.exceptions import ValidationError, PermissionDenied
from django.utils.translation import gettext_lazy as _
from django.urls import reverse

from ox.apps.content.models import Message
from ox.utils.models import Described, Timestamped, ChildOwned, ChildOwnedQuerySet

from ..conf import ox_files_settings
from .. import processors
from .folder import Folder, validate_name


__all__ = ("FileQuerySet", "File", "file_upload_to")


class FileQuerySet(ChildOwnedQuerySet):
    def delete(self, clear_files: bool | None = None):
        if clear_files is None:
            clear_files = ox_files_settings.CLEAR_FILES_ON_DELETE

        if clear_files:
            self.clear_files(update=False)
        return super().delete()

    def clear_files(self, update: bool = True):
        """
        Delete files from filesystem and optionally update fields.

        :param update: if True (default), update queryset fields.
        """
        for file, preview in self.values_list("file", "preview"):
            (settings.MEDIA_ROOT / file).unlink(missing_ok=True)
            preview and (settings.MEDIA_ROOT / preview).unlink(missing_ok=True)

        if update:
            self.update(file=None, preview=None)


def file_upload_to(instance, filename) -> str:
    """Return target upload file depending on whether the folder is synchronized or not."""
    if instance.folder:
        path = Path(instance.folder.path) / filename
    else:
        path = filename
    return ox_files_settings.resolve(str(path), instance.owner.uuid, relative=True)


class File(Described, Timestamped, ChildOwned):
    """
    This class represent a file.

    Files are looked up for a matching :py:class:`~.processors.FileProcessor` (reading mime-type). A processors
    handles different tasks such as creating preview (thumbnails) or getting metadata. In order to do so, it uses
    :py:data:`~.processors.registry` that provides helpers to read mime types and register file processors.

    A file can be nested under a :py:attr:`parent` folder. If ``None`` is provided, then it will be at the root of
    the filesystem.

    Each file is also attached to an :py:attr:`owner` that specifies who has
    access to the object (using ``django-caps`` permission system).

    At deletion, related files and previews are deleted based on ``.conf.ox_files_settings`` (``CLEAR_FILES_ON_DELETE=True`` option).
    """

    # When folder is null, it is at root
    folder = models.ForeignKey(Folder, models.CASCADE, related_name="files", verbose_name=_("Folder"))

    name = models.CharField(_("Name"), max_length=128, validators=[validate_name])
    file = models.FileField(_("File"), upload_to=file_upload_to, null=True)
    preview = models.FileField(_("Preview"), null=True, blank=True)
    mime_type = models.CharField(_("Mime Type"), max_length=127, blank=True)
    file_size = models.PositiveIntegerField(_("File Size"), blank=True, default=0)

    caption = models.TextField(
        _("Caption"),
        default="",
        help_text=_("Displayed below object when rendered in page or documents."),
        blank=True,
        null=True,
    )
    alternate = models.TextField(
        _("Alternate text"),
        default="",
        help_text=_("Displayed as replacement text when object is not displayed."),
        blank=True,
        null=True,
    )
    ariaDescription = models.TextField(
        _("ARIA Description"),
        default="",
        blank=True,
        null=True,
        help_text=_("Provide a description of the content for visually impaired people."),
    )
    metadata = models.JSONField(_("Metadata"), default=dict, blank=True)

    parent_attr = "folder"

    objects = FileQuerySet.as_manager()

    class Meta:
        verbose_name = _("File")
        verbose_name_plural = _("Files")
        # FIXME: add unique constraint

    @cached_property
    def file_url(self):
        """Return file url."""
        uuid = self.access and self.access.uuid or self.uuid
        return reverse("serve-file", kwargs={"uuid": uuid})

    @cached_property
    def preview_url(self):
        """Return file preview url."""
        if not self.preview:
            return None
        uuid = self.access and self.access.uuid or self.uuid
        return reverse("serve-file-preview", kwargs={"uuid": uuid})

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self._initial_path = self.file and self.file.path

    def abs_path(self):
        return self.folder.abs_path() / self.name

    def on_save(self, fields=None):
        """Ensure mime type and file validation."""
        super().on_save(fields)
        self.validate_node()

    def validate_node(self):
        """
        Ensure file name is unique within folder.

        :yield ValidationError: if file name is already present in folder (file or folder).
        """
        # TODO: handle file move
        kw = {"name": self.name, "owner": self.owner}

        query = File.objects.filter(folder_id=self.folder_id, **kw)
        if self.pk:
            query = query.exclude(pk=self.pk)

        if query.exists():
            raise ValidationError({"name": "Another file exists for this path."})

        if not self.owner_id:
            self.owner_id = self.folder.owner_id
        elif self.folder.owner_id != self.owner_id:
            raise PermissionDenied("File's owner must be the same as its folder.")

        if Folder.objects.filter(parent_id=self.folder_id, **kw):
            raise ValidationError({"name": "A folder exists for this path."})

    @transaction.atomic
    def move_or_copy(self, path: str, copy: bool = False):
        """Move file by path.

        :param path: path related to upload directory
        """
        file_dest = ox_files_settings.resolve(path, self.owner.uuid)
        if file_dest.exists():
            raise ValueError(f"A file or directory already exists at {file_dest}")

        dir = os.path.dirname(path)
        # folder = self.folder.tree().filter(path=dir)
        folder = Folder.objects.filter(tree_id=self.owner_id, path=dir).first()
        file_src = Path(self.file.path)

        if copy:
            obj = File(
                **{
                    f: getattr(self, f)
                    for f in (
                        "owner",
                        "name",
                        "file",
                        "preview",
                        "mime_type",
                        "file_size",
                        "caption",
                        "description",
                        "ariaDescription",
                        "metadata",
                    )
                }
            )
        else:
            obj = self

        obj.folder = folder
        obj.name = path[len(dir) :]
        obj.file.name = str(file_dest.relative_to(settings.MEDIA_ROOT))

        if copy:
            preview_src = Path(obj.preview.path)
            preview_dest = ox_files_settings.preview_dir / f"{obj.uuid}"
            obj.preview.name = str(preview_dest.relative_to(settings.MEDIA_ROOT))

        # order matters, we save before moving. This is revert in case of
        # error (transaction atomic).
        obj.save()

        if copy:
            shutil.copyfile(str(preview_src), str(preview_dest))
            shutil.copyfile(str(file_src), str(file_dest))
            # preview_src.copy(preview_dest)
            # file_src.copy(file_dest)
        else:
            file_src.rename(file_dest)

    def read_mime_type(self, save: bool = True) -> str:
        """Read mime-type from file and update corresponding field.

        :param save: save object instance
        :return the mime type
        """
        self.mime_type = processors.registry.read_mime_type(self.file.path)
        save and self.save()
        return self.mime_type

    def get_processor(
        self, save: bool = True, registry: processors.FileProcessors = processors.registry
    ) -> processors.FileProcessor:
        """Return processor to use for this file type.

        Read mime-type from file if not already set.

        :param save: save model if mime type is updated (default is True)
        :param registry: use this processors instead of :py:data:`.processors.processors`
        """
        if not self.mime_type:
            self.read_mime_type(save)
        return registry.get(self.mime_type)

    def delete(self, *args, clear_files: bool | None = None, **kwargs):
        """
        Ensure file deletion.

        :param *args: forward to super's ``delete()``
        :param clear_files: if True or False, overrides default settings.
        :param **kwargs: forward to super's ``delete()``
        """
        if self.preview:
            self.preview.delete(False)
        if self.file:
            self.file.delete(False)

        self.preview = None
        self.file = None
        return super().delete(*args, **kwargs)


class FileComment(Message):
    """Message to a file"""

    thread = models.ForeignKey(File, models.CASCADE, related_name="comments", verbose_name=_("File"))

    class Meta:
        verbose_name = _("Comment")
        verbose_name_plural = _("Comments")
