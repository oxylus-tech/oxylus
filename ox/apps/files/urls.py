from django.urls import path
from rest_framework.routers import DefaultRouter

from ox.core.views import UserAppView
from . import panels, views

router = DefaultRouter()
router.register("folder", views.FolderViewSet, basename="folder")
router.register("folder-access", views.FolderAccessViewSet, basename="folder-access")
router.register("file", views.FileViewSet, basename="file")
router.register("file-access", views.FileAccessViewSet, basename="file-access")

api_urls = router.urls

urls = [
    path(
        "",
        UserAppView.as_view(
            default_panel="files",
            panels=panels.panels,
        ),
        name="index",
    ),
]
