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
for in order to execute commands or rendering views.
"""
from __future__ import annotations


from collections import namedtuple
from pathlib import Path
from functools import cached_property
from graphlib import TopologicalSorter
import shutil
import subprocess
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

    Collecting asset will copy the distribution files into the corresponding django's
    `static` file (using :py:meth:`~.collect`).
    """

    project_module_dir = settings.BASE_DIR / "ox"

    def __init__(self, name, js="", css="", dev_js="", dist="dist", static_dir=None, app=None):
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

    def collect(self, assets: Assets = None, **_) -> AssetPaths | None:
        """Copy assets into statics if source exists."""
        path = assets.paths.source / "node_modules" / self.name
        if self.dist:
            path = path / self.dist

        if not path.exists():
            return None

        target = assets.paths.target / self.name
        target.exists() and shutil.rmtree(target)
        shutil.copytree(str(path), str(target))
        return AssetPaths(assets.paths.root, path, target)


class Assets(Owned):
    """Represent a client side application project to be built and integrated
    into rendered templates. It includes project specification and
    dependencies. Assets is an :py:class:`~ox.utils.owned.Owned` which is owned
    by AppConfig instances.

    For standalone Assets (such as the javascript ``ox`` library), :py:attr:`~.lookup_dirs`
    (if not :py:attr:`~.app_dir`) and :py:attr:`~.static_dir` should be specified. Default
    lookups will use ``app_dir`` set to ``AppConfig.path``:

        - ``BASE_DIR / assets / app_label``: generated in ``BASE_DIR / static``
        - ``app_dir / assets``: generated in ``app_dir / static``

    It also provides cached properties to generate :py:attr:`~.import_map`, :py:attr:`~.js_urls`
    and :py:attr:`~.css_urls`.

    Look at the doc of :py:attr:`ox.core.apps.AppConfig.assets` for more info.
    """

    lookup_dirs: dict[str, str] = (
        ("{BASE_DIR}/assets/{self.static_dir}", "{BASE_DIR}/ox/static"),
        ("{self.app_dir}/assets", "{self.app_dir}/static"),
    )
    """Source and destination directories to look assets up."""
    commands: dict[str, str] = {
        "init": "npm install",
        "build": "npm run build -- --outDir {self.paths.target}/{self.static_dir}",
        "watch": "npm run watch -- --outDir {self.paths.target}/{self.static_dir}",
    }
    """Provide multiple commands that can be executed by :py:meth:`~.command`.

    It is declared as a dict of ``{name: shell}``. The ``shell`` is
    formatted using ``{self: assets, app: app_config}``.
    """
    output: str = "index.{ext}"
    """Output filename, formatted with correct extension (eg.

    ``"js"``).
    """
    app_dir: Path | None = None
    """Directory in which to lookup for ``assets``."""
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
    def paths(self) -> None | AssetPaths:
        """Source and target directory or ``None`` when it does not exists.

        :return: AssetPaths (``root`` will be None if Assets is not owned by application).
        """
        kw = {"self": self, "BASE_DIR": settings.BASE_DIR}
        for source, target in self.lookup_dirs:
            source = Path(source.format(**kw))
            if source.exists:
                target = Path(target.format(**kw))
                return AssetPaths(self.app_dir, source, target)
        return None

    @cached_property
    def css_urls(self) -> list[str]:
        """A list of CSS static files urls."""
        urls = [asset.css_url for asset in iter(self) if asset.css]

        app_output = self.output.format(ext="css")
        app_url = f"{self.static_dir}/{app_output}."
        if finders.find(app_url):
            urls.append(static(app_url))
        return urls

    @cached_property
    def js_urls(self) -> list[str]:
        """A list of javascripts urls of all dependencies and assets
        entrypoint."""
        urls = [asset.js_url for asset in iter(self) if asset.js]

        app_output = self.output.format(ext="js")
        app_url = f"{self.static_dir}/{app_output}"
        if finders.find(app_url):
            urls.append(static(app_url))
        return urls

    @cached_property
    def import_map(self) -> dict[str, str]:
        """Return import map as a dictionary of ``{asset_name: asset_url}``."""
        map = {"imports": None}
        map["imports"] = {asset.name: asset.js_url for asset in iter(self) if asset.js_url}
        return map

    def is_init(self) -> bool:
        """Return True if assets and dependencies have been installed.

        Heuristic is based on the existence of the ``node_modules``
        directory.
        """
        return self.paths and (self.paths.source / "node_modules").exists()

    def command(self, command_name, use_async=False, dev=False, **kwargs):
        """Execute a command by name. Commands are provided by the ``commands``
        instance attribute.

        :param str command_name: command name to execute
        :param bool use_async: if True, execute command as non-blocking operation.
        :param bool dev: if True, add ``--mode development`` arguments
        :param apps.AppConfig app: if provided use this application
        :param **kwargs: extra argument to pass down to subprocess function.
        :return: ``subprocess``'s ``Popen`` or ``run`` result depending on ``use_async`` value.
        """

        if not self.paths:
            return None
        command = self.commands[command_name].format(self=self)
        if dev:
            command += " --mode develoment"
        return self._get_process(use_async)(command, shell=True, cwd=self.paths.source, **kwargs)

    def _get_process(self, use_async):
        return use_async and subprocess.Popen or subprocess.run

    def collect(
        self,
        exclude: set[str] = None,
        init: bool = False,
        force_init: bool = False,
        build: bool = False,
        dev: bool = False,
        nested: bool = False,
    ) -> None | dict[str, AssetPaths]:
        """Collect statics over all nested assets.

        :param set[str] exclude: exclude those assets by name. Note: the provided object will be updated with the \
        assets that have been collected here.
        :param bool init: run ``init`` if not already initialized.
        :param bool force_init: run ``init`` regardless asset already has been initialized.
        :param bool build: run ``build``.
        :return: a dict of collected statics as ``{name, paths}``, where ``paths`` is the result of ``Asset.resolve`` \
        (or ``None`` if source does not exists).
        """
        if not self.paths:
            return None

        if force_init or ((init or build) and not self.is_init()):
            self.command("init", dev=dev)
        if build:
            self.command("build", dev=dev)

        done, exclude = {}, exclude or set()
        for asset in self.items:
            if isinstance(asset, Asset):
                if asset.app or asset.name in exclude:
                    continue
                if paths := asset.collect(self):
                    done[asset.name] = paths
                    exclude.add(asset.name)
            elif nested:
                # we don't pass app down, since it can be declared on the nested Assets.
                asset.collect(exclude=exclude, init=init, force_init=force_init, build=build, dev=dev)
        return done

    def contribute(self, owner) -> Assets:
        """When ``Assets`` instance is contributed to an owner, assign
        ``static_dir`` and ``app_dir`` to the application label if not present.

        See :py:meth:`..utils.functional.Owned.contribute` for more
        info.
        """
        self = super().contribute(owner)
        if not self.static_dir:
            self.static_dir = owner.label
            self.app_dir = owner.path
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

    def __repr__(self):
        if owner := getattr(self, "_owner", None):
            return owner.label
        return f"Assets<{self.paths.source}>"


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
