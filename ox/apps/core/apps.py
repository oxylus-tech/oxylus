"""Oxylus application inherits from :py:class:`.AppConfig`. It allows to:

    - handle :doc:`assets <assets>`;
    - provide application metadata;
    - application level permission;

We plan to use those metadata and dependencies in order to automate loading and ease
application installation by end-users.
"""

from __future__ import annotations

from django.utils.translation import gettext_lazy as _

from ox.core.apps import AppConfig


__all__ = ("CoreAppConfig",)


class CoreAppConfig(AppConfig):
    name = "ox.apps.core"
    label = "ox_core"
    verbose_name = _("Oxylus")
    default = True
    icon = "mdi-weather-sunny"

    root_url = "ox/core"
    npm_package = "@oxylus/core"

    def ready(self):
        from . import signals  # noqa: F401  # isort: skip
