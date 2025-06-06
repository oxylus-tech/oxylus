from django.urls import path
from rest_framework.routers import DefaultRouter

from . import views

router = DefaultRouter()
router.register("task", views.TaskViewSet, basename="task")

api_urls = router.urls

urls = [
    path("", views.AppView.as_view(), name="index"),
]
