from django.utils.translation import gettext_lazy as _

from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import action

from django_tasks.task import ResultStatus
from django_tasks.backends.database.models import DBTaskResult

from ox.core.views import UserAppView, nav

from . import serializers


__all__ = ("AppView", "TaskViewSet")


nav.app_nav["settings"]["system"].append(
    nav.NavItem(
        "tasks",
        _("System Tasks"),
        url="ox_tasks:index",
        icon="mdi-cog-clockwise",
        permissions="django_tasks_database.view_dbtaskresult",
    ),
)


class AppView(UserAppView):
    """Application view used to handle users and groups."""

    template_name = "ox/tasks/app.html"
    default_panel = "tasks"


class TaskViewSet(viewsets.ModelViewSet):
    queryset = DBTaskResult.objects.all()
    serializer_class = serializers.TaskSerializer
    search_fields = ["task_path", "queue_name"]

    @action(detail=True, methods=["POST", "PUT"])
    def restart(self, request, pk=None):
        task = self.get_object()
        task.status = ResultStatus.NEW
        task.save()
        return Response(self.get_serializer(instance=task).data, status=201)
