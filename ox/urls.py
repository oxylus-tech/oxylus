"""Prototype URL Configuration.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from collections import namedtuple
from functools import cached_property
from typing import ClassVar

from django import apps
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView

from ox.core.views import core, accounts
from ox.utils.apps import DiscoverModules


AppUrls = namedtuple(
    "AppUrls",
    [
        "urls",
        "api",
    ],
)


class Router:
    """This class is used to retrieve urls in app's ``urls`` module, under keys
    ``urls`` and ``api_urls``.

    It will generate three kind of url:

    - ``
    - ``/{url}``: for ``urls``'s absolute url (starting with a ``/``);
    - ``/{app_root_url}/{url}``: for ``urls``'s relative url;
    - ``/api/{app_root_url}/``: for url of api views and viewsets (declared using ``api_urls``);
    """

    class Discover(DiscoverModules):
        module_names = "urls"

        def handle_urls(self, app, module, app_urls, **kw):
            urls = [
                getattr(module, "urls", None),
                getattr(module, "api_urls", None),
            ]
            if any(urls):
                app_urls[app] = AppUrls(*urls)

    discover: ClassVar[Discover] = Discover()

    @cached_property
    def apps_urls(self) -> dict[apps.AppConfig, tuple]:
        """Return urls as a dict of `{app: (urls, api_urls)}`."""
        app_urls = {}
        self.discover.run_handler("urls", app_urls=app_urls)
        return app_urls

    def get_urls(self) -> list:
        """Generate and return url for all applications."""
        patterns = []
        for app, urls in self.apps_urls.items():
            patterns.extend(self.get_app_urls(app, urls))
        return patterns

    def get_app_urls(self, app, urls: AppUrls) -> list:
        """Return urls for a specific app."""
        root_url, patterns = app.get_root_url(), []

        if urls.urls:
            patterns.append(path(f"{root_url}/", include((urls.urls, app.label))))
        if urls.api:
            patterns.append(path(f"api/{root_url}/", include((urls.api, app.label), namespace=f"{app.label}-api")))
        return patterns


router = Router()


urlpatterns = [
    path("", accounts.DashboardView.as_view(), name="index"),
    path("api/", (lambda *a, **kw: {}), name="api-index"),
    *router.get_urls(),
    path("api/schema/", SpectacularAPIView.as_view(), name="schema"),
    path("api/swagger/", SpectacularSwaggerView.as_view(url_name="schema")),
    path("admin/", admin.site.urls),
    path("accounts/login/", accounts.LoginView.as_view(), name="login"),
]


if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT) + static(
        settings.MEDIA_URL, document_root=settings.MEDIA_ROOT
    )

handler403 = core.PermissionForbiddenView.as_view()
handler405 = core.InternalErrorView.as_view()
