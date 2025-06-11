from django.contrib.auth.mixins import LoginRequiredMixin
from django.utils.translation import gettext_lazy as _

from ox.core.views import AppView, nav
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


class AppView(LoginRequiredMixin, AppView):
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
        tasks.create_preview.enqueue(file_id=str(ser.instance.uuid))


class FileAccessViewSet(AccessViewSet):
    queryset = File.Access.objects.all()
