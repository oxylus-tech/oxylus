"""
This module provide fields and models that can be reused among all
applications.
"""

from django import forms
from django.db import models
from django.core.validators import RegexValidator
from django.utils.translation import gettext_lazy as _


__all__ = ("ColorField", "HexColorValidator", "Named", "Described", "Colored")


HexColorValidator = RegexValidator(
    regex=r"^#(?:[0-9a-fA-F]{3}){1,2}$", message=_("Enter a valid hex color code (e.g. #FFF or #FFFFFF).")
)


class ColorField(models.CharField):
    """CharField taking a color as input."""

    default_validators = [HexColorValidator]

    def __init__(self, *args, **kwargs):
        kwargs.setdefault("max_length", 7)
        super().__init__(*args, **kwargs)

    def formfield(self, **kwargs):
        defaults = {
            "form_class": forms.CharField,
            "widget": forms.TextInput(attrs={"type": "color"}),
            "validators": self.default_validators,
        }
        defaults.update(kwargs)
        return super().formfield(**defaults)


class Colored(models.Model):
    """Provide color field."""

    color = ColorField(_("Color"), null=True, blank=True)

    class Meta:
        abstract = True


class Named(models.Model):
    """Provide mandatory name field."""

    name = models.CharField(_("Name"), max_length=64)

    class Meta:
        abstract = True

    def __str__(self):
        return f"{self.name}"


class Described(Named):
    """Provide name (mandatory) and description field."""

    description = models.CharField(_("Description"), max_length=256, blank=True, null=True, default="")

    class Meta:
        abstract = True


class Authored(models.Model):
    """Provide `author` field, which specifies an author."""

    author = models.CharField(_("Author"), max_length=128)

    class Meta:
        abstract = True


class Versioned(models.Model):
    """Provide `version` field, which specifies a version."""

    version = models.CharField(_("Version"), max_length=32, default="0.0.1")

    class Meta:
        abstract = True


class Created(models.Model):
    """Provide `updated` field, which specifies the last model update datetime."""

    created = models.DateTimeField(_("Created"), auto_now_add=True)

    class Meta:
        abstract = True


class Updated(models.Model):
    """Provide `updated` field, which specifies the last model update datetime."""

    updated = models.DateTimeField(_("Updated"), auto_now=True)

    class Meta:
        abstract = True


class PackageInfo(Updated, Versioned, Authored, Described):
    source = models.URLField(_("Source Code URL"))
    homepage = models.URLField(_("Homepage"))

    class Meta:
        abstract = True


class SaveHookQuerySet(models.QuerySet):
    """
    This is the QuerySet used for :py:class:`SaveHook` model
    and sub-models.
    """

    def bulk_create(self, objs, *a, **kw):
        if issubclass(self.model, SaveHook):
            objs = self._save_hook_iter(objs)
        return super().bulk_create(objs, *a, **kw)

    async def abulk_create(self, objs, *a, **kw):
        if issubclass(self.model, SaveHook):
            objs = self._save_hook_iter(objs)
        return await super().abulk_create(objs, *a, **kw)

    def bulk_update(self, objs, fields, *a, **kw):
        if issubclass(self.model, SaveHook):
            objs = self._save_hook_iter(objs, fields)
        return super().bulk_update(objs, fields, *a, **kw)

    async def abulk_update(self, objs, fields, *a, **kw):
        if issubclass(self.model, SaveHook):
            objs = self._save_hook_iter(objs, fields)
        return await super().abulk_update(objs, fields, *a, **kw)

    def _save_hook_iter(self, objs, fields: list[str] | None = None):
        for obj in objs:
            obj.on_save(fields)
            yield obj


class SaveHook(models.Model):
    """
    Provide `on_save` hook called when model is saved.
    This is handled on bulk methods too.

    Note that this sync method is also called from async contexts.

    When using this class, if you need to have custom queryset,
    you'll have to subclass it from :py:class:`SaveHookQuerySet`.
    """

    objects = SaveHookQuerySet.as_manager()

    class Meta:
        abstract = True

    def on_save(self, fields: list[str] | None = None):
        """Hook called when model is saved."""
        pass

    def save(self, *args, **kwargs):
        self.on_save(kwargs.get("updated_fields"))
        super().save(*args, **kwargs)

    async def asave(self, *args, **kwargs):
        self.on_save(kwargs.get("updated_fields"))
        await super().asave(*args, **kwargs)
