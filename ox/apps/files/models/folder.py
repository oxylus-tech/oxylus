from __future__ import annotations

from pathlib import Path
import shutil

from django.db import models
from django.core.exceptions import ValidationError
from django.utils.translation import gettext_lazy as _

from ox.utils.models import Named, Timestamped, ChildOwned, ChildOwnedQuerySet
from ox.utils.models.tree import TreeNode, TreeNodeQuerySet

from ..conf import ox_files_settings


__all__ = (
    "FolderQuerySet",
    "Folder",
    "validate_name",
)


def validate_name(value):
    """Validate folder or file name."""
    if "/" in value:
        raise ValidationError(_("The character `/` is forbidden in name."))


class FolderQuerySet(ChildOwnedQuerySet, TreeNodeQuerySet):
    def find_clone(self, node, **lookups) -> FolderQuerySet:
        lookups["owner_id"] = node.owner_id
        return super().find_clone(node, **lookups)


class Folder(Named, Timestamped, ChildOwned, TreeNode):
    """
    Represent a folder in which files are stored.

    There are two kind of folders:

        - virtual folder (default): the folder structure is only stored in the database, while file names and storage are obfuscated.

          The files are saved under :py:attr:`..conf.Settings.UPLOAD_DIR` directory.

        - synchronized folder: the directory structure and file name are synchronized on the file system (to be used by external tools, not for direct user's decision).

          The folders and files are saved and synchronized under :py:attr:`..conf.Settings.SYNC_DIR`.

    Once a folder is a assigned a type, all its children and files will be impacted. To avoid filesystem synchronisation issues this value can not be changed afterward.

    Important Notes
    ---------------

    Updating :py:attr:`parent`, :py:attr:`name` and :py:attr:`path` should not be done manually. Instead use
    :py:meth:`rename` and :py:meth:`move_to` methods to ensure that these values are correctly set.

    When thoses values raise a ValidationError, user should assume that new values of the model are invalid.
    """

    name = models.CharField(_("Name"), max_length=64, validators=[validate_name])
    is_sync = models.BooleanField(
        _("Synchronize"), default=False, help_text=_("Files and folders are synchronized to filesystem. ")
    )
    """
    This attribute allows to synchronize files and folder on the file system instead of being obfuscated.

    Once set, this attribute should never be changed in order to avoid
    desynchronization.

    The folders will be put under directory following this convention:
    ``{ox_files_settings}/{owner__uuid}/{path}``.
    """

    objects = FolderQuerySet.as_manager()

    parent_attr = "parent"
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

    def validate_node(self):
        """
        Validate node for name collision (folder & file) and owner.

        :yield PermissionDenied: owner is not the same as parent's.
        :yield ValidationError: a file or folder already exists with this name in parent.
        """
        # import here to avoid circular dependencies
        from .file import File

        init_path = self.path

        if self.parent:
            self.is_sync = self.parent.is_sync

        super().validate_node()

        if File.objects.filter(folder=self.parent, name=self.name):
            raise ValidationError({"name": f"A file `{self.name}` already exists in {self.parent.name}."})

        self.is_sync and self.sync(init_path)

    def sync(self, initial_path: str | None = None) -> Path:
        """Synchronize folder with filesystem

        :param initial_path: original path before it has been moved (as :py:attr:`path` value).
        :return the path on file system
        :yield ValueError: when folder is not synchronized (:py:attr:`is_sync`).
        """
        if not self.is_sync:
            raise ValueError("This folder can not be synchronized with filesystem.")

        initial_path = initial_path and self.get_sync_path(initial_path)
        path = self.get_sync_path(self.path)
        if initial_path and initial_path.exists():
            shutil.move(initial_path, path)
        else:
            path.mkdir(parents=True, exist_ok=True)
        return path

    def get_sync_path(self, path) -> Path:
        """Return synchronization directory for the provided folder path."""
        if path.startswith("/"):
            path = path[1:]
        return ox_files_settings.sync_dir / str(self.owner.uuid) / path
