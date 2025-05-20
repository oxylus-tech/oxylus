from django.contrib.auth.mixins import LoginRequiredMixin, PermissionRequiredMixin
from django.utils.translation import gettext_lazy as _

from ox.core.views import AppView, register_nav


__all__ = ("AppView",)


register_nav(
    "settings.auth",
    {
        "title": _("Authentication"),
        "type": "subheader",
        "items": {
            "users": {
                "url": "ox_auth:index",
                "title": _("Users"),
                "icon": "mdi-account",
                "permissions": "auth.view_user",
            },
            "groups": {
                "url": "ox_auth:index",
                "title": _("Groups"),
                "icon": "mdi-account-multiple",
                "permissions": "auth.view_group",
            },
        },
    },
)


class AppView(PermissionRequiredMixin, LoginRequiredMixin, AppView):
    """Application view used to handle users and groups."""

    template_name = "ox/auth/app.html"
    permission_required = ["auth.view_user", "auth.view_group"]
    default_panel = "users"
