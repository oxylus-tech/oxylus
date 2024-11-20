import pytest

from ox.routes import Router

from ox.tests.app import views


@pytest.fixture
def detail_route():
    return views.ValueDetailView._routes[0]


@pytest.fixture
def list_route():
    return views.ValueListView._routes[0]


@pytest.fixture
def api_route():
    return views.ValueApiListView._routes[0]


@pytest.fixture
def viewset_route():
    return views.ValueViewSet._routes[0]


@pytest.fixture
def router():
    router = Router()
    router.register(views)
    return router


class TestRoute:
    def test_is_api_returns_false(self, detail_route, list_route):
        assert not detail_route.is_api
        assert not list_route.is_api

    def test_is_api_returns_true(self, api_route, viewset_route):
        assert api_route.is_api
        assert viewset_route.is_api

    def test_is_viewset_returns_false(self, detail_route, list_route, api_route):
        assert not detail_route.is_viewset
        assert not list_route.is_viewset
        assert not api_route.is_viewset

    def test_is_viewset_returns_true(self, viewset_route):
        assert viewset_route.is_viewset

    def test_url_name(self, detail_route):
        assert detail_route.url_name == "value-detail"

    def test___init__(self):
        pass

    def test__init_defaults(self, detail_route):
        assert detail_route.action == "detail"
        assert detail_route.url == "{name}/<uuid:uuid>/"

    # test_contribute_to_view: proved by fixtures
    # test_get_defaults: proved by fixtures

    def test_get_path(self, detail_route):
        detail_route.get_path()
        breakpoint()
        raise NotImplementedError("still work to do here")

    def test_get_path_with_viewset_raises_error(self, viewset_route):
        with pytest.raises(RuntimeError):
            viewset_route.get_path()


# test_route: proved by fixtures


class TestRouter:
    def test___init__(self, router):
        pass

    def test_urls(self, router):
        pass

    def test_model_routes(self, router):
        pass

    def test_reset(self, router):
        pass

    def test_register(self, router):
        pass

    def test_get_module_routes(self, router):
        pass

    def test_get_view_routes(self, router):
        pass

    def test_get_urls(self, router):
        pass


class TestRouters:
    def test_run_urls(self):
        pass

    def test_routers(self):
        pass

    def test_get_urls(self):
        pass

    def test_get_apps_urls(self):
        pass

    def test_reset(self):
        pass

    def test_reverse_model(self):
        pass

    def test_get(self):
        pass

    def test___getitem__(self):
        pass
