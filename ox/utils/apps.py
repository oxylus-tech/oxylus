from importlib import import_module
from graphlib import TopologicalSorter
from typing import Iterable

from django.apps import apps, AppConfig


__all__ = (
    "get_or_create_app_config",
    "order_apps_dependencies",
    "DiscoverModules",
)


def get_or_create_app_config(module: str) -> AppConfig:
    """Get AppConfig based on app module.

    It looks up in apps registry, if not found tries to import it (using ``AppConfig.create``).

    :param module: app module path
    :return: the AppConfig instance

    :raises ImportError: module couldn't be imported;
    :raises ImproperlyConfigured: app was not configured properly;
    """
    try:
        return apps.get_app_config(module)
    except (KeyError, LookupError):
        return AppConfig.create(module)


def order_apps_dependencies(app_configs: None | Iterable[AppConfig | str] = None) -> list[AppConfig]:
    """
    Return applications ordered by dependencies (topological sort).

    :param app_configs: an iterable of AppConfig to look dependencies for (defaults to apps registry)
    :return: a list of ordered app configs by dependencies.
    """
    app_configs = list(app_configs or reversed(apps.get_app_configs()))
    graph = TopologicalSorter()

    done = {}
    for app in app_configs:
        if isinstance(app, str):
            if app in done:
                continue
            app = get_or_create_app_config(app)

        if app.name in done:
            continue

        if deps := getattr(app, "dependencies", None):
            app_configs.extend(deps)
            graph.add(app.name, *deps)
        else:
            graph.add(app.name)

        done[app.name] = app

    return [done[name] for name in graph.static_order()]


class DiscoverModules:
    """Utility function used to discover sub-modules in applications.

    For each declared sub-module, there must be an equivalent method
    handler with the following signature: ``handle_{module_name}(self,
    app, module, **kw)`` (where dots in ``module_name`` are replace by ``_``)
    """

    module_names: str | Iterable[str] = ""
    """A single or a list of module names to look-up for."""

    def __init__(self, module_names: str | Iterable[str] | None = None, **handlers):
        """
        :param module_names: list of module names to look up
        :param handlers: list of handler functions.
        """
        if module_names is not None:
            self.module_names = module_names

        if handlers:
            for key, handler in handlers.items():
                if not key.startswith("handle_"):
                    raise ValueError(f"Invalid handler method name: {key} (should start with `handle_`)")
                setattr(self, key, handler)

    def run(self, app_configs: Iterable[AppConfig] = None, **kw):
        """Run handler over all modules."""
        if app_configs is None:
            app_configs = apps.get_app_configs()

        for module_name in self.get_module_names():
            self.run_handler(module_name, app_configs, **kw)

    def get_module_names(self) -> Iterable[str]:
        """Return modules names as an iterable"""
        if isinstance(self.module_names, str):
            return [
                self.module_names,
            ]
        return self.module_names

    def run_handler(self, module_name: str, app_configs: Iterable[AppConfig] = None, **kw):
        """Run handler over app config looking for the provided module."""
        handler = self.get_handler(module_name)
        if app_configs is None:
            app_configs = apps.get_app_configs()

        for app in app_configs:
            if mod := self.get_app_module(app, module_name):
                handler(app, mod, **kw)

    def get_handler(self, module_name):
        """Return handler function for the provided"""
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
