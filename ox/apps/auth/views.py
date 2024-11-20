from django.contrib.auth.mixins import LoginRequiredMixin, PermissionRequiredMixin

from ox.core.views import AppView


__all__ = ("AppView",)


class AppView(PermissionRequiredMixin, LoginRequiredMixin, AppView):
    """Application view used to handle users and groups."""

    template_name = "ox/auth/app.html"
    permission_required = ["auth.view_user", "auth.view_group"]
    default_panel = "user-list"
