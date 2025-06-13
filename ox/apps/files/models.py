from __future__ import annotations

from uuid import uuid4

from django.db import models
from django.conf import settings
from django.core.exceptions import PermissionDenied, ValidationError
from django.utils.translation import gettext_lazy as _

from caps.models import Owned, OwnedQuerySet
from ox.utils.models import Named, Described, Timestamped, SaveHook, SaveHookQuerySet
from ox.utils.models.tree import TreeNode, TreeNodeQuerySet

from .conf import ox_files_settings
from . import processors


__all__ = ("file_upload_to", "FolderQuerySet", "Folder", "FileQuerySet", "File")


class FolderQuerySet(OwnedQuerySet, TreeNodeQuerySet):
    def find_clone(self, node, **lookups) -> FolderQuerySet:
        lookups["owner_id"] = node.owner_id
        return super().find_clone(node, **lookups)


class Folder(Named, Timestamped, Owned, TreeNode):
    """
    Represent a virtual File folder. This is how they are addressed and
    organised from user point of view.

    Internally it is stored in obfuscated way.

    Important Notes
    ---------------

    Updating :py:attr:`parent`, :py:attr:`name` and :py:attr:`path` should not be done manually. Instead use
    :py:meth:`rename` and :py:meth:`move_to` methods to ensure that these values are correctly set.

    When those values raises a ValidationError, user should assume that values of the model are invalid.
    """

    objects = FolderQuerySet.as_manager()

    root_grants = {
        "ox_files.view_folder": 3,
        "ox_files.add_folder": 1,
        "ox_files.change_folder": 1,
        "ox_files.delete_folder": 1,
        "ox_files.view_file": 3,
        "ox_files.add_file": 1,
        "ox_files.change_file": 1,
        "ox_files.delete_file": 1,
    }

    class Meta:
        verbose_name = _("Folder")
        verbose_name_plural = _("Folders")
        constraints = [models.UniqueConstraint("parent", "name", "owner", name="unique_folder_name")]

    def validate_node(self):
        """
        Validate node for name collision (folder & file) and owner.

        :yield PermissionDenied: owner is not the same as parent's.
        :yield ValidationError: a file or folder already exists with this name in parent.
        """
        super().validate_node()

        # This rule ensure that any child will be owned by the same
        # agent than the parents.
        if self.parent and self.parent.owner_id != self.owner.id:
            raise PermissionDenied(f"Owner of `{self.name}` directory should be the same.")

        if File.objects.filter(folder=self.parent, name=self.name):
            raise ValidationError({"name": f"A file `{self.name}` already exists in {self.parent.name}."})

    def rename(self, name: str, save: bool = True):
        """Rename folder."""
        if name != self.name:
            self.name = name
            if save:
                self.save()
            else:
                self.on_save()

    def move_to(self, parent: Folder | None = None, name: str | None = None, save: bool = True):
        """Move folder into provided parent folder or root.

        :param parent: parent folder
        :param name: if provided rename folder
        :param save: save node
        """
        if (name and name != self.name) or parent.id != self.parent_id:
            if name:
                self.name = name
            super().move_to(parent, save)


class FileQuerySet(SaveHookQuerySet, OwnedQuerySet):
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


def file_upload_to(instance, filename):
    """Return target upload file."""
    ext = filename.split(".")[-1]
    return f"{ox_files_settings.UPLOAD_TO}/{uuid4()}.{ext}"


class File(Described, Timestamped, SaveHook, Owned):
    """
    This class represent a file.

    Files are looked up for a matching :py:class:`~.processors.FileProcessor` (reading mime-type). A processors
    handles different tasks such as creating preview (thumbnails) or getting metadata. In order to do so, it uses
    :py:data:`~.processors.registry` that provides helpers to read mime types and register file processors.

    A file can be nested under a :py:attr:`parent` folder. If ``None`` is provided, then it will be at the root of
    the filesystem.

    Each file is also attached to an :py:attr:`owner` that specifies who has
    access to the object (using ``django-caps`` permission system).

    At deletion, related files and previews can be deleted based on ``.conf.ox_files_settings`` (``CLEAR_FILES_ON_DELETE=True`` option).
    """

    # When folder is null, it is at root
    folder = models.ForeignKey(Folder, models.CASCADE, null=True, blank=True, related_name="files")

    name = models.CharField(_("Name"), max_length=128)
    file = models.FileField(_("File"), upload_to=file_upload_to, null=True)
    preview = models.FileField(_("Preview"), null=True, blank=True)
    mime_type = models.CharField(_("Mime Type"), max_length=127, blank=True)
    file_size = models.PositiveIntegerField(_("File Size"), blank=True, default=0)

    caption = models.TextField(
        _("Caption"), default="", help_text=_("Displayed below object when rendered."), blank=True, null=True
    )
    alternate = models.TextField(
        _("Alternate text"),
        default="",
        help_text=_("Displayed as replacement text when object is not displayed."),
        blank=True,
        null=True,
    )
    ariaDescription = models.TextField(_("ARIA Description"), default="", blank=True, null=True)
    metadata = models.JSONField(_("Metadata"), default=dict, blank=True)

    objects = FileQuerySet.as_manager()

    class Meta:
        verbose_name = _("File")
        verbose_name_plural = _("Files")

    def on_save(self, fields=None):
        """Ensure mime type and file validation."""
        self.validate_node()

    def validate_node(self):
        """
        Ensure file name is unique within folder.

        :yield ValidationError: if file name is already present in folder (file or folder).
        """
        if self.folder_id and self.owner_id != self.folder.owner_id:
            raise PermissionDenied("Owner of this file should be the same as its directory.")

        kw = {"name": self.name, "owner": self.owner}

        query = File.objects.filter(folder_id=self.folder_id, **kw)
        if self.pk:
            query = query.exclude(pk=self.pk)

        if query.exists():
            raise ValidationError({"name": "Another file exists for this path."})

        if Folder.objects.filter(parent_id=self.folder_id, **kw):
            raise ValidationError({"name": "A folder exists for this path."})

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

    def clear_files(self):
        """Delete files from storage.

        This method is used to clear storage when the model instance is deleted. It updates fields without saving model instance.
        """
        if self.preview:
            self.preview.delete(False)
        if self.file:
            self.file.delete(False)

        self.preview = None
        self.file = None

    def delete(self, *args, clear_files: bool | None = None, **kwargs):
        """
        Ensure file deletion if ``OX_FILES['CLEAR_FILES_ON_DELETE']`` or
        ``clear_files`` is True.

        :param *args: forward to super's ``delete()``
        :param clear_files: if True or False, overrides default settings.
        :param **kwargs: forward to super's ``delete()``
        """
        if clear_files is None:
            clear_files = ox_files_settings.CLEAR_FILES_ON_DELETE
        if clear_files:
            self.clear_files()
        return super().delete(*args, **kwargs)
