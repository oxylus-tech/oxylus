"""
This module provides application menu navigation.

In order to allow dynamic menus to be rendered (including based on permission), the :py:class:`AppNav` is used to register different items.
Items can be nested in groups (:py:class:`NavGroup` and :py:class:`NavSubGroup`).

At page rendering it is translated into a JSON object passed down to frontend application that will translate it
into ``OxAppNavItem`` components. Basically this component is rendered
in a Vuetify ``<v-list>`` rendering either:

    - ``<v-list-item>``: for :py:class:`NavItem`
    - ``<v-list-group>``: for :py:class:`NavGroup`
    - ``<v-list-subheader>`` + ``<v-list-item>``: for :py:class:`NavSubGroup`

The component also ensure user only sees the items he has permissions for.

The :py:data:`app_nav` global object is used to register menus on a global scale (retrieved by :py:meth:`.views.app.BaseAppMixin.get_app_nav`).

By convention the navigation items are registered inside ``views.py`` module, such as:

    .. code-block:: python

        from ox.views import nav

        nav.app_nav.append(
            nav.NavGroup("contacts", _("Contacts"), items=[
                nav.NavItem("persons", _("Persons"),
                    url="ox_contacts:index",
                    icon="mdi-card-account-mail",
                    order=0,
                    permissions="ox_contacts.view_person",
                ),
                # ...
                nav.NavSubGroup("settings", _("Settings"),
                    order=100,
                    items=[
                        nav.NavItem("organisationtypes", _("Organisation Types"),
                            url="ox_contacts:index",
                            icon="mdi-domain-switch",
                            permissions="ox_contacts.view_organisationtype",
                        )
                    ],
                ),
            ])
        )

        # use this to append to an already registered group:
        # nav.app_nav["settings"].append(
        #    # nav.NavSubGroup(...)
        # )

"""

from typing import Any, Generator, Iterable, TypeAlias
from functools import cached_property

from django.urls import reverse


__all__ = ("NavItem", "NavGroup", "NavSubGroup", "AppNav", "app_nav")


class BaseNavItem:
    type: str = ""
    """ Menu item type: "group", "subheader", "item". """
    name: str = ""
    """ Item name or panel. """
    component: str = ""
    """ Vue component used to render panel. """
    order: int = 0
    """ Menu sort order """
    icon: str = ""
    """ Item icon """
    title: str = ""
    """ Displayed title """
    permissions: str = ""
    """ Permission required to display view. """

    def __init__(self, name, title, **kwargs):
        self.name = name
        self.title = title
        self.__dict__.update(kwargs)

    def serialize(self, **kwargs) -> dict[str, Any]:
        return {
            "name": self.name,
            "type": self.type,
            "order": self.order,
            "icon": self.icon,
            "title": self.title,
            "permissions": self.permissions,
            **kwargs,
        }


class NavItem(BaseNavItem):
    """
    A navigation menu item targetting a panel (by :py:attr:`~BaseNavItem.name`) at the specific :py:attr:`url`.
    """

    type = "item"
    url: str = None
    """ Url name to app view. """

    def serialize(self, **kwargs):
        return super().serialize(**{"url": self.url and reverse(self.url), **kwargs})


class NavGroupMixin:
    ResetItems: TypeAlias = Iterable[BaseNavItem] | dict[str, BaseNavItem]
    """ Items provided to :py:meth:`reset_items` or ``__init__``. """

    items: dict[str, BaseNavItem] = None
    """ Groups' nested items. """

    def reset_items(self, items: ResetItems | None = None):
        """Reset items.

        :param items: can be a list or a dict
        """
        if isinstance(items, (list, tuple)):
            items = {item.name: item for item in items}
        self.items = items or {}

    def append(self, item: BaseNavItem) -> BaseNavItem:
        """Add new item to group.

        :param item: item
        :param path: dot separated path to parent group
        :return: the appended item
        """
        self.items[item.name] = item
        return item

    def iter(self) -> Generator[NavItem]:
        """Yield over all nested items using DFS order."""
        for item in self.items:
            if issubclass(item, NavGroup):
                for item_ in item.iter():
                    yield item_
            else:
                yield item

    def serialize_items(self) -> list[dict[str, Any]]:
        items = [item.serialize() for item in self.items.values()]
        items.sort(key=lambda v: (v["order"], v["title"] or v["name"]))
        return items

    def __getitem__(self, key):
        return self.items[key]

    def __setitem__(self, key, value):
        self.items[key] = value


class NavGroup(NavGroupMixin, BaseNavItem):
    """Navigation sub-group (translates to ``v-list-group``)."""

    type = "group"

    def __init__(self, name, title, items: NavGroupMixin.ResetItems | None = None, **kwargs):
        self.reset_items(items)
        super().__init__(name, title, **kwargs)

    def serialize(self, **kwargs):
        if "items" not in kwargs:
            kwargs["items"] = self.serialize_items()
        return super().serialize(**kwargs)


class NavSubGroup(NavGroup):
    """Navigation sub-group (translates to ``v-list-subheader`` + group)."""

    type = "subheader"


class AppNav(NavGroupMixin):
    """Main application menu, registering items."""

    def __init__(self, items: NavGroupMixin.ResetItems | None = None):
        self.reset_items(items)

    @cached_property
    def data(self) -> list[dict[str, Any]]:
        """Menu data as provided to frontend application."""
        return self.serialize_items()

    def append(self, item):
        item = super().append(item)
        if "data" in self.__dict__:
            delattr(self, "data")
        return item

    def __getitem__(self, key):
        # assume that whenever a child is accessed, this is for update.
        # we ensure cached `data` is cleared.
        if "data" in self.__dict__:
            delattr(self, "data")
        return super().__getitem__(key)

    def __setitem__(self, key, value):
        if "data" in self.__dict__:
            delattr(self, "data")
        return super().__setitem__(key, value)


app_nav = AppNav()
""" Main menu for applications. """
