from typing import Any

from django.db import models
from django.utils.translation import gettext_lazy as _

import pycountry
import phonenumbers
from phonenumbers.phonenumberutil import country_code_for_region


__all__ = ("Country",)


class Country(models.Model):
    name = models.CharField(_("Name"), max_length=64)
    code = models.CharField(_("Code"), max_length=2, db_index=True)
    code_3 = models.CharField(_("Code 3"), max_length=3, db_index=True)
    phone = models.PositiveIntegerField(_("Phone prefix"), max_length=4)

    @property
    def flag(self) -> str:
        """Return UTF-8 code for this country."""
        return "".join(chr(0x1F1E6 + ord(c.upper()) - ord("A")) for c in self.code)

    class Meta:
        verbose_name = _("Country")
        verbose_name_plural = _("Countries")

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

    @staticmethod
    def validate_vat(cls, value: str) -> bool:
        """Return wether provided value is a valid vat."""
        from stdnum import vat

        return vat.is_valid(value)

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
