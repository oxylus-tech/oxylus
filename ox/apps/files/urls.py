from django.urls import path
from rest_framework.routers import DefaultRouter

from . import views

router = DefaultRouter()
router.register("folder", views.FolderViewSet, basename="folder")
router.register("folder-access", views.FolderAccessViewSet, basename="folder-access")
router.register("file", views.FileViewSet, basename="file")
router.register("file-access", views.FileAccessViewSet, basename="file-access")

api_urls = router.urls

urls = [
    path("", views.AppView.as_view(), name="index"),
]
