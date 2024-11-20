from django.utils.translation import gettext_lazy as _
from ox.core import apps


__all__ = ("AppConfig",)


class AppConfig(apps.AppConfig):
    name = "ox.tests.app"
    label = "ox_test"
    verbose_name = _("Oxerp Test App")
