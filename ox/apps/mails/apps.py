from ox.core import apps

from django.utils.translation import gettext_lazy as _


__all__ = ("AppConfig",)


class AppConfig(apps.AppConfig):
    name = "ox.apps.mails"
    label = "ox_mails"
    verbose_name = _("Mails")
    icon = "mdi-mail"

    root_url = "ox/mails"
    index_urlname = "ox_mails:index"

    class Meta:
        dependencies = ("ox.auth", "ox.contacts", "ox.content")
