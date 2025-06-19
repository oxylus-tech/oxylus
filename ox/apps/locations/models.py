from datetime import date
from typing import Any
from django.db import models
from django.utils.translation import gettext_lazy as _

from ox.core.models import Model
from ox.utils.models import Named

import pycountry
import phonenumbers
from phonenumbers.phonenumberutil import country_code_for_region


__all__ = ("Country",)


class Continent(models.IntegerChoices):
    AFRICA = 0x01, _("Africa")
    ANTARCTICA = 0x02, _("Antartica")
    ASIA = 0x03, _("Asia")
    EUROPE = 0x04, _("Europe")
    NORTH_AMERICA = 0x05, _("North America")
    OCEANIA = 0x06, _("Oceania")
    SOUTH_AMERICA = 0x07, _("South America")


class Country(Model):
    """
    Gather information for a specific country.
    """

    name = models.CharField(_("Name"), max_length=128)
    code = models.CharField(_("Code"), max_length=2, db_index=True)
    code_3 = models.CharField(_("Code 3"), max_length=3, db_index=True)
    continent = models.PositiveSmallIntegerField(_("Continent"), choices=Continent)
    phone = models.PositiveIntegerField(_("Phone prefix"))

    # no money in Antarctica
    currency = models.ForeignKey(
        "ox_locations.currency", models.SET_NULL, blank=True, null=True, verbose_name=_("Currency")
    )

    iban_sample = models.CharField(_("Sample IBAN"), max_length=42, null=True, blank=True)
    iban_length = models.PositiveSmallIntegerField(_("IBAN length"), null=True, blank=True)

    @property
    def flag(self) -> str:
        """Return UTF-8 code for this country."""
        return "".join(chr(0x1F1E6 + ord(c.upper()) - ord("A")) for c in self.code)

    @property
    def currency_code(self) -> str:
        """Shorthand to currency.code."""
        return self.currency and self.currency.code or None

    class Meta:
        verbose_name = _("Country")
        verbose_name_plural = _("Countries")

    def __str__(self):
        return f"{self.flag} {self.name}"

    @classmethod
    def init_them_all(cls):
        """Initialize all countries, updating existing ones."""
        countries = cls.objects.all()
        kws = cls.get_them_all_kwargs()

        updated = []
        keys = None
        for country in countries:
            if kw := kws.pop(country.code, None):
                country.__dict__.update(kw)
                updated.append(country)
                if not keys:
                    keys = kw.keys()

        updated and cls.objects.bulk_update(updated, keys)
        if kws:
            cls.objects.bulk_create(Country(**kw) for kw in kws.values())

    @classmethod
    def get_them_all_kwargs(cls) -> list[dict[str, Any]]:
        """Return a list of init args for all countries"""
        return {
            country.alpha_2: {
                "code": country.alpha_2,
                "code_3": country.alpha_3,
                "name": country.name,
                "phone": country_code_for_region(country.alpha_2),
            }
            for country in pycountry.countries
        }

    def validate_vat(self, value: str, exc: bool = False) -> bool:
        """Return wether provided value is a valid vat."""
        from stdnum import get_cc_module

        mod = get_cc_module(self.code.lower(), "vat")
        return mod and mod.is_valid(value)

    def validate_phone(self, value: str, full_check: bool = False) -> bool:
        """Validate phone number.

        :param value: phone number to validate
        :param full_check: if True, validate against self's country.
        """
        if not phonenumbers.is_valid_number(value):
            return False
        if full_check:
            phone = phonenumbers.parse(value)
            return phone.country_code == self.code
        return True


class Currency(Named, Model):
    code = models.CharField(_("Code"), max_length=3)
    numeric = models.CharField(_("Numeric code"), max_length=3)

    # Some currencies don't have specification for decimal, eg. XDR
    # Most common case is 2 digits after the comma
    decimals = models.PositiveSmallIntegerField(_("Decimals"), default=2, blank=True, null=True)

    is_iso = models.BooleanField(_("Is ISO"))
    valid_to = models.DateField(_("Withdrawal Date"), null=True, blank=True)

    class Meta:
        verbose_name = _("Currency")
        verbose_name_plural = _("Currencies")

    @property
    def is_active(self):
        return not self.valid_to or self.valid_to >= date.today()
