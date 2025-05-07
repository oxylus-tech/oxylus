from ox.core import apps

from django.utils.translation import gettext_lazy as _


__all__ = ("AppConfig",)


class AppConfig(apps.AppConfig):
    name = "ox.apps.contacts"
    label = "ox_contacts"
    verbose_name = _("Contacts")
    icon = "mdi-card-account-mail"

    root_url = "ox/contacts"
    index_urlname = "ox_contacts:index"

    class Meta:
        dependencies = ("ox.auth",)
