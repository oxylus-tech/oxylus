"""Oxylus application inherits from :py:class:`.AppConfig`. It allows to:

    - handle :doc:`assets <assets>`;
    - provide application metadata;
    - application level permission;

We plan to use those metadata and dependencies in order to automate loading and ease
application installation by end-users.
"""

from __future__ import annotations
from functools import cached_property

from django import apps
from django.conf import settings
from django.utils.translation import gettext_lazy as _

from ..utils.functional import Owned
from .assets import Asset, Assets


__all__ = ("AppMeta", "AppConfig", "CoreAppConfig", "ox_assets")


class AppMeta(Owned):
    # TODO:
    # - contribute: add dependencies using AppConfig.assets

    description: str = ""
    """Describe application here.

    Default will be fetched from metadatas.
    """
    permission: str = ""
    """Permission to access application."""
    dependencies: tuple[str] = tuple()
    """Application dependencies, as a tuple of:

    - `AppConfig_name`: related app config
    - TODO: `(AppConfig_name, "version"): where `version` is matched agains't "^" operator.
    """
    extra_metadata: dict[str, str] | None = None
    """Application metadata.

    If not provided, fetch those information based on root module of the
    package (using ``importlib.metadatay``).
    """

    @cached_property
    def package(self):
        return self._owner.__module__.__package__

    @cached_property
    def package_metadata(self):
        """Return metadata read from package."""
        from importlib.metadata import metadata

        return {k.lower(): v for k, v in metadata(self.package)}

    @cached_property
    def metadata(self):
        md = {**self.package_metadata, **(self.extra_metadata or {}), "name": self._owner.verbose_name}
        if self.description:
            md["description"] = self.description
        return md


# Each package has:
# - dist => multiple entry points there
# - dependencies => in node_modules
#
# Importmap:
# - module name + path to file
#
# Static:
# - name + path to dir (may contains multiple files)
#
#


ox_assets = Assets(
    settings.BASE_DIR / "assets",
    "@oxylus/ox",
    dependencies=[
        Asset("axios", "esm/axios.min.js"),
        Asset("vue", "vue.esm-browser.prod.js", dev_js="vue.esm-browser.js"),
        Asset("@mdi/font", css="css/materialdesignicons.min.css", dist=""),
        Asset("vuetify", css="vuetify.min.css"),
    ],
    exports=[
        Asset(".", "index.js", css="style.css"),
        Asset("./components", "components.js"),
        Asset("./vendor", "vendor.js"),
    ],
)


# Cases:
#
# In dev / collectstatic
#
# Apps:
# - {root}/assets/{package}/dist
# - {app_dir}/assets/dist
#
# Dependencies:
# - {root}/assets/{package}/node_modules/{static_dir}
# - {app_dir}/assets/node_modules/{static_dir}
#
# Resolution:
#
#


class AppConfig(apps.AppConfig):
    """
    Base AppConfig application to use for Oxylus applications.

    It provides extra features as:

        - assets managements (:py:class:`~.assets.Assets`);
        - custom root url for the whole application (see :py:mod:`ox.urls`)
        - default icon (as MDI specifier)

    It is planned later to handle app dependencies.
    """

    # meta: AppMeta = AppMeta()
    # """Provide extra informations about the application such as dependencies,
    # or package metadata."""

    assets: Assets = Assets(ox_assets)
    """The assets use by the application. It will be used at two places:

        - building and managing assets, through ``./manage.py assets``;
        - rendering scripts and stylesheets includes into templates

    Note: there is no need to provide an extra :py:class:`~ox.core.assets.Asset`
    specifying the application to be compiled, since it is what the Assets class does.
    """
    npm_package: str | None = None
    """ Name of the corresponding NPM package to look up for.

    Defaults to app label.
    """
    icon: str = "mdi-home"
    """Material design icon class."""

    root_url: str = ""
    """Provide an alternative to app label when we target application in paths.

    For example Oxylus will nest template directories as ``ox/core/``
    instead of ``ox_core``. The same happens for urls.
    """

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.assets = self.assets.contribute(self)
        self.root_url = self.rool_url or self.label
        self.npm_package = self.npm_package or self.label


class CoreAppConfig(AppConfig):
    name = "ox.core"
    label = "ox_core"
    verbose_name = _("Oxylus")
    default = True
    icon = "mdi-weather-sunny"

    root_url = "ox/core"
    npm = "@oxylus/core"

    def ready(self):
        from . import signals  # noqa: F401  # isort: skip
