import pytest
from django.urls import reverse

from ox.core import panels as ox_panels


@pytest.fixture
def base_panel():
    return ox_panels.BasePanel("name", "title", icon="icon", order=100)


@pytest.fixture
def panel():
    return ox_panels.Panel("name 2", "title 2", url="ox_auth:index", order=10)


@pytest.fixture
def panels_mixin():
    return ox_panels.PanelsMixin()


@pytest.fixture
def panels(base_panel, panel):
    return ox_panels.Panels("group_1", "group 1", [base_panel, panel])


@pytest.fixture
def registry(panels):
    return ox_panels.Registry([panels])


class TestBasePanel:
    def test_get_panels(self, base_panel):
        with pytest.raises(NotImplementedError):
            base_panel.get_panels()

    def test_serialize(self, base_panel):
        assert base_panel.serialize(extra=123) == {
            "name": "name",
            "type": "",
            "order": 100,
            "icon": "icon",
            "title": "title",
            "permission": "",
            "extra": 123,
        }


class TestPanel:
    def test_get_panels(self, panel):
        assert list(panel.get_panels()) == [panel]

    def test_serialize(self, panel):
        assert panel.serialize()["url"] == reverse(panel.url)


class TestPanelsMixin:
    def test_reset_items_with_iterable(self, panels_mixin, panel):
        assert panels_mixin.reset_items([panel]) == {panel.name: panel}

    def test_reset_items_with_dict(self, panels_mixin, panel):
        items = {"test": panel}
        assert panels_mixin.reset_items(items) == items

    def test_append(self, panels_mixin, panel):
        panels_mixin.items = {}
        panels_mixin.append(panel)
        assert panels_mixin.items == {panel.name: panel}

    def test_get_panels(self, panels_mixin, panel):
        panels_mixin.reset_items([panel])
        assert list(panels_mixin.get_panels()) == [panel]

    def test_serialize_items(self, panels_mixin, panel, base_panel):
        # order is important here, as this is sorted within serialize items and
        # we want to check it.
        panels_mixin.reset_items([base_panel, panel])
        assert panels_mixin.serialize_items() == [panel.serialize(), base_panel.serialize()]

    def test___getitem__(self, panels_mixin, panel):
        panels_mixin.reset_items([panel])
        assert panels_mixin[panel.name] == panel

    def test___setitem__(self, panels_mixin, panel, base_panel):
        panels_mixin.reset_items([panel])
        panels_mixin[panel.name] = base_panel
        assert panels_mixin.items[panel.name] == base_panel


class TestPanels:
    def test_serialize(self, panels, panel, base_panel):
        assert panels.serialize()["items"] == [panel.serialize(), base_panel.serialize()]
        assert panels.serialize(items={"a": 123})["items"] == {"a": 123}


class TestRegistry:
    def test_nav_data(self, registry, panels):
        assert registry.nav_data == registry.serialize_items()
        assert "nav_data" in registry.__dict__

    def test_append(self, registry, panels, panel):
        registry.nav_data  # force nav_data property caching
        registry.append(panel)
        assert "nav_data" not in registry.__dict__

    def test___getitem__(self, registry, panels):
        registry.nav_data  # force nav_data property caching
        registry[panels.name]
        assert "nav_data" not in registry.__dict__

    def test___setitem__(self, registry, panels):
        registry.nav_data  # force nav_data property caching
        registry[panels.name] = panels
        assert "nav_data" not in registry.__dict__
