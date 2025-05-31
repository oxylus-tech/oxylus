from __future__ import annotations

import os
from typing import Iterator
from uuid import uuid4

from django.db import models
from django.db.models import Q, Value
from django.db.models.functions import Concat, Substr
from django.utils.translation import gettext_lazy as _

from mptt.models import MPTTModel, MPTTQuerySet, MPTTModelBase, TreeForeignKey
from model_utils.managers import InheritanceQuerySet

from caps.models import Object, ObjectBase, ObjectQuerySet
from ox.utils.models import Named, Timestamped

from .conf import ox_files_settings
from . import processors


__all__ = ("file_upload_to", "FolderBase", "FolderQuerySet", "Folder", "FileQuerySet", "File")


def file_upload_to(instance, filename):
    """Return target upload file."""
    ext = filename.split(".")[-1]
    return f"{ox_files_settings.UPLOAD_TO}/{uuid4()}.{ext}"


class FolderBase(ObjectBase, MPTTModelBase):
    pass


class FolderQuerySet(ObjectQuerySet, MPTTQuerySet):
    def get_parents_lookup_by_paths(self, path):
        q = Q()
        lookup = "name"
        for path in self.get_ancestors_paths(path, reverse=True):
            q |= Q(**{lookup: path})
            lookup = f"parent__{lookup}"

    def get_ancestors_paths(self, path, reverse: bool = False) -> Iterator[str]:
        paths = path.strip("/").split("/")
        slice = (0, len(paths)) if not reverse else (len(path) - 1, -1, -1)
        return ("/" + "/".join(paths[:i]) for i in range(*slice))


class Folder(Named, Timestamped, MPTTModel, Object, metaclass=FolderBase):
    """
    Represent a virtual File folder. This is how they are addressed and
    organised from user point of view.

    Internally it is stored in obfuscated way.
    """

    parent = TreeForeignKey("self", models.CASCADE, null=True, blank=True, related_name="children")
    """
    Parent folder. When null, folder is at root.
    """
    full_path = models.CharField(_("Path"), max_length=256, blank=True, index=True)
    """ Folder's full path. Always starts with a "/". """

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

    class MPTTMeta:
        order_insertion_by = ["name"]

    class Meta:
        verbose_name = _("Folder")
        verbose_name_plural = _("Folders")

    @property
    def dirname(self):
        return os.path.dirname(self.full_path)

    def rename(self, name: str):
        """Rename folder."""
        self.name = name
        self._update_full_path(f"{self.dirname}/{self.name}")

    def move(self, parent: Folder | None = None, name: str | None = None):
        """Move folder into provided parent folder or root.

        :param parent: parent folder
        :param name: if provided rename folder
        """
        # TODO: check of folder already exists, although this might be
        # a feature too.
        if name:
            self.name = name

        if not parent:
            full_path = f"/{self.name}"
        else:
            full_path = f"{parent.full_path}/{self.name}"

        self.parent = parent
        self._update_full_path(full_path)

    def _update_full_path(self, new_full_path):
        """Rename folder, updating descendants full paths."""
        old_len = len(self.full_path)
        self.get_descendants().update(
            full_path=Concat(Value(new_full_path + "/"), Substr("full_path", old_len + 2))  # +2 for '/' & 1 based index
        )
        self.full_path = new_full_path
        self.save()


class FileQuerySet(InheritanceQuerySet, ObjectQuerySet):
    pass


class File(Named, Timestamped, Object):
    """
    Base class for files.

    It assumes that sub-classing models will provide a field ``file`` with
    an interface similar to FileField.
    """

    # When folder is null, it is at root
    folder = models.ForeignKey(Folder, models.CASCADE, null=True, blank=True)

    file = models.FileField(_("File"), upload_to=file_upload_to)
    preview = models.FileField(_("Preview"), upload_to=file_upload_to, null=True, blank=True)
    mime_type = models.CharField(_("Mime Type"), max_length=127, blank=True)
    file_size = models.PositiveIntegerField(_("File Size"), blank=True)
    preview_size = models.PositiveIntegerField(_("Preview file size"), blank=True)

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
