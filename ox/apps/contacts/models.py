from django.db import models
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.models import User, Group

from stdenum import vat


from ox.core.models import Model, InheritanceQuerySet
from ox.utils.models import Colored


class Country(models.Model):
    iso = models.CharField(_("Code"), max_length=2, db_index=True)
    iso_3 = models.CharField(_("Code 3"), max_length=3, db_index=True)
    name = models.CharField(_("Name"), max_length=64)
    phone = models.PositiveIntegerField(_("Phone prefix"), max_length=4)

    @property
    def flag(self) -> str:
        """Return UTF-8 code for this country."""
        return "".join(chr(0x1F1E6 + ord(c.upper()) - ord("A")) for c in self.iso)

    def validate_vat(self, value: str) -> bool:
        """Return wether provided value is a valid vat."""
        return vat.is_valid(value)

    class Meta:
        verbose_name = _("Country")
        verbose_name_plural = _("Countries")


class ContactQuerySet(InheritanceQuerySet):
    def with_infos(self):
        return self.prefetch_related("address_set", "phone_set", "email_set")


class Contact(Model):
    objects = ContactQuerySet.as_manager()

    class Meta:
        verbose_name = _("Contact")
        verbose_name_plural = _("Contacts")


class Organisation(Colored, Contact):
    group = models.ForeignKey(Group, models.SET_NULL, null=True, blank=True)
    # parent = models.ForeignKey("self", models.CASCADE, null=True, blank=True)

    company_form = models.CharField(_("Company Form"), max_length=64)
    number = models.CharField(_("Number"), max_length=32, default="", blank=True)
    vat = models.CharField(_("VAT"), max_length=32, default="", blank=True)
    country = models.ForeignKey(Country, models.CASCADE, null=True, blank=True)

    class Meta:
        verbose_name = _("Organisation")
        verbose_name_plural = _("Organisations")


class Person(Contact):
    user = models.ForeignKey(User, models.CASCADE, null=True, blank=True)
    first_name = models.CharField(_("First name"), default="", max_length=64)
    last_name = models.CharField(_("Last name"), default="", max_length=64)
    organisations = models.ManyToManyField(Organisation, null=True, blank=True)

    class Meta:
        verbose_name = _("Person")
        verbose_name_plural = _("Persons")

    @property
    def get_full_name(self):
        return f"{self.last_name} {self.first_name}"

    def __str__(self):
        return self.get_full_name()


class ContactInfo(Model):
    class Kind(models.IntegerChoices):
        MAIN = 0x00, _("Main")
        PROFESSIONAL = 0x01, _("Professional")
        HOME = 0x02, _("Home")
        LEGAL = 0x03, _("Legal")
        OTHER = 0x10, _("Other")

    contact = models.ForeignKey(Contact, models.CASCADE)
    kind = models.SmallIntegerField(_("Kind"), default=Kind.MAIN, choices=Kind.choices)

    class Meta:
        abstract = True


class Address(ContactInfo):
    street = models.CharField(_("Street"), max_length=128)
    street_2 = models.CharField(_("Street 2"), max_length=128, default="", blank=True)
    number = models.CharField(_("Number"), max_length=16)
    box = models.CharField(_("Box"), max_length=16, default="", blank=True)
    postcode = models.PositiveIntegerField(_("Postcode"))
    city = models.CharField(_("City"), max_length=128)
    country = models.CharField(_("Country"), max_length=32)

    class Meta:
        verbose_name = _("Address")
        verbose_name_plural = _("Addresses")


class Phone(ContactInfo):
    number = models.CharField(_("Phone"), max_length=32)

    class Meta:
        verbose_name = _("Phone")
        verbose_name_plural = _("Phones")


class Email(ContactInfo):
    email = models.EmailField(_("Email"))

    class Meta:
        verbose_name = _("Email")
        verbose_name_plural = _("Emails")
