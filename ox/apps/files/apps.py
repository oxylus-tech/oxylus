from ox.core import apps

from django.utils.translation import gettext_lazy as _


__all__ = ("AppConfig",)


class AppConfig(apps.AppConfig):
    name = "ox.apps.files"
    label = "ox_files"
    verbose_name = _("Files")
    icon = "mdi-document-multiple-outline"

    root_url = "ox/files"
    index_urlname = "ox_files:index"

    def ready(self):
        from .processors import registry

        registry.populate()
