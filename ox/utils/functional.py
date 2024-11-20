from __future__ import annotations
from copy import copy


__all__ = ("Owned", "ListOwner")


class Owned:
    """Class designed to be owned by a parent one, referencing it.

    The ``_owner`` attribute is set **after** instanciation.
    """

    def contribute(self, owner):
        """Copy self, assign owner and return."""
        self = copy(self)
        self._owner = owner
        return self


class ListOwner:
    """Owns a list of items, providing utilities to contribute."""

    items: list[Owned] = None

    def __init__(self, *args, items=None, **kwargs):
        super().__init__(*args, **kwargs)
        self.items = []
        if items:
            self.extend(items)

    def add(self, item: Owned):
        self.items.add(item.contribute(self))

    def extend(self, items: Owned):
        self.items.extend(item.contribute(self) for item in items)
