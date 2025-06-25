from django.urls import path
from rest_framework.routers import DefaultRouter

from ox.core.views import UserAppView
from . import panels, views

router = DefaultRouter()
router.register("task", views.TaskViewSet, basename="task")

api_urls = router.urls

urls = [
    path(
        "",
        UserAppView.as_view(
            default_panel="tasks",
            panels=panels.panels,
        ),
        name="index",
    ),
]
