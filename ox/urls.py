"""
This module provides urls for Oxylus applications.

It scans over applications' directory for module ``urls`` from which it gets:

    - ``urls``: the list of applications urls to regular views. They will be namespaced under the app label. The final url will look like: ``{root_url}/{path}``.
    - ``api_urls``: the list of applications urls to API views. They will be namespaced as ``{app.label}-api``. The final url will look like: ``api/{root_url}/{path}``.
    - ``urlpatterns``: url paths to prepend to project's `urlpatterns`. Those are not namespaced.

Where ``root_url`` is specified on the AppConfig instance (if none, uses app label). Note that only subclasses of :py:class:`ox.core.apps.AppConfig` are taken in account).

Thoses urls will be automatically added to url patterns.


.. note::

    URL are discovered only for Oxylus based application, aka using :py:class:`ox.core.apps.AppConfig`.

"""

from collections import namedtuple
from functools import cached_property
from typing import ClassVar

from django import apps
from django.urls import path, include

from ox.utils.apps import DiscoverModules


AppUrls = namedtuple("AppUrls", ["urls", "api", "urlpatterns"])


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
        oxylus_apps = True

        def handle_urls(self, app, module, app_urls, **kw):
            # FIXME: filter by Oxylus AppConfig only
            urls = [
                getattr(module, "urls", None),
                getattr(module, "api_urls", None),
                getattr(module, "urlpatterns", None),
            ]
            # don't filter over urlpatterns, as some applications as DRF may
            # include it.
            if urls[0] or urls[1]:
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
        root_url, patterns = app.root_url, []

        if urls.urls:
            patterns.append(path(f"{root_url}/", include((urls.urls, app.label))))
        if urls.api:
            patterns.append(path(f"api/{root_url}/", include((urls.api, app.label), namespace=f"{app.label}-api")))
        return patterns

    def get_urlpatterns(self) -> list:
        """Return a list of urls patterns."""
        patterns = []
        for urls in self.apps_urls.values():
            if u := urls.urlpatterns:
                patterns.extend(u)
        return patterns


router = Router()


urlpatterns = [
    *router.get_urlpatterns(),
    path("api/", (lambda *a, **kw: {}), name="api-index"),
    *router.get_urls(),
]
