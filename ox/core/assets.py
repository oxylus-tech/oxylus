"""This module provides application assets specification and management:
building, installing and collecting the generated files into the ``static``
directory.

``Assets`` is the client side application project representation into Django. It
allows to build and distribute the files into django's ``static`` directory, and
to ease client application development (including testing). It collects dependencies,
and includes required files into the renderer Django templates.

By technical convention, Oxylus only handles building Vue based Vite.js projects.
However it allows to run other frameworks.

Dependencies are declarative (although later we want to automate through their
extraction from ``package.json`` or ``vite.config.js``). The :py:class:`~Assets`
contains instances of :py:ref:`~Asset` specifying a single dependency.
There can also be nested instances of the same class, using :py:func:`order_assets`
to have them unfold.

The entry point for assets are Oxylus' :py:class:`~ox.core.apps.AppConfig` which are looked
for rendering views.
"""

from __future__ import annotations
import logging
import itertools
from typing import Generator
from pathlib import Path


from functools import cached_property

from django.apps import apps as django_apps
from django.conf import settings
from django.core.files import storage
from django.contrib.staticfiles import finders
from django.templatetags.static import static

from ..utils.functional import Owned


__all__ = (
    "Asset",
    "Assets",
)


logger = logging.get_logger()


class Asset(Owned):
    """A single Asset's dependency.

    It target a specific static module and can provide:
        - javascript and development javascript distribution file
        - css directory

    """

    def __init__(
        self,
        name: str,
        js: str = "",
        css: str = "",
        dev_js: str = "",
        dist: str = "dist",
        static_dir: str = "",
    ):
        self.name: str = name
        """Asset's package/module name, used as is for generated import map and
        in order to find packages in ``node_modules``."""
        self.static_dir: str = static_dir
        """Static directory name, defaults to :py:attr:`~name`."""
        self.js: str = settings.DEBUG and dev_js or js
        """Include this javascript file."""
        self.css: str = css
        """Include this css file."""
        self.dist: str = dist
        """File distribution sub-directory."""

    @property
    def js_url(self):
        static_dir = self.static_dir or self.name
        return self.js and static(f"{static_dir}/{self.js}") or None

    @property
    def css_url(self):
        static_dir = self.static_dir or self.name
        return self.css and static(f"{static_dir}/{self.css}") or None

    def find(self, path) -> Path | None:
        """Return path to this asset if found."""

        pass


class Assets:
    """
    This class represent an assets package for a Django application.

    It is responsible to:

        - provide a list of CSS, JS to include;
        - generate the import map (in ``ox/core/base.html``);
        - provide list of directories used for statics;

    It defines:

        - the Django application's related package
        - a source directory where to get npm packages;
        - dependencies to collect;
        - exported files to include into the rendered templates;

    When it contributes to an AppConfig (see :py:class:`ox.utils.functional.Owned`, :py:meth:`contribute`), it
    will use its parameters to get the actual package name (if not
    already provided).
    """

    name: str = ""
    """ Package name """
    path: Path | None = None
    """ Path of the package (or workspace).

    The actual package path is retrieved using :py:prop:`package_path`.
    """
    exports: list[Asset] | None = None
    """ Exported assets. """
    dependencies: list[Asset] | None = None
    """ Dependencies. """

    def __init__(self, path, name="", exports=None, dependencies=None, base_dir=None):
        self.path = path
        self.name = name
        self.exports = exports or []
        self.dependencies = dependencies or []

    @cached_property
    def package_path(self) -> Path:
        """Get path to package directory"""
        candidate = self.path / self.name
        if candidate.exists():
            return candidate
        return self.path

    def contribute(self, owner):
        """TODO"""
        self = super().contribute(owner)

        # ensure cached properties are cleaned up
        for key in ("package_path", "import_map", "css_urls", "js_urls"):
            if key in self.__dict__:
                del self.__dict__[key]

        self.name = self.name or owner.npm_package or owner.label
        return self

    def get_paths(self) -> Generator[tuple[str, Path], None, None]:
        yield (self.name, self.package_path / "dist")

        path = self.path / "node_modules"
        for asset in self.dependencies:
            if isinstance(asset, Assets):
                for val in asset.get_paths():
                    yield val
            else:
                location = path / asset.name
                if location.exists():
                    yield (asset.name, location)
                else:
                    logger.warn(f"Directory does not exists for asset {asset.name}: {location}")

    @cached_property
    def css_urls(self) -> set[str]:
        """A list of CSS static urls."""
        return {url for _, url in self.get_urls("css")}

    @cached_property
    def js_urls(self) -> set[str]:
        """A list of CSS static urls."""
        return {url for _, url in self.get_urls("js")}

    @cached_property
    def import_map(self) -> dict[str, str]:
        """A list of CSS static urls."""
        return {"imports": dict(self.get_urls("css"))}

    def get_urls(self, attr: str) -> Generator[tuple[str, str]]:
        """Return assets urls for the provided attribute (``css`` or ``js``)."""
        return (val for val in itertools.chain(self.get_dependencies_urls(attr), self.get_export_urls(attr)))

    def get_dependencies_urls(self, attr: str) -> Generator[tuple[str, str]]:
        for asset in self.dependencies:
            if isinstance(asset, Assets):
                yield from asset.get_dependencies_urls(attr)
            if val := getattr(asset, attr):
                yield (asset.name, static(f"{asset.static_dir}/{val}"))

    def get_export_urls(self, attr: str) -> Generator[tuple[str, str]]:
        # For exports, the algorithm is slightly different, as it takes
        # `self.name` as prefix.
        # Assets is not handled here as it does not make sense. This may
        # change in the future.
        for asset in self.exports:
            if val := getattr(asset, attr):
                name = asset.name
                if name.startsWith("."):
                    name = self.name + name[1:]
                yield (name, static(f"{self.name}/{val}"))


class AssetsFinder(finders.BaseFinder):
    storage_class = storage.FileSystemStorage
    source_dir = "assets"

    def __init__(self, apps=None, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.apps = apps or django_apps.get_app_configs()
        self.storages = {}

    def build_index(self):
        for app in self.apps:
            pass
