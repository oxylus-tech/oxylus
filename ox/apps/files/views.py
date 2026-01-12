from caps.views import OwnedViewSet, AccessViewSet

from ox.apps.content.views import MessageViewSet
from . import filters, serializers, tasks
from .models import Folder, File, FolderComment, FileComment


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


class FolderCommentViewSet(MessageViewSet):
    queryset = FolderComment.objects.all().order_by("-created").select_related("source")
    serializer_class = serializers.FolderCommentSerializer
    filterset_fields = {
        **MessageViewSet.filterset_fields,
        "thread__uuid": ["exact"],
        "author__id": ["exact"],
    }


class FileCommentViewSet(MessageViewSet):
    queryset = FileComment.objects.all().order_by("-created").select_related("source")
    serializer_class = serializers.FileCommentSerializer
    filterset_fields = {
        **MessageViewSet.filterset_fields,
        "thread__uuid": ["exact"],
        "author__id": ["exact"],
    }
