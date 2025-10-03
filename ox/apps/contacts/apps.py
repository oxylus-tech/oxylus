from ox.core import apps

from django.utils.translation import gettext_lazy as _


__all__ = ("AppConfig",)


class AppConfig(apps.AppConfig):
    name = "ox.apps.contacts"
    label = "ox_contacts"
    verbose_name = _("Contacts")
    icon = "mdi-card-account-mail"

    root_url = "ox/contacts"
    npm_package = "@oxylus/contacts"

    class Meta:
        dependencies = ("ox.auth", "ox.locations")

    def ready(self):
        from . import signals  # noqa: F401
