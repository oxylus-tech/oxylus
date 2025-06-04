from django.urls import path
from rest_framework.routers import DefaultRouter

from caps.views import AgentViewSet


from . import views

router = DefaultRouter()
router.register("agent", AgentViewSet, basename="agent")

api_urls = router.urls

urls = [
    path("", views.AppView.as_view(), name="index"),
]
