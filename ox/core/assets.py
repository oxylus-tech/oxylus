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


from collections import namedtuple
from functools import cached_property
from graphlib import TopologicalSorter
from typing import Iterable

from django.conf import settings
from django.contrib.staticfiles import finders
from django.templatetags.static import static

from ..utils.functional import Owned


__all__ = ("AssetPaths", "Asset", "Assets", "order_assets")


AssetPaths = namedtuple("AssetPaths", ["root", "source", "target"])
"""Describes a source-target paths.

- {Path|None} root: parent project or app directory
- {Path} source: assets project root directory
- {Path} target: static directory
"""


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
        static_dir: str = None,
        app: str = None,
    ):
        self.name: str = name
        """Asset's package/module name, used as is for generated import map and
        in order to find packages in ``node_modules``."""
        self.static_dir: str = static_dir or name
        """Static directory name, defaults to :py:attr:`~name`."""
        self.js: str = settings.DEBUG and dev_js or js
        """Include this javascript file."""
        self.css: str = css
        """Include this css file."""
        self.dist: str = dist
        """File distribution sub-directory."""
        # FIXME: is this required?
        self.app: None | str = app
        """Related django application name.

        This will exclude assets from collection, but will ensure it has
        been built before current ``Assets``.
        """

    @property
    def js_url(self):
        return self.js and static(f"{self.static_dir}/{self.js}") or None

    @property
    def css_url(self):
        return self.css and static(f"{self.static_dir}/{self.css}") or None


class Assets(Owned):
    """
    This class represent a client side application's assets to included
    in Django's application rendered templates.

    It contains multiple :py:class:`Asset` instances each designating a
    dependency (such as ``vue``, etc.). It also can contain :py:class:`Assets` instances of other application as dependencies.

    It is responsible to:

        - render importmap (in ``ox/core/base.html`` template);
        - provide a list of CSS and javascript modules to import;
        - handle assets dependencies, sorting them topologically (using :py:func:`order_assets`)

    The Assets class is :py:class:`~ox.utils.functional.Owned` by an AppConfig. Uninitialized
    :py:attr:`static_dir` will be set to app_config's ``label``.
    Concretely, this means that setting a instance of Assets to :py:attr:`~.apps.AppConfig`
    will search for statics in this app's directory.
    """

    index: str = "index.{ext}"
    """
    Application's static's filename to look for, formatted with correct extension
    (eg. ``"js"``).
    """
    static_dir: str = ""
    """Static directory name."""

    Items = list  # list[Asset|Assets] | tuple[Asset|Assets]
    items: Items = None
    """Child Asset and Assets instances."""

    def __init__(self, *assets, **kwargs):
        """Assets are provided as positional parameters, and can either be:

        - ``Asset`` instance
        - ``Assets`` instance
        """
        self.items = assets
        self.__dict__.update(**kwargs)

    @cached_property
    def css_urls(self) -> list[str]:
        """A list of CSS static files urls."""
        urls = [asset.css_url for asset in iter(self) if asset.css]

        app_index = self.index.format(ext="css")
        if self.static_dir:
            app_url = f"{self.static_dir}/{app_index}"
            if finders.find(app_url):
                urls.append(static(app_url))
        return urls

    @cached_property
    def js_urls(self) -> list[str]:
        """A list of javascripts urls of all dependencies and assets
        entrypoint."""
        urls = [asset.js_url for asset in iter(self) if asset.js]

        app_index = self.index.format(ext="js")
        if self.static_dir:
            app_url = f"{self.static_dir}/{app_index}"
            if finders.find(app_url):
                urls.append(static(app_url))
        return urls

    @cached_property
    def import_map(self) -> dict[str, str]:
        """Return import map as a dictionary of ``{asset_name: asset_url}``."""
        map = {"imports": None}
        map["imports"] = {asset.name: asset.js_url for asset in iter(self) if asset.js_url}
        return map

    def contribute(self, owner) -> Assets:
        """When ``Assets`` instance is contributed to an AppConfig, assign
        ``static_dir`` to the application label if not present.

        See :py:meth:`..utils.functional.Owned.contribute` for more
        info.
        """
        self = super().contribute(owner)
        if not self.static_dir:
            self.static_dir = owner.label
        return self

    def __iter__(self):
        """Iterate over all ``Asset`` instance, including ones nested under
        child ``Assets`` class."""
        for asset in self.items:
            if isinstance(asset, Assets):
                for asset_2 in iter(asset):
                    yield asset_2
            else:
                yield asset

    def __str__(self):
        if owner := getattr(self, "_owner", None):
            return owner.label
        return f"{self.static_dir}"


def order_assets(assets_list: Iterable[Assets]) -> Iterable[Assets]:
    """:return: a list of assets topologically sorted by dependency."""
    graph = TopologicalSorter()
    todo = [*assets_list]
    done = set()
    for assets in assets_list:
        deps = [dep for dep in assets.items if isinstance(dep, Assets)]
        graph.add(assets, *deps)

        done.add(assets)
        todo.extend(a for a in deps if a not in done)
    return list(graph.static_order())
