from __future__ import annotations

from dataclasses import dataclass
from functools import cached_property
from graphlib import TopologicalSorter
import itertools
import logging
from typing import Generator, Iterable
from pathlib import Path


from django.conf import settings
from django.templatetags.static import static

from ox.utils.functional import Owned


__all__ = ("Asset", "Assets", "order_assets", "unique_dfs")


logger = logging.getLogger()


@dataclass(frozen=True)
class Asset(Owned):
    """A single Asset's dependency.

    It target a specific static module and can provide:
        - javascript and development javascript distribution file
        - css directory

    """

    name: str
    """Asset's package/module name, used as is for generated import map and
    in order to find packages in ``node_modules``."""
    js: str
    """Static directory name, defaults to :py:attr:`~name`."""
    css: str
    """Include this javascript file."""
    static_dir: str
    """Include this css file."""

    def __init__(
        self,
        name: str,
        js: str = "",
        css: str = "",
        dev_js: str = "",
        static_dir: str = "",
    ):
        self.__dict__.update(
            {
                "name": name,
                "static_dir": static_dir or name,
                "js": settings.DEBUG and dev_js or js,
                "css": css,
            }
        )


class Assets(Owned):
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
    includes: list[Asset] | None = None
    """ Exported assets. """
    dependencies: list[Asset] | None = None
    """ Dependencies. """

    def __init__(self, path, name="", includes=None, dependencies=None, base_dir=None):
        self.path = path
        self.name = name
        self.includes = includes or []
        self.dependencies = dependencies or []

    @cached_property
    def package_path(self) -> Path:
        """Get path to package directory"""
        if str(self.path).endswith(self.name):
            return self.path
        return self.path / self.name

    def contribute(self, owner):
        """TODO"""
        self = super().contribute(owner)

        # ensure cached properties are cleaned up
        for key in ("package_path", "import_map", "css_urls", "js_urls"):
            if key in self.__dict__:
                del self.__dict__[key]

        self.name = self.name or owner.npm_package or owner.label
        return self

    def get_locations(self) -> Generator[tuple[str, Path]]:
        """Get locations of npm packages.

        Return a generator that yield tuples of ``(prefix, abs_path)``. Prefix can
        be an empty string (for ``node_modules``).
        """
        paths = (
            (self.name, self.package_path / "dist"),
            ("", self.package_path / "node_modules"),
        )
        for prefix, path in paths:
            if path.is_dir():
                yield prefix, path

    def list_paths(self) -> Generator[tuple[str, Path]]:
        """
        List statics paths, yielding tuples of ``(prefix, abs_path)``.

        It doesn't yield values from inner :py:class:`Assets` instances.

        :param skip_nested: if True, don't yield from inner Assets dependencies.
        """
        path = self.package_path / "dist"
        if path.exists():
            yield self.name, path

        path = self.package_path / "node_modules"
        for asset in self.dependencies:
            if isinstance(asset, Asset):
                location = path / asset.name
                if location.is_dir():
                    yield (asset.static_dir, location)
                else:
                    logger.warn(f"Directory does not exists for asset {asset.name}: {location}")

    @cached_property
    def css_urls(self) -> set[str]:
        """A list of CSS static urls."""
        return {url for _, url in self.get_urls("css")}

    @cached_property
    def js_urls(self) -> set[str]:
        """A list of JS static urls."""
        return {url for _, url in self.get_urls("js")}

    @cached_property
    def import_map(self) -> dict[str, str]:
        """A list of CSS static urls."""
        return {"imports": dict(self.get_urls("js"))}

    def get_urls(self, attr: str) -> Generator[tuple[str, str]]:
        """Iter over assets and yield tuples ``(asset.name, attribute)``."""
        return (val for val in itertools.chain(self.get_dependencies_urls(attr), self.get_includes_urls(attr)))

    def get_dependencies_urls(self, attr: str) -> Generator[tuple[str, str]]:
        """Return urls of dependencies, based on ``attr`` attribute value."""
        for asset in self.dependencies:
            if isinstance(asset, Assets):
                yield from asset.get_dependencies_urls(attr)
            elif val := self.get_dependency_url(asset, attr):
                yield val

    def get_dependency_url(self, asset: Asset, attr: str) -> tuple[str, str] | None:
        """Return url of an"""
        if val := getattr(asset, attr):
            return asset.name, static(f"{asset.static_dir}/{val}")

    def get_includes_urls(self, attr: str) -> Generator[tuple[str, str]]:
        """Return urls of includes, based on ``attr`` attribute value."""

        # For includes, the algorithm is slightly different, as it takes
        # `self.name` as prefix.
        # Assets is not handled here as it does not make sense. This may
        # change in the future.
        for asset in self.includes:
            if val := self.get_include_url(asset, attr):
                yield val

    def get_include_url(self, asset: Asset, attr: str) -> tuple[str, str] | None:
        if val := getattr(asset, attr):
            if asset.static_dir:
                name = self.name + "/" + asset.static_dir
            else:
                name = self.name
            return name, static(f"{name}/{val}")


def order_assets(assets_list: Iterable[Assets]) -> list[Assets]:
    """:return: a list of assets topologically sorted by dependency."""
    graph = TopologicalSorter()
    todo = [*assets_list]
    done = set()
    for assets in assets_list:
        deps = [dep for dep in assets.dependencies if isinstance(dep, Assets)]
        graph.add(assets, *deps)

        done.add(assets)
        todo.extend(a for a in deps if a not in done)
    return list(graph.static_order())


def unique_dfs(assets_list: Iterable[Assets]) -> list[Assets]:
    """Run a DFS lookup over assets lists and dependencies.

    :return list of unique Assets instance.
    """
    items, todo = [], list(assets_list)
    while todo:
        item = todo.pop(0)
        if item not in items:
            todo.extend(dep for dep in item.dependencies if isinstance(dep, Assets) and dep not in todo)
            items.append(item)
    return item
