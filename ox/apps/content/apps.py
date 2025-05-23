from ox.core import apps

from django.utils.translation import gettext_lazy as _


__all__ = ("AppConfig",)


class AppConfig(apps.AppConfig):
    name = "ox.apps.locations"
    label = "ox_locations"
    verbose_name = _("Locations")
    icon = "mdi-flag"

    root_url = "ox/locations"
    index_urlname = "ox_locations:index"
