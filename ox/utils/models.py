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


class Named(models.Model):
    """Provide mandatory name field."""

    name = models.CharField(_("Name"), max_length=64)

    class Meta:
        abstract = True

    def __str__(self):
        return f"{self.name}"


class Described(Named):
    """Provide name (mandatory) and description field."""

    description = models.CharField(_("Description"), max_length=256, blank=True, default="")

    class Meta:
        abstract = True


class Colored(Described):
    """Provide name (mandatory), description and color field."""

    color = ColorField(_("Color"), null=True, blank=True)

    class Meta:
        abstract = True
