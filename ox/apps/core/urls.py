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

from . import views

router = DefaultRouter()
router.register("account", views.AccountViewSet, basename="account")
router.register(r"content_type", views.ContentTypeViewSet, basename="content_type")
router.register(r"permission", views.PermissionViewSet, basename="permission")
router.register(r"group", views.GroupViewSet, basename="group")
router.register(r"user", views.UserViewSet, basename="user")
router.register(r"conf", views.ConfViewSet, basename="conf")

api_urls = router.urls

urls = [
    path("settings/", views.SettingsView.as_view(), name="settings"),
    path("settings/account/", views.AccountView.as_view(), name="account"),
]

urlpatterns = [
    path("", views.DashboardView.as_view(), name="index"),
    path("accounts/login/", views.LoginView.as_view(), name="login"),
    path("accounts/logout/", views.LogoutView.as_view(), name="logout"),
]
