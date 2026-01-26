from __future__ import annotations

from pathlib import Path
import shutil

from django.db import models
from django.core.exceptions import ValidationError
from django.utils.translation import gettext_lazy as _

from ox.apps.content.models import Message
from ox.utils.models import Described, Timestamped
from ox.utils.models.tree import OwnedTreeNode, OwnedTreeNodeQuerySet
from .. import conf


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

    def abs_path(self) -> Path:
        """File system path of the folder."""
        return conf.resolve(self.path, self.owner.uuid)

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

        super().validate_node()

        if File.objects.filter(folder=self.parent, name=self.name):
            raise ValidationError({"name": f"A file `{self.name}` already exists in {self.parent.name}."})

    def sync_node(self, source_path: str | None = None, target_path: str | None = None):
        """Synchronize folder with filesystem (move or create it)."""
        source_p = source_path and conf.resolve(source_path, self.owner.uuid)
        target_p = conf.resolve(target_path, self.owner.uuid)

        if target_p.exists():
            raise ValueError(f"A file or directory already exists at `{target_p}`.")

        if source_p and source_p.exists():
            shutil.move(source_p, target_p)
        else:
            target_p.mkdir(parents=True, exist_ok=True)

        super().sync_node(source_path, target_path)

    def delete(self):
        path = conf.resolve(self.path, self.owner.uuid)
        if path.exists():
            path.rmdir()
        super().delete()


class FolderComment(Message):
    """Message to a file"""

    thread = models.ForeignKey(Folder, models.CASCADE, related_name="comments", verbose_name=_("Folder"))

    class Meta:
        verbose_name = _("Comment")
        verbose_name_plural = _("Comments")
