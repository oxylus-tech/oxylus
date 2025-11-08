"""
This module provide application's panels description.

This is used to generate main navigation menu and application view's panels.

Panels are logically organised using the following structure:

    - A :py:class:`Panel` inside a group of :py:class:`Panels`;
    - A :py:class:`Panels` can be nested (once) in another one (eg. "Settings" regroup multiple settings applications);

Panels are defined in applications' module ``panels.py`` in order to separate concerns with the views. However
they are not discovered automatically, but by importing the module into the view (in order to assign :py:attr:`~.views.app.AppView.panels`).

Panel and panels are registered through the global object :py:data:`registry`.


Application template
--------------------
An :py:class:`~.views.app.AppView` have :py:attr:`~.views.app.AppView.panels` assigned to a :py:class:`Panels`
instance. This is used to generate components inside the template using
provided :py:attr:`Panel.component` (aka Vue component), and :py:attr:`Panel.template`, :py:attr:`actions_template`
(used for extensibility).


Menu rendering
--------------

The method :py:meth:`.views.app.AppMixin.get_app_nav` retrieves menu structure. It is provided to the ``OxApp``
component. The ``OxAppNavItem`` is then used to actually render each elements.


Example
-------

By convention the navigation items are registered inside ``panels.py`` module, such as:

    .. code-block:: python

        from ox.core.panels import registry, Panel, Panels

        panels = Panels("contacts", _("Contacts"), items=[
                Panel("persons", _("Persons"), "mdi-card-account-mail",
                    url="ox_contacts:index",
                    order=0,
                    permission="ox_contacts.view_person",
                ),
                # ...
                Panels("settings", _("Settings"),
                    order=100,
                    items=[
                        Panel("organisationtypes", _("Organisation Types"), "mdi-domain-switch",
                            url="ox_contacts:index",
                            permission="ox_contacts.view_organisationtype",
                        )
                    ],
                ),
            ])
        )
        registry.append(panels)

        # use this to append to an already registered group:
        # registry["settings"].append(panels)

"""

from __future__ import annotations

from typing import Any, Generator, Iterable, TypeAlias
from functools import cached_property

from django.utils.translation import gettext_lazy as _
from django.urls import reverse


__all__ = ("BasePanel", "Panel", "Panels", "Registry", "registry")


class BasePanel:
    """ """

    type: str = ""
    """
    Menu item type: ``group``, ``subheader``, ``item``.

    Use by frontend ``OxNavItem``.
    """
    name: str = ""
    """ Item name or panel. """
    title: str = ""
    """ Displayed title """
    icon: str = ""
    """ Item icon """
    order: int = 0
    """ Menu sort order """
    permission: str = ""
    """ Permission required to display view. """

    def __init__(self, name, title, icon="", **kwargs):
        self.name = name
        self.title = title
        self.icon = icon
        self.__dict__.update(kwargs)

    def get_panels(self) -> Generator[Panel]:
        """Yield panel or nested panels.

        :raises NotImplementedError: must be implemented by subclasses
        """
        raise NotImplementedError("Not implemented by subclass")

    def serialize(self, **kwargs) -> dict[str, Any]:
        """Return navigation data."""
        return {
            "name": self.name,
            "type": self.type,
            "icon": self.icon,
            "title": self.title,
            "order": self.order,
            "permission": self.permission,
            **kwargs,
        }


class Panel(BasePanel):
    """
    Describe a panel component and its navigation.
    """

    url: str = None
    """ Url name to app view. """
    component: str = ""
    """ Vue component. """
    template = "ox/core/components/model_panel.html"
    """ Django template file used to render the panel """
    actions_template = "ox/core/components/model_actions.html"
    """ Django template file used to render the panel's actions. """

    type = "item"

    def __init__(self, name, title, icon="", component="", **kwargs):
        super().__init__(name, title, icon, component=component, **kwargs)

    def get_panels(self):
        """For interface purpose, return iterator over self."""
        yield self

    def serialize(self, **kwargs):
        return super().serialize(**{"url": self.url and reverse(self.url), **kwargs})


class PanelsMixin:
    ResetItems: TypeAlias = Iterable[BasePanel] | dict[str, BasePanel]
    """ Items provided to :py:meth:`reset_items` or ``__init__``. """

    items: dict[str, BasePanel] = None
    """ Groups' nested items. """

    def reset_items(self, items: ResetItems | None = None) -> dict[str, BasePanel]:
        """Reset items.

        :param items: can be a list or a dict
        :return self's items.
        """
        if items and not isinstance(items, dict):
            items = {item.name: item for item in items}
        self.items = items or {}
        return self.items

    def append(self, item: BasePanel) -> BasePanel:
        """Add new item to group.

        :param item: item
        :param path: dot separated path to parent group
        :return: the appended item
        """
        self.items[item.name] = item
        return item

    def get_panels(self) -> Generator[Panel]:
        """Yield over all nested items using DFS order."""
        for item in self.items.values():
            yield from item.get_panels()

    def serialize_items(self) -> list[dict[str, Any]]:
        items = [item.serialize() for item in self.items.values()]
        items.sort(key=lambda v: (v["order"], v["title"] or v["name"]))
        return items

    def __getitem__(self, key):
        return self.items[key]

    def __setitem__(self, key, value):
        self.items[key] = value


class Panels(PanelsMixin, BasePanel):
    """Regroup multiple panels, usually of an application.

    This also can be used in a more UX sense of the term, such as
    "Settings" would regroup different nested application Panels.
    """

    type = "group"

    def __init__(self, name, title, items: PanelsMixin.ResetItems | None = None, **kwargs):
        self.reset_items(items)
        super().__init__(name, title, **kwargs)

    def serialize(self, **kwargs):
        if "items" not in kwargs:
            kwargs["items"] = self.serialize_items()
        return super().serialize(**kwargs)


class Registry(PanelsMixin):
    """Register all applications' panels.

    The following registry methods reset the cached property :py:meth:`nav_data`:
    :py:meth:`append`, :py:meth:`__getitem__`, :py:meth:`__setitem__`. Those are
    the public methods used to update the registry, whilst ``nav_data`` is used
    to provide navigation data to the user and is cached for performance.
    """

    def __init__(self, items: PanelsMixin.ResetItems | None = None):
        self.reset_items(items)

    # Note: this exposes all application to users.
    @cached_property
    def nav_data(self) -> list[dict[str, Any]]:
        """Menu data as provided to frontend application."""
        return self.serialize_items()

    def append(self, item):
        item = super().append(item)
        if "nav_data" in self.__dict__:
            delattr(self, "nav_data")
        return item

    def __getitem__(self, key) -> BasePanel:
        # assume that whenever a child is accessed, this is for update.
        # we ensure cached `nav_data` is cleared.
        #
        if "nav_data" in self.__dict__:
            delattr(self, "nav_data")
        return super().__getitem__(key)

    def __setitem__(self, key, value: BasePanel):
        if "nav_data" in self.__dict__:
            delattr(self, "nav_data")
        return super().__setitem__(key, value)


registry = Registry()
""" Registry of all applications' panels. """


# ---- Panels registration
registry.append(Panels("settings", _("Settings"), order=100, items=[Panels("system", _("System"), order=100)]))
