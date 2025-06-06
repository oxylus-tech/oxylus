from rest_framework import serializers

from django_tasks.backends.database.models import DBTaskResult


class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = DBTaskResult
        fields = "__all__"
