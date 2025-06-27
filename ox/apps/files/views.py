from caps.views import OwnedViewSet, AccessViewSet

from . import serializers, filters, tasks
from .models import Folder, File


__all__ = ("FolderViewSet", "FolderAccessViewSet", "FileViewSet", "FileAccessViewSet")


class FolderViewSet(OwnedViewSet):
    queryset = Folder.objects.all().order_by("-updated")
    serializer_class = serializers.FolderSerializer
    filterset_class = filters.FolderFilterSet
    search_fields = ["path"]


class FolderAccessViewSet(AccessViewSet):
    queryset = Folder.Access.objects.all()


class FileViewSet(OwnedViewSet):
    queryset = File.objects.all().order_by("-updated")
    serializer_class = serializers.FileSerializer
    filterset_fields = {
        "uuid": ["exact", "in"],
        "owner__uuid": ["exact"],
        "folder__uuid": ["exact"],
        "name": ["exact", "icontains"],
    }
    search_fields = ["name", "folder__path"]

    def perform_create(self, ser):
        super().perform_create(ser)
        ser.instance.read_mime_type()
        tasks.create_preview.enqueue(uuid=str(ser.instance.uuid))

    def perform_update(self, ser):
        if ser.validated_data.get("file"):
            ser.instance.clear_files()
        super().perform_update(ser)
        tasks.create_preview.enqueue(uuid=str(ser.instance.uuid))


class FileAccessViewSet(AccessViewSet):
    queryset = File.Access.objects.all()
