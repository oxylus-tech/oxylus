from pathlib import Path
from uuid import UUID

from django.core.exceptions import PermissionDenied
from django.views.generic import View
from django.views.generic.detail import SingleObjectMixin
from django.http import HttpResponse, Http404, FileResponse

from caps.views import OwnedViewSet, AccessViewSet
from caps.views.mixins import SingleOwnedMixin, OwnedPermissionMixin

from ox.core.conf import ox_settings
from ox.apps.content.views import MessageViewSet
from . import filters, serializers, tasks
from .models import Folder, File, FolderComment, FileComment


__all__ = ("FolderViewSet", "FolderAccessViewSet", "FileViewSet", "FileAccessViewSet")


class ServeFileView(SingleOwnedMixin, OwnedPermissionMixin, SingleObjectMixin, View):
    """Serve protected file to user, checking access permission."""

    model = File

    preview: bool = False
    """ Serve preview instead of file. """

    def get(self, request, uuid: str | UUID, *args, **kwargs):
        self.object = self.get_object()
        if not request.user.has_perm("ox_files.view_file", self.object):
            raise PermissionDenied("You don't have access to this file.")

        if self.preview:
            field = self.object.preview
        else:
            field = self.object.file

        if not Path(field.path).exists():
            raise Http404(f"The file {self.object.name} does not exists on the filesystem.")

        match ox_settings.HTTP_SERVER_BACKEND:
            case "nginx":
                response = HttpResponse()
                response["X-Accel-Redirect"] = ox_settings.protected_media_url(field.name)
            case "apache":
                response = HttpResponse()
                response["X-Sendfile"] = field.path

            case _:
                response = FileResponse(open(field.path, "rb"))

        response["Content-Disposition"] = f'inline; filename="{self.object.name}"'
        return response


class FolderViewSet(OwnedViewSet):
    queryset = Folder.objects.all().order_by("-updated")
    serializer_class = serializers.FolderSerializer
    filterset_class = filters.FolderFilterSet
    search_fields = ["path"]


class FolderAccessViewSet(AccessViewSet):
    queryset = Folder.Access.objects.all()


class FileViewSet(OwnedViewSet):
    # FIXME: permission to add file to a folder
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
        if ser.validated_data.get("file_data"):
            ser.instance.clear_files()
        super().perform_update(ser)
        tasks.create_preview.enqueue(uuid=str(ser.instance.uuid))


class FileAccessViewSet(AccessViewSet):
    queryset = File.Access.objects.all()


class FolderCommentViewSet(MessageViewSet):
    queryset = FolderComment.objects.all().order_by("-created")
    serializer_class = serializers.FolderCommentSerializer


class FileCommentViewSet(MessageViewSet):
    queryset = FileComment.objects.all().order_by("-created")
    serializer_class = serializers.FileCommentSerializer
