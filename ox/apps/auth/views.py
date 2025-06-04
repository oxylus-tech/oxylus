from django.contrib.auth.mixins import LoginRequiredMixin
from django.utils.translation import gettext_lazy as _

from ox.core.views import AppView, nav


__all__ = ("AppView",)


nav.app_nav["settings"].append(
    nav.NavSubGroup(
        "auth",
        _("Authentication"),
        items=[
            nav.NavItem(
                "users",
                _("Users"),
                url="ox_auth:index",
                icon="mdi-account",
                permissions="auth.view_user",
            ),
            nav.NavItem(
                "groups",
                _("Groups"),
                url="ox_auth:index",
                icon="mdi-account-multiple",
                permissions="auth.view_group",
            ),
        ],
    ),
)


class AppView(LoginRequiredMixin, AppView):
    """Application view used to handle users and groups."""

    template_name = "ox/auth/app.html"
    default_panel = "users"
