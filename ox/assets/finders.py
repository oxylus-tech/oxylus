from __future__ import annotations
from functools import cached_property
import os
from pathlib import Path

from django.apps import apps as d_apps
from django.core.files.storage import FileSystemStorage
from django.contrib.staticfiles import finders, utils as static_utils

from .base import Assets, unique_dfs


__all__ = ("AssetsFinder",)


class AssetsFinder(finders.BaseFinder):
    """
    This class is used to find static based on applications' :py:class:`~.base.Assets`.
    """

    # TODO: support different storages
    source_dir = "assets"

    def __init__(self, apps=None, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.apps = apps or d_apps.get_app_configs()

    @cached_property
    def assets(self) -> list[Assets]:
        """A list of applications assets and dependencies."""
        return unique_dfs(app.assets for app in self.apps if isinstance(getattr(app, "assets", None), Assets))

    @cached_property
    def locations(self) -> list[tuple[str, Path]]:
        """A list of ``prefix, path`` tuples used for looking up locations."""
        locations = []
        for assets in self.assets:
            locations.extend(assets.get_locations())
        return locations

    def check(self, **kwargs):
        return []

    def list(self, ignore_patterns=[]):
        for assets in self.assets:
            for prefix, root in assets.get_locations():
                storage = FileSystemStorage(root)
                storage.prefix = prefix
                for path in static_utils.get_files(storage, ignore_patterns):
                    yield path, storage

    def find(self, path, find_all=False):
        matches = []
        for prefix, root in self.locations:
            if matched := self.find_location(root, path, prefix):
                if not find_all:
                    return matched
                matches.append(matched)
        return matches

    def find_location(self, root: Path, path: str, prefix: str | None = None) -> Path | None:
        # Heavilly inspired from Django's FileSystemFinder.
        # Code of this method is under the same license.
        if prefix:
            prefix = "%s%s" % (prefix, os.sep)
            if not path.startswith(prefix):
                return None
            path = path.removeprefix(prefix)
        path = root / path
        return path.exists() and path or None
