from django.urls import path
from rest_framework.routers import DefaultRouter

from ox.core.views import UserAppView
from . import panels, views

router = DefaultRouter()
router.register("account", views.MailAccountViewSet)
router.register("sendmail", views.SendMailViewSet)

api_urls = router.urls

urls = [
    path(
        "",
        UserAppView.as_view(
            template_name="ox/mails/app.html",
            default_panel="sendmails",
            panels=panels.panels,
        ),
        name="index",
    ),
]
