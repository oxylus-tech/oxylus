from ox.core import apps

from django.utils.translation import gettext_lazy as _


__all__ = ("AppConfig",)


class AppConfig(apps.AppConfig):
    name = "ox.apps.auth"
    label = "ox_auth"
    verbose_name = _("Users & Groups")
    icon = "mdi-account-group-outline"

    root_url = "ox/auth"
    index_urlname = "ox_auth:index"
