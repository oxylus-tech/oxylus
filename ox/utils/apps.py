from importlib import import_module
from graphlib import TopologicalSorter
from typing import Iterable

from django.apps import apps, AppConfig


__all__ = ("DiscoverModules",)


def order_dependencies_name(app_configs: None | Iterable[AppConfig] = None) -> Iterable[str]:
    """Return an iterator over AppConfig names based on they declaration order
    and dependency relationships.

    For more info, look at :py:func:`order_dependencies`.
    """

    # Django apps registry returns an iterator from dependent to dependencies (assumption based on
    # template and lookup overload system). In order to avoid mismatching with TopologicalSorter, we need to reverse.
    app_configs = app_configs or reversed(apps.get_app_configs())
    graph = TopologicalSorter()
    for app in app_configs:
        if isinstance(app, AppConfig) and app.meta.dependencies:
            graph.add(app.name, *app.meta.dependencies)
        else:
            graph.add(app.name)
    return graph.static_order()


def order_dependencies(
    app_configs: None | Iterable[AppConfig] = None, no_exc: bool = False
) -> Iterable[tuple[str, AppConfig]]:
    """
    Yield app's ``(name, AppConfig)`` ordered from dependency and dependent, preserving declaration order, using
    :py:attr:`ox.core.apps.AppMeta.dependencies` when provided.

    When ``app_configs`` is not provided, use Django's registry.

    :param app_configs: iterable from dependency to dependent order AppConfig.
    :param no_exc: if True, yield ``name, None`` instead of raising a LookupError.
    :yield ``(name, app_config)`` for each app.
    """
    names = order_dependencies_name(app_configs)
    for name in names:
        try:
            yield name, apps.get_app_config(name)
        except LookupError:
            if no_exc:
                yield name, None
            else:
                raise


class DiscoverModules:
    """Utility function used to discover sub-modules in applications.

    For each declared sub-module, there must be an equivalent method
    handler with the following signature: `handle_{module_name}(self,
    app, module, **kw)`.
    """

    module_names: str | list[str] | tuple[str] = ""
    """A single or a list of module names to look-up for."""

    def run(self, app_configs=None, **kw):
        """Run."""
        for module_name in self.module_names:
            self.run_handler(module_name, app_configs, **kw)

    def run_handler(self, module_name, app_configs=None, **kw):
        handler = self.get_handler(module_name)
        app_configs = app_configs or apps.get_app_configs()
        for app in app_configs:
            if mod := self.get_app_module(app, module_name):
                handler(app, mod, **kw)

    def get_handler(self, module_name):
        fn = f"handle_{module_name.replace('.','_')}"
        if not hasattr(self, fn):
            raise NotImplementedError(f"Handler is not implemented for `{module_name}`. Expected `{fn}`.")
        return getattr(self, fn)

    def get_app_module(self, app, module_name):
        """Yield `app, sub_module` for each sub-module found for apps."""
        path = f"{app.name}.{module_name}"
        try:
            return import_module(path)
        except ModuleNotFoundError as err:
            if err.msg == f"No module named '{path}'":
                return None
            raise
