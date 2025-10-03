from typing import Any

from django.apps import apps
from django.contrib.auth.mixins import LoginRequiredMixin
from django.core.exceptions import ImproperlyConfigured
from django.views.generic.base import ContextMixin, TemplateView

from ..panels import Panels, registry
from ..serializers.auth import UserSerializer, GroupSerializer

__all__ = ("AppMixin", "UserAuthMixin", "AppView", "UserAppView")


class AppMixin(ContextMixin):
    """Base mixin for applications."""

    title: str = ""
    """Application title (as displayed in ``<title>`` and top bar)."""
    app_config_name: str | None = None
    """AppConfig name of the related application.

    If none provided, retrieve it based of request's resolver match.
    """
    default_panel: str = ""
    """Default panel to display."""
    panels: Panels = None
    """Application's panels descriptors."""

    def get_app_config(self):
        """Return application config.

        Set to request resolved match application name by default.
        """
        app_name = self.app_config_name or self.request.resolver_match.app_name
        self.app_config = apps.get_app_config(app_name)
        return self.app_config

    def get_app_data(self, **kwargs):
        """Return application data to pass down to js application."""
        if current := self.request.GET.get("panel", self.default_panel):
            kwargs.setdefault("panel", current)
        kwargs["nav"] = self.get_app_nav()
        return kwargs

    def get_app_nav(self) -> dict[str, Any]:
        """Return application navigation menu."""
        return registry.nav_data

    def get_context_data(self, **kwargs):
        kwargs["app_config"] = self.get_app_config()
        kwargs["app_data"] = self.get_app_data()
        kwargs["panels"] = self.panels
        kwargs.setdefault("title", self.title)
        return super().get_context_data(**kwargs)


class UserAuthMixin:
    """Provide request's user in Application's initial data, as ``user``."""

    user_ser_class = UserSerializer
    group_ser_class = GroupSerializer

    def get_app_data(self, **kwargs):
        if not kwargs.get("user"):
            kwargs["user"] = self.user_ser_class(self.request.user).data
            kwargs["groups"] = self.group_ser_class(self.request.user.groups, many=True).data
        kwargs.setdefault("urls", {})
        # urls["user"] = reverse("auth:api:")
        return super().get_app_data(**kwargs)


class AppView(UserAuthMixin, AppMixin, TemplateView):
    """Base view used for ox based applications."""

    template_name = "ox/core/app.html"

    def get_template_names(self) -> list[str]:
        """
        By default return a list with:

            - :py:attr:`template_name` value
            - ``{self.app_config.root_url}/app.html``, if app_config is found.
        """
        try:
            names = super().get_template_names()
        except ImproperlyConfigured:
            names = []

        if hasattr(self, "app_config"):
            names.append(f"{self.app_config.root_url}/app.html")
        return names

    def get(self, *args, service=None, **kwargs):
        context = self.get_context_data(**kwargs)
        return self.render_to_response(context)


class UserAppView(LoginRequiredMixin, AppView):
    """Application view requiring user to be authentified."""

    pass
