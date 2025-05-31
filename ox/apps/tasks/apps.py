from ox.core import apps

from django.utils.translation import gettext_lazy as _


__all__ = ("AppConfig",)


class AppConfig(apps.AppConfig):
    name = "ox.apps.tasks"
    label = "ox_tasks"
    verbose_name = _("Tasks")
    icon = "mdi-wrench-clock"

    root_url = "ox/tasks"
    index_urlname = "ox_tasks:index"
