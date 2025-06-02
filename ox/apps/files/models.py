from __future__ import annotations

from uuid import uuid4

from django.db import models
from django.core.exceptions import PermissionDenied, ValidationError
from django.utils.translation import gettext_lazy as _

from model_utils.managers import InheritanceQuerySet

from caps.models import Object, ObjectQuerySet
from ox.utils.models import Named, Timestamped, TreeNode, TreeNodeQuerySet

from .conf import ox_files_settings
from . import processors


__all__ = ("file_upload_to", "FolderQuerySet", "Folder", "FileQuerySet", "File")


def file_upload_to(instance, filename):
    """Return target upload file."""
    ext = filename.split(".")[-1]
    return f"{ox_files_settings.UPLOAD_TO}/{uuid4()}.{ext}"


class FolderQuerySet(ObjectQuerySet, TreeNodeQuerySet):
    pass


class Folder(Named, Timestamped, Object, TreeNode):
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

        if File.objects.filter(parent=self.parent, name=self.name):
            raise ValidationError(f"A file `{self.name}` already exists in {self.parent.name}.")

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


class FileQuerySet(InheritanceQuerySet, ObjectQuerySet):
    pass


class File(Named, Timestamped, Object):
    """
    Base class for files.

    It assumes that sub-classing models will provide a field ``file`` with
    an interface similar to FileField.
    """

    # When folder is null, it is at root
    parent = models.ForeignKey(Folder, models.CASCADE, null=True, blank=True, related_name="files")

    file = models.FileField(_("File"), upload_to=file_upload_to)
    preview = models.FileField(_("Preview"), upload_to=file_upload_to, null=True, blank=True)
    mime_type = models.CharField(_("Mime Type"), max_length=127, blank=True)
    file_size = models.PositiveIntegerField(_("File Size"), blank=True)
    preview_size = models.PositiveIntegerField(_("Preview file size"), blank=True, default=0)

    caption = models.TextField(_("Caption"), default="", help_text=_("Displayed below object when rendered."))
    alternate = models.TextField(
        _("Alternate text"), default="", help_text=_("Displayed as replacement text when object is not displayed.")
    )
    description = models.TextField(
        _("Description"), default="", help_text=_("Description used at rendering for people using screen-readers.")
    )
    metadata = models.JSONField(_("Metadata"), default=dict, blank=True)

    objects = FileQuerySet.as_manager()

    class Meta:
        verbose_name = _("File")
        verbose_name_plural = _("Files")

    def get_processor(
        self, save: bool = True, registry: processors.FileProcessors = processors.registry
    ) -> processors.FileProcessor:
        """Return processor to use for this file type.

        Read mime-type from file if not already set.

        :param save: save model if mime type is updated (default is True)
        :param registry: use this processors instead of :py:data:`.processors.processors`
        """
        if not self.mime_type:
            self.mime_type = registry.read_mime_type(self.file.path)
        return registry.find(self.mime_type)

    def delete_files(self, save=True):
        """Delete files on storage.

        This method is used to clear storage when the model instance is deleted.

        :param save: save model instance if True (default).
        """
        try:
            if self.preview:
                self.preview.delete(False)
            if self.file:
                self.file.delete(False)
        finally:
            save and self.save()
