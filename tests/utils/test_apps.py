import pytest

from ox.utils import apps


class FakeApp:
    path = "ox"


class Discover(apps.DiscoverModules):
    def handle_urls(app, mod, **kw):
        kw["results"].append((app, mod))


@pytest.fixture
def discover():
    return Discover()


@pytest.fixture
def fake_app():
    return FakeApp()


class TestDiscoverModules:
    def test_run(self, discover, fake_app):
        results = []
        discover.run([fake_app], results=results)
        assert results == [(fake_app, discover.get_app_module(fake_app, "urls"))]

    # run_handler is tested over test_run

    def test_get_handler(self, discover):
        handler = discover.get_handler("urls")
        assert handler == discover.handle_urls

    def test_get_handler_raises_not_implemented(self, discover):
        with pytest.asserts(NotImplementedError):
            discover.get_handler("mama_mia")

    def test_get_app_module(self, discover, fake_app):
        from ox import urls

        mod = discover.get_app_module(fake_app, "urls")
        assert mod == urls

    def test_get_app_module_returns_none(self, discover, fake_app):
        mod = discover.get_app_module(fake_app, "mama_mia")
        assert mod is None
