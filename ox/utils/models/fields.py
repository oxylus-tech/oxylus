import inspect
from functools import cached_property
from importlib import import_module
from typing import Type

from django.db import models
from django.core.exceptions import ValidationError
from django.utils.translation import gettext_lazy as _

from rest_framework import serializers


__all__ = ("ClassField", "ClassPath", "SerializerField")


class ClassPath:
    """
    This object represent a class stored in the database.

    The class is accessed through the :py:attr:`cls` property.
    """

    def __init__(self, path_or_cls):
        if inspect.isclass(path_or_cls):
            self.path = f"{path_or_cls.__module__}.{path_or_cls.__qualname__}"
        else:
            self.path = str(path_or_cls) if path_or_cls else None

    def __str__(self):
        return self.path or ""

    def __repr__(self):
        return f"<ClassPath: {self.path}>"

    @cached_property
    def cls(self) -> type | None:
        """Resolve and return the actual class object.

        :yield ImportError when import failed
        """
        if not self.path:
            return None
        try:
            module_path, class_name = self.path.rsplit(".", 1)
            module = import_module(module_path)
            return getattr(module, class_name)
        except (ImportError, AttributeError, ValueError):
            raise ImportError(f"Module or path not found for `{self.path}`.")

    def __eq__(self, other):
        if isinstance(other, ClassPath):
            # compare on class since path can be different
            return self.cls == other.cls
        if inspect.isclass(other):
            return self.cls == other
        return self.cls == ClassPath(other).cls

    def __get__(self, instance, owner):
        if instance is None:
            return self
        return instance.__dict__.get(self.name)

    def __set__(self, instance, value):
        if isinstance(value, ClassPath):
            # ensure value is copied
            instance.__dict__[self.name] = str(value)
        instance.__dict__[self.name] = ClassPath(value)

    def contribute_to_class(self, cls, name):
        self.name = name
        setattr(cls, name, self)


class ClassField(models.CharField):
    """
    Allows user to target a class using provided path.

    **Important note: this field should NEVER be editable by users.**

    The python object is :py:class:`ClassPath`, which provides a
    property :py:attr:`ClassPath.cls` used to get the targetted class.
    """

    description = _("Store and resolve a dotted path to a python class.")

    def __init__(self, *args, **kwargs):
        kwargs.setdefault("max_length", 255)
        super().__init__(*args, **kwargs)

    def from_db_value(self, value, *args):
        return ClassPath(value)

    def to_python(self, value):
        return value if isinstance(value, ClassPath) else ClassPath(value)

    def get_prep_value(self, value):
        if isinstance(value, ClassPath):
            return str(value)
        if isinstance(value, type):
            return f"{value.__module__}.{value.__qualname__}"
        return str(value)

    def contribute_to_class(self, cls, name, private_only=False):
        super().contribute_to_class(cls, name, private_only)
        descriptor = ClassPath(None)
        descriptor.contribute_to_class(cls, name)


class SerializerField(models.JSONField):
    """
    This field is a JSONField validated using Django Rest Framework
    serializer.

    Though serializers already do the work, this ensures that data stays
    correct when users uses django admin interface or forms.

    .. note::

        Validation is made at field clean, so whenever you actually want
        to validate data, you must call model's ``full_clean()`` (which
        is by Django forms).

    """

    serializer_class: Type[serializers.Serializer] = None
    """ Django Rest Framework serializer class. """
    many: bool = False

    def __init__(self, *args, serializer_class: Type[serializers.Serializer], many: bool = False, **kwargs):
        """
        :param *args: JSONField positional arguments;
        :param serializer_class: serializer class;
        :param many: whether expecting many values or none;
        :param **kwargs: JSONField named arguments;
        """

        if not issubclass(serializer_class, serializers.Serializer):
            raise TypeError("`serializer_class` must be a subclass of DRF serializer")

        self.serializer_class = serializer_class
        self.many = many
        super().__init__(*args, **kwargs)

    def clean(self, value, model_instance):
        value = super().clean(value, model_instance)

        serializer = self.serializer_class(data=value, many=self.many)
        if not serializer.is_valid():
            raise ValidationError(serializer.errors)
        return serializer.validated_data
