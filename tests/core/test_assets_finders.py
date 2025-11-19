from django.apps import apps
from django.conf import settings
import pytest

from ox.assets.finders import AssetsFinder


@pytest.fixture
def finder():
    return AssetsFinder()


@pytest.fixture
def core_assets():
    return apps.get_app_config("ox_core").assets


class TestAssetsFinder:
    def test_assets(self, finder, core_assets):
        assert finder.assets
        assert core_assets in finder.assets

    def test_locations(self, finder, core_assets):
        assert all(loc in finder.locations for loc in core_assets.get_locations())

    # def check(self, finder):
    #    pass

    def test_list(self, finder):
        items = list(finder.list([]))
        for path, storage in items:
            assert (storage.prefix, storage.base_location) in finder.locations

    find_items = {
        "@oxylus/ox/index.js": settings.BASE_DIR / "assets/@oxylus/ox/dist/index.js",
        "@oxylus/core/index.js": settings.BASE_DIR / "assets/@oxylus/core/dist/index.js",
        "vue/vue.esm-browser.js": settings.BASE_DIR / "assets/@oxylus/ox/node_modules/vue/dist/vue.esm-browser.js",
    }

    def test_find(self, finder):
        for path, expected in self.find_items.items():
            assert finder.find(path) == expected
