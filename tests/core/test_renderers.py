import pytest
from django.core.exceptions import PermissionDenied
from rest_framework.renderers import BrowsableAPIRenderer as _BrowsableAPIRenderer

from ox.core import renderers


class BrowsableAPIRenderer(_BrowsableAPIRenderer):
    def get_context(self, *a, **kw):
        return a, kw


class AdminBrowsableAPIRenderer(renderers.AdminBrowsableAPIRenderer, BrowsableAPIRenderer):
    pass


@pytest.fixture
def api_renderer():
    return AdminBrowsableAPIRenderer()


class TestAdminBrowsableAPIRenderer:
    def test_get_context_allowed(self, api_renderer, staff_request):
        api_renderer.get_context({}, "application/json", {"request": staff_request})

    def test_get_context_not_allowed_anonymous(self, api_renderer, anon_request):
        with pytest.raises(PermissionDenied):
            api_renderer.get_context({}, "application/json", {"request": anon_request})

    def test_get_context_not_allowed_not_staff(self, api_renderer, user_request):
        with pytest.raises(PermissionDenied):
            api_renderer.get_context({}, "application/json", {"request": user_request})
