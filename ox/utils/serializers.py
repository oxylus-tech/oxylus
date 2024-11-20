"""Serialize and deserialize utilities."""
from typing import Any
from rest_framework import serializers


__all__ = ("SerializeMixin", "CacheSerializeMixin")


class SerializeMixin:
    """Provide serialization methods for classes that serialize objects.

    It use class provided by one of ``serializer_class`` and
    ``Serializer`` to instanciate serializer.
    """

    serializer_class: serializers.Serializer = None

    def serialize(self, value=None, **kwargs):
        """Serialize. If value is ``None``, use ``self`` as input value.

        :param any value: if provided serialize this value instead of self.
        :param **kwargs: init arguments passed down to serializer.
        :return serialized data.
        """
        if value is None:
            value = self
        serializer = self.get_serializer(value, **kwargs)
        return serializer.data

    def get_serializer(self, value, **kwargs):
        cls = self.get_serializer_class()
        return cls(value, **kwargs)

    def get_serializer_class(self):
        return self.serializer_class or getattr(self, "Serializer", None)


class CacheSerializeMixin(SerializeMixin):
    """Keep in cache the result of serialization until cache is reset."""

    serialize_cache: None | dict | list
    serialize_value: Any

    def reset_cache(self):
        delattr(self, "serialize_cache")
        delattr(self, "serialize_value")

    def serialize(self, value, **kwargs):
        if not hasattr(self, "serialize_cache") or getattr(self, "serialize_value", None) is not value:
            self.serialize_cache = super().serialize(value, **kwargs)
        return self.serialize_cache
