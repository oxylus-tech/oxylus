from django.apps import apps
from django.templatetags.static import static

from ox.utils.tests import track_calls
from ox.assets.base import Asset, order_assets, unique_dfs


class TestAssets:
    def test_package_path(self, assets):
        assert assets.package_path == assets.path / assets.name

    def test_contribute(self):
        # we clearly specify CoreAppConfig
        app = apps.get_app_config("ox_core")
        assert app.assets.name == app.npm_package

    def test_get_locations(self, assets):
        assert list(assets.get_locations()) == [
            (assets.name, assets.package_path / "dist"),
            ("", assets.package_path / "node_modules"),
        ]

    def test_list_paths(self, nested):
        paths = dict(nested.list_paths())
        assert paths[nested.name] == nested.package_path / "dist"
        assert nested.dependencies
        for dep in nested.dependencies:
            assert paths[dep.static_dir] == nested.package_path / "node_modules" / dep.name

    def test_css_urls(self, assets):
        calls = track_calls(assets, "get_urls", [("name", "URL")])
        assert assets.css_urls == {"URL"}
        assert calls == [(("css",), {})]

    def test_js_urls(self, assets):
        calls = track_calls(assets, "get_urls", [("name", "URL")])
        assert assets.js_urls == {"URL"}
        assert calls == [(("js",), {})]

    def test_import_map(self, assets):
        calls = track_calls(assets, "get_urls", {"name": "URL"})
        assert assets.import_map == {"imports": {"name": "URL"}}
        assert calls == [(("js",), {})]

    def test_get_urls(self, assets):
        assert list(assets.get_urls("js")) == [
            *assets.get_dependencies_urls("js"),
            *assets.get_includes_urls("js"),
        ]

    def test_get_dependencies_urls(self, assets, nested):
        result = assets.get_dependencies_urls("js")
        nested_result = nested.get_dependencies_urls("js")

        # check values
        assert nested_result
        for asset in nested.dependencies:
            assert isinstance(asset, Asset)
            if asset.js:
                assert nested.get_dependency_url(asset, "js") in nested_result

        # check nesting
        assert all(v in result for v in nested_result)

    def test_get_includes_urls(self, nested):
        result = nested.get_includes_urls("js")

        assert result
        for asset in nested.includes[1:]:
            assert nested.get_include_url(asset, "js") in result

    def test_get_include_url_no_name(self, nested):
        asset = Asset("", js="index.js")
        assert nested.get_include_url(asset, "js") == (nested.name, static(f"{nested.name}/index.js"))

    def test_get_include_url_with_name(self, nested):
        asset = Asset("models", js="index.js")
        assert nested.get_include_url(asset, "js") == (
            f"{nested.name}/{asset.static_dir}",
            static(f"{nested.name}/{asset.static_dir}/index.js"),
        )


def test_order_assets(assets, nested):
    assert order_assets([assets]) == [nested, assets]


def test_unique_dfs(assets, nested):
    assert unique_dfs([assets]) == [assets, nested]
