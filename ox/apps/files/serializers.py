from django.utils.translation import pgettext as _p
from rest_framework import serializers

from caps.serializers import OwnedSerializer
from ox.core.serializers import RelatedField

from . import models
from .conf import ox_files_settings


__all__ = ("FolderSerializer", "FileSerializer")


class FolderSerializer(OwnedSerializer):
    parent = RelatedField(required=False, allow_null=True, queryset=models.Folder.objects.all())

    class Meta:
        model = models.Folder
        exclude = ["tree_id"]
        read_only_fields = ["created", "updated", "level", "sync_path"]


class FileSerializer(OwnedSerializer):
    folder = RelatedField(required=False, allow_null=True, queryset=models.Folder.objects.all())

    class Meta:
        model = models.File
        fields = "__all__"
        read_only_fields = ["mime_type", "preview", "preview_size", "file_size", "created", "updated"]

    def validate_file(self, value):
        """Check file size limitation"""
        if value:
            max_size = ox_files_settings.FILE_SIZE_LIMIT
            if value.size > max_size:
                str_size = int(max_size / 1024 / 1024)
                raise serializers.ValidationError(_p("The file size exceeds {size}", {"size": str_size}))
            return value
