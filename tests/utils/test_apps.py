import pytest

from ox.utils.tests import Mock, track_calls
from ox.utils import apps


class Discover(apps.DiscoverModules):
    def handle_urls(self, app, mod, **kw):
        kw["results"].append((app, mod))

    def handle_sub_module(self, app, mod, **kw):
        pass


@pytest.fixture
def discover():
    return Discover("urls")


@pytest.fixture
def fake_app():
    # we mock ox.core as we are sure there is a module named `urls`
    return Mock(
        name="ox.core",
    )


class TestDiscoverModules:
    def test___init__(self):
        discover = Discover("urls", handle_urls_2=lambda *a: a)
        assert discover.module_names == "urls"
        assert callable(discover.handle_urls_2)

    def test___init__fails(self):
        with pytest.raises(ValueError):
            Discover("urls", wrong_handler=lambda *a: a)

    def test_get_module_names_with_str(self):
        assert Discover("urls").get_module_names() == ["urls"]

    def test_get_module_names_with_list(self):
        assert Discover(["urls"]).get_module_names() == ["urls"]

    def test_run(self, discover, fake_app):
        calls = track_calls(discover, "run_handler")
        discover.run([fake_app], results=[])
        assert calls[0] == (("urls", [fake_app]), {"results": []})

    def test_run_handler(self, discover, fake_app):
        from ox.core import urls

        results = []
        discover.run_handler("urls", [fake_app], results=results)
        assert results == [(fake_app, urls)]

    def test_get_handler(self, discover):
        assert discover.get_handler("urls") == discover.handle_urls

    def test_get_handler_dot_to_underscore(self, discover):
        assert discover.get_handler("sub.module") == discover.handle_sub_module

    def test_get_handler_raises_not_implemented(self, discover):
        with pytest.raises(NotImplementedError):
            discover.get_handler("mama_mia")

    def test_get_app_module(self, discover, fake_app):
        from ox.core import urls

        mod = discover.get_app_module(fake_app, "urls")
        assert mod == urls

    def test_get_app_module_returns_none(self, discover, fake_app):
        mod = discover.get_app_module(fake_app, "mama_mia")
        assert mod is None
