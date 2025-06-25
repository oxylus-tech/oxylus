from django.utils.translation import gettext_lazy as _

from ox.core.panels import registry, Panel


panels = Panel(
    "tasks",
    _("System Tasks"),
    "mdi-cog-clockwise",
    "ox-task-panel",
    url="ox_tasks:index",
    permission="django_tasks_database.view_dbtaskresult",
)

registry["settings"]["system"].append(panels)
