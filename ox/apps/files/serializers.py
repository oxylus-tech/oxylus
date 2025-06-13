from caps.serializers import OwnedSerializer
from ox.core.serializers import RelatedField

from . import models


__all__ = ("FolderSerializer", "FileSerializer")


class FolderSerializer(OwnedSerializer):
    parent = RelatedField(required=False, allow_null=True, queryset=models.Folder.objects.all())

    class Meta:
        model = models.Folder
        exclude = ["tree_id"]
        read_only_fields = ["created", "updated", "level"]


class FileSerializer(OwnedSerializer):
    folder = RelatedField(required=False, allow_null=True, queryset=models.Folder.objects.all())

    class Meta:
        model = models.File
        fields = "__all__"
        read_only_fields = ["mime_type", "preview", "preview_size", "file_size", "created", "updated"]
