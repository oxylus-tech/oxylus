from django.db import models
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.models import User, Group

from ox.core.models import Model, InheritanceQuerySet


class ContactQuerySet(InheritanceQuerySet):
    def with_infos(self):
        return self.prefetch_related("address_set", "phone_set", "email_set")


class Contact(Model):
    # TODO: picture
    name = models.CharField(_("Name"), max_length=64)

    objects = ContactQuerySet.as_manager()

    class Meta:
        verbose_name = _("Contact")
        verbose_name_plural = _("Contacts")


class Organisation(Contact):
    group = models.ForeignKey(Group, models.SET_NULL, null=True, blank=True)
    parent = models.ForeignKey("self", models.CASCADE, null=True, blank=True)

    kind = models.CharField(_("Type"), max_length=64)
    number = models.CharField(_("Number"), max_length=32, default="", blank=True)
    vat = models.CharField(_("VAT"), max_length=32, default="", blank=True)
    country = models.CharField(_("Country"), max_length=32)

    class Meta:
        verbose_name = _("Organisation")
        verbose_name_plural = _("Organisations")


class Person(Contact):
    user = models.ForeignKey(User, models.CASCADE, null=True, blank=True)
    first_name = models.CharField(_("First name"), max_length=64)
    last_name = models.CharField(_("Last name"), max_length=64)
    organisations = models.Many2Many(Organisation, null=True, blank=True)

    class Meta:
        verbose_name = _("Person")
        verbose_name_plural = _("Persons")


class Kind(models.IntegerChoices):
    MAIN = 0x00, _("Main")
    PROFESSIONAL = 0x01, _("Professional")
    HOME = 0x02, _("Home")
    LEGAL = 0x03, _("Legal")


class ContactInfo(Model):
    contact = models.ForeignKey(Contact, models.CASCADE)
    kind = models.SmallIntegerField(_("Kind"), choices=Kind.choices)
    note = models.CharField(_("Note"), max_length=128, default="", blank=True)

    class Meta:
        abstract = True


class Address(ContactInfo):
    street = models.CharField(_("Street"), max_length=128)
    street_2 = models.CharField(_("Street 2"), max_length=128)
    number = models.IntegerField(_("Number"))
    box = models.IntegerField(_("Box"), null=True, blank=True)
    postcode = models.IntegerField(_("Postcode"))
    city = models.CharField(_("City"), max_length=128)
    country = models.CharField(_("Country"), max_length=32)

    class Meta:
        verbose_name = _("Address")
        verbose_name_plural = _("Addresses")


class Email(ContactInfo):
    email = models.EmailField(_("Email"))

    class Meta:
        verbose_name = _("Email")
        verbose_name_plural = _("Emails")


class Phone(ContactInfo):
    contact = models.ForeignKey(Contact, models.CASCADE)
    phone = models.CharField(_("Phone"), max_length=32)
