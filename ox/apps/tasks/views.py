from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import action

from django_tasks.task import ResultStatus
from django_tasks.backends.database.models import DBTaskResult


from . import serializers


__all__ = ("TaskViewSet",)


class TaskViewSet(viewsets.ModelViewSet):
    queryset = DBTaskResult.objects.all().order_by("-finished_at", "-enqueued_at", "-started_at")
    serializer_class = serializers.TaskSerializer
    search_fields = ["task_path", "queue_name"]

    @action(detail=True, methods=["POST", "PUT"])
    def restart(self, request, pk=None):
        task = self.get_object()
        task.status = ResultStatus.NEW
        task.save()
        return Response(self.get_serializer(instance=task).data, status=201)
