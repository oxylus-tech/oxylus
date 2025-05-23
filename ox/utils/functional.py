from __future__ import annotations
from copy import copy


__all__ = ("Owned",)


class Owned:
    """Class designed to be owned by a parent one, referencing it.

    The ``_owner`` attribute is set **after** instanciation, using
    :py:meth:`contribute`. This method ensure to create a shallow
    copy of self that can be referenced by owner class.
    """

    def contribute(self, owner):
        """Copy self, assign owner and return."""
        self = copy(self)
        self._owner = owner
        return self
