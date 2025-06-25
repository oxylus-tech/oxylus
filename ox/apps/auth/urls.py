from django.urls import path
from rest_framework.routers import DefaultRouter

from caps.views import AgentViewSet


from ox.core.views import UserAppView
from . import panels

router = DefaultRouter()
router.register("agent", AgentViewSet, basename="agent")

api_urls = router.urls

urls = [
    path(
        "",
        UserAppView.as_view(
            default_panel="users",
            panels=panels.panels,
        ),
        name="index",
    ),
]
