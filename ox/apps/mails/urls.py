from django.urls import path
from rest_framework.routers import DefaultRouter

from ox.core.views import UserAppView
from . import panels, views

router = DefaultRouter()
router.register("account", views.MailAccountViewSet)
router.register("mail", views.MailViewSet)

api_urls = router.urls

urls = [
    path(
        "",
        UserAppView.as_view(
            default_panel="mails",
            panels=panels.panels,
        ),
        name="index",
    ),
]
