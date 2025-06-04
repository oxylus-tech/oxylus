"""
Provides API endpoints:

    - ``account``: user account edition
    - ``content_type``: ``django.contrib.content_type.models.ContentType``
    - ``user``: ``django.contrib.auth.models.User``
    - ``group``: ``django.contrib.auth.models.Group``
    - ``permission``: ``django.contrib.auth.models.Permission``
    - ``agent``: ``caps.models.Agent``
"""

from django.urls import path
from rest_framework.routers import DefaultRouter

from .views import accounts, auth, core

router = DefaultRouter()
router.register("account", accounts.AccountViewSet, basename="account")
router.register(r"content_type", auth.ContentTypeViewSet, basename="content_type")
router.register(r"permission", auth.PermissionViewSet, basename="permission")
router.register(r"group", auth.GroupViewSet, basename="group")
router.register(r"user", auth.UserViewSet, basename="user")

api_urls = router.urls

urls = [
    path("settings/", core.SettingsView.as_view(), name="settings"),
    path("settings/account/", accounts.AccountView.as_view(), name="account"),
]
