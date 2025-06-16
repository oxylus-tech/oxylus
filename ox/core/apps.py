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


ox_assets = Assets(
    Asset("axios", "esm/axios.min.js"),
    Asset("vue", "vue.esm-browser.prod.js", dev_js="vue.esm-browser.js"),
    Asset("@mdi/font", css="css/materialdesignicons.min.css", dist=""),
    Asset("vuetify", css="vuetify.min.css"),
    # note:
    Asset("ox", "ox.js", css="style.css", static_dir="ox"),
    Asset("ox/components", "components.js", static_dir="ox"),
    Asset("ox/vendor", "vendor.js", static_dir="ox"),
    lookup_dirs=[("{BASE_DIR}/assets/ox/", "{BASE_DIR}/ox/static")],
    static_dir="ox",
)


class AppConfig(apps.AppConfig):
    """Base AppConfig application to use with ox."""

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

    icon: str = "mdi-home"
    """Material design icon class."""
    root_url: str = ""
    """Provide an alternative to app label when we target application in paths.

    For example Oxylus will nest template directories as ``ox/core/``
    instead of ``ox_core``. The same happens for urls.
    """
    index_urlname: str = ""
    """Url name of application index page."""

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.assets = self.assets.contribute(self)
        # self.meta = self.meta.contribute(self)

    def get_root_url(self):
        """Return path label or label if not set."""
        if self.root_url:
            return self.root_url
        return self.label


class CoreAppConfig(AppConfig):
    name = "ox.core"
    label = "ox_core"
    verbose_name = _("Oxylus Core")
    default = True
    verbose_name = _("Oxylus Core")
    icon = "mdi-hammer-wrench"

    root_url = "ox/core"
    index_urlname = "ox_core:index"

    def ready(self):
        from . import signals  # noqa: F401  # isort: skip
