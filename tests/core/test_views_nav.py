import pytest

from ox.core.views import nav


@pytest.fixture
def base_nav_item():
    return nav.BaseNavItem("name", "title", icon="icon", order=100)


@pytest.fixture
def nav_item():
    return nav.NavItem("name 2", "title 2", url="ox_contacts:index", order=10)


@pytest.fixture
def nav_group(base_nav_item, nav_item):
    return nav.NavGroup("group_1", "group 1", [base_nav_item, nav_item])


@pytest.fixture
def app_nav(nav_group):
    return nav.AppNav([nav_group])


class TestBaseNavItem:
    def test_serialize(self, base_nav_item):
        assert base_nav_item.serialize(extra=123) == {
            "name": "name",
            "type": "",
            "order": 100,
            "icon": "icon",
            "title": "title",
            "permissions": "",
            "extra": 123,
        }


class TestNavItem:
    def test_serialize(self, nav_item):
        assert "url" in nav_item.serialize()


class TestNavGroupMixin:
    # TODO: NavGroupMixin.reset_items
    def test_reset_items(self, nav_group, base_nav_item, nav_item):
        assert isinstance(nav_group.items, dict)
        assert nav_group["name"] == base_nav_item
        assert nav_group["name 2"] == nav_item

    def test_serialize_items(self, nav_group, base_nav_item, nav_item):
        # order sort
        assert nav_group.serialize_items() == [nav_item.serialize(), base_nav_item.serialize()]

    def test_append(self, nav_group):
        item = nav_group.append(nav.NavGroup("group_2", "Group 2"))
        assert nav_group["group_2"] is item


class TestNavItemGroup:
    def test_serialize(self, nav_group):
        assert "items" in nav_group.serialize()


class TestAppNav:
    def test_data(self, app_nav):
        assert isinstance(app_nav.data, list)

    def test_append(self, app_nav, nav_group):
        data = app_nav.data
        group_2 = app_nav.append(nav.NavGroup("group_2", "Group 2"))
        data_2 = app_nav.data
        assert app_nav.items["group_2"] is group_2
        assert data != data_2
