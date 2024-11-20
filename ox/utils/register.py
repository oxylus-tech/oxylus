from __future__ import annotations
from .serializers import CacheSerializeMixin


__all__ = ("Register",)


class Record:
    default_register: Register | None = None

    @classmethod
    def register(cls, *init_args, registry=None, **init_kwargs):
        """Create a new instance action and register it to provided registry
        (defaults to ``Capability.ACTIONS``).

        :return the instanciated class.
        """
        global actions
        if registry is None:
            registry = cls.default_register
        if registry is None:
            raise ValueError("No registry is provided")
        self = cls(*init_args, **init_kwargs)
        registry[self.label] = self
        return self


class Register(CacheSerializeMixin):
    """Registry of items indexed by a custom key.

    Items can be serialized.
    """

    key: str  # or callable
    _items: dict

    def __init__(self, key, items=None, serializer_class=None):
        self.key = key
        self._items = dict(items or tuple())
        if serializer_class:
            self.serializer_class = serializer_class

    def add(self, item, reset_cache=True):
        """Add one or more objects to registry."""
        key = self.get_key(item)
        self._items[key] = item
        reset_cache and self.reset_cache()

    def extend(self, items):
        for item in self._items:
            self.add(item, False)
        self.reset_cache()

    def remove_if(self, pred):
        self._items = {key: value for key, value in self._items.items() if not pred}

    def keep_if(self, pred):
        self._items = {key: value for key, value in self._items.items() if pred}

    def get_key(self, item):
        key = item.get(self.key) if isinstance(item, dict) else getattr(item, self.key, None)
        if key is None:
            raise KeyError(f"Key `{self.key}` is None for item `{item}`.")
        if callable(key):
            key = key(item)
        return key

    def serialize(self, value=None, **kwargs):
        if value is None:
            value = self._items
        kwargs["many"] = True
        return super().serialize(value, **kwargs)

    def get(self, key, default=None):
        return self._items.get(key, default)

    def keys(self):
        return self._items.keys()

    def values(self):
        return self._items.values()

    def items(self):
        return self._items.items()

    def __iter__(self):
        return iter(self._items)

    def __getitem__(self, key):
        return self._items[key]

    def __setitem__(self, key, value):
        self.reset_cache()
        self._items[key] = value

    def __delitem__(self, key):
        del self._items[key]

    def __contains__(self, key):
        return key in self._items
