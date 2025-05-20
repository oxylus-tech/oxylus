from django.apps import apps
from django.core.exceptions import ImproperlyConfigured
from django.http import HttpResponseNotAllowed
from django.views.generic.base import ContextMixin, TemplateView
from django.utils.translation import gettext_lazy as _
from django.urls import reverse

from ..serializers.auth import UserSerializer, GroupSerializer

__all__ = ("BaseAppMixin", "UserAuthMixin", "AppMixin", "AppView")


app_nav = {"settings": {"title": _("Settings"), "type": "group", "order": 100, "items": {}}}
""" Navigation menu """


def register_nav(path, kwargs):
    """Register a navigation item or group."""
    *keys, key = path.split(".")
    group = app_nav

    for k in keys:
        if k not in group:
            group[k] = {"items": {}}
        group = group[k]
        if "items" not in group:
            group["items"] = {}
        group = group["items"]
    group[key] = kwargs


def get_nav(group=None):
    """Get navigation."""
    result = []
    if not group:
        group = app_nav

    for key, value in group.items():
        if "order" not in value:
            value["order"] = 10

        obj = {"value": key, **value}
        if "url" in obj:
            obj["url"] = reverse(obj["url"])

        if items := obj.pop("items", None):
            obj["items"] = get_nav(items)
        result.append(obj)
    result.sort(key=lambda v: (v["order"], v.get("title") or v.get("key")))
    return result


class BaseAppMixin(ContextMixin):
    """Base mixin for applications."""

    title: str = ""
    """Application title (as displayed in ``<title>`` and top bar)."""
    app_config_name: str | None = None
    """AppConfig name of the related application.

    If none provided, retrieve it based of request's resolver match.
    """
    default_panel: str = ""
    """Default panel to display."""

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

    def get_app_nav(self):
        if not hasattr(BaseAppMixin, "__app_nav"):
            BaseAppMixin.__app_nav = get_nav()
        return BaseAppMixin.__app_nav

    def get_context_data(self, **kwargs):
        kwargs["app_config"] = self.get_app_config()
        kwargs["app_data"] = self.get_app_data()
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


class AppMixin(UserAuthMixin, BaseAppMixin):
    public: bool = False


class AppView(AppMixin, TemplateView):
    """Base view used for ox based applications."""

    services: [] = None
    """Allowed services.

    It can either be:
        - a list/tuple of services names
        - a dict of ``{service_name: "permission"}``
    """

    def get_template_names(self):
        try:
            names = super().get_template_names()
        except ImproperlyConfigured:
            names = []

        if hasattr(self, "app_config"):
            names.append(f"{self.app_config.get_root_url()}/app.html")
        return names

    def get(self, *args, service=None, **kwargs):
        context = self.get_context_data(**kwargs)
        if service and not self.service_allowed(service):
            return HttpResponseNotAllowed(f"Service '{service}' is not allowed")
        return self.render_to_response(context)

    def service_allowed(self, service):
        if self.services and service in self.services:
            if isinstance(service, dict):
                perm = self.services[service]
                return self.request.user.has_perm(perm)
            return True
        return False
