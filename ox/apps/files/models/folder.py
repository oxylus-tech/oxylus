from __future__ import annotations

from pathlib import Path
import shutil

from django.db import models
from django.core.exceptions import ValidationError
from django.utils.translation import gettext_lazy as _

from ox.apps.content.models import Message
from ox.utils.models import Described, Timestamped
from ox.utils.models.tree import OwnedTreeNode, OwnedTreeNodeQuerySet


__all__ = (
    "FolderQuerySet",
    "Folder",
    "validate_name",
    "FolderComment",
)


def validate_name(value):
    """Validate folder or file name."""
    if "/" in value:
        raise ValidationError(_("The character `/` is forbidden in name."))


class FolderQuerySet(OwnedTreeNodeQuerySet):
    def find_clone(self, node, **lookups) -> FolderQuerySet:
        lookups["owner_id"] = node.owner_id
        return super().find_clone(node, **lookups)


class Folder(Described, Timestamped, OwnedTreeNode):
    """
    Represent a folder in which files are stored.

    .. important::

        Updating :py:attr:`parent`, :py:attr:`name` and :py:attr:`path` should not be done manually. Instead use
        :py:meth:`rename` and :py:meth:`move_to` methods to ensure that these values are correctly set.

        When thoses values raise a ValidationError, user should assume that new values of the model are invalid.

    """

    name = models.CharField(_("Name"), max_length=64, validators=[validate_name])

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

    def on_save(self, fields=None):
        # set tree id to owner's id: this ensure that any file posted for
        # a specific owner will be in the same tree.
        self.tree_id = self.owner_id
        super().on_save(fields)

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

        initial_path = initial_path and self.resolve(initial_path)
        path = self.resolve(self.path)
        if initial_path and initial_path.exists():
            shutil.move(initial_path, path)
        else:
            path.mkdir(parents=True, exist_ok=True)
        return path


class FolderComment(Message):
    """Message to a file"""

    thread = models.ForeignKey(Folder, models.CASCADE, related_name="comments", verbose_name=_("Folder"))

    class Meta:
        verbose_name = _("Comment")
        verbose_name_plural = _("Comments")
