from django.utils.translation import gettext_lazy as _

from ox.core.views import UserAppView, nav
from caps.views import OwnedViewSet, AccessViewSet

from . import serializers, filters, tasks
from .models import Folder, File


__all__ = ("AppView", "FolderViewSet", "FolderAccessViewSet", "FileViewSet", "FileAccessViewSet")


nav.app_nav.append(
    nav.NavGroup(
        "files",
        _("Files"),
        items=[
            nav.NavItem(
                "files",
                _("Files"),
                url="ox_files:index",
                icon="mdi-file-outline",
                permissions="ox_files.view_file",
            ),
            nav.NavItem(
                "folders",
                _("Folders"),
                url="ox_files:index",
                icon="mdi-folder-outline",
                permissions="ox_files.view_folder",
            ),
        ],
    ),
)


class AppView(UserAppView):
    """Application view used to handle users and groups."""

    template_name = "ox/files/app.html"
    default_panel = "folders"


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
    filterset_fields = {"owner__uuid": ["exact"], "folder__uuid": ["exact"], "name": ["exact", "icontains"]}
    search_fields = ["name", "folder__path"]

    def perform_create(self, ser):
        super().perform_create(ser)
        ser.instance.read_mime_type()
        tasks.create_preview.enqueue(file_uuid=str(ser.instance.uuid))

    def perform_update(self, ser):
        if ser.validated_data.get("file"):
            ser.instance.clear_files()
        super().perform_update(ser)
        tasks.create_preview.enqueue(uuid=str(ser.instance.uuid))


class FileAccessViewSet(AccessViewSet):
    queryset = File.Access.objects.all()
