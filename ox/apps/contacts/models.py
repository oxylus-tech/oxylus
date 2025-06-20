from django.db import models
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.models import User

from ox.core.models import Model, InheritanceQuerySet
from ox.apps.locations.models import Country
from ox.utils.models import Named, Described, Colored


__all__ = (
    "Contact",
    "ContactQuerySet",
    "Person",
    "Organisation",
    "OrganisationType",
    "Email",
    "Phone",
    "Address",
    "BankAccount",
)


class ContactQuerySet(InheritanceQuerySet):
    def with_infos(self):
        return self.prefetch_related("address_set", "phone_set", "email_set")


class Contact(Model):
    objects = ContactQuerySet.as_manager()

    class Meta:
        verbose_name = _("Contact")
        verbose_name_plural = _("Contacts")


class OrganisationType(Named, Model):
    """Represent a kind of Organisation."""

    country = models.ForeignKey(Country, models.CASCADE, verbose_name=_("Country"))
    code = models.CharField(_("Code"), max_length=8, blank=True, default="")
    abbreviation = models.CharField(_("Abbreviation"), max_length=32, blank=True, default="")
    language_code = models.CharField(_("Language Code"), max_length=4, blank=True, default="")

    class Meta:
        verbose_name = _("Company Form")
        verbose_name_plural = _("Company Forms")


class Organisation(Described, Colored, Contact):
    # group = models.OneToOneField(Group, models.SET_NULL, null=True, blank=True)
    short_name = models.CharField(_("Short Name"), max_length=32, null=True, blank=True)
    reference = models.CharField(_("Reference Number"), max_length=32, default="", blank=True)
    vat = models.CharField(_("VAT"), max_length=32, blank=True, null=True)
    type = models.ForeignKey(
        OrganisationType, models.SET_NULL, null=True, blank=True, verbose_name=_("Organisation Type")
    )
    country = models.ForeignKey(Country, models.SET_NULL, null=True, blank=True, verbose_name=_("Country"))

    class Meta:
        verbose_name = _("Organisation")
        verbose_name_plural = _("Organisations")


class Person(Contact):
    user = models.OneToOneField(
        User,
        models.CASCADE,
        null=True,
        blank=True,
        related_name="contact",
        verbose_name=_("User"),
        help_text=_("This contact is related to a user of the plateform"),
    )
    first_name = models.CharField(_("First name"), default="", max_length=64)
    last_name = models.CharField(_("Last name"), default="", max_length=64)
    email = models.EmailField(_("Email"), unique=True, blank=True, null=True)
    """ When linked to user, this is User's email. """
    organisations = models.ManyToManyField(Organisation, blank=True, verbose_name=_("Organisations"))

    class Meta:
        verbose_name = _("Person")
        verbose_name_plural = _("Persons")

    @property
    def full_name(self):
        return f"{self.last_name} {self.first_name}"

    def __str__(self):
        return self.full_name


# TODO: rename
class Kind(models.IntegerChoices):
    MAIN = 0x00, _("Main")
    PROFESSIONAL = 0x01, _("Professional")
    HOME = 0x02, _("Home")
    LEGAL = 0x03, _("Legal")
    OTHER = 0x10, _("Other")


class ContactInfo(Model):
    contact = models.ForeignKey(Contact, models.CASCADE, verbose_name=_("Contact"))
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
    country = models.ForeignKey(Country, models.CASCADE, null=True, blank=True)

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
        default_related_name = "email_set"


class BankAccount(ContactInfo, Named):
    iban = models.CharField(_("IBAN"), max_length=40)
    bic = models.CharField(_("SWIFT/BIC"), max_length=11)
    address = models.CharField(_("Address"), max_length=128)
    bank_name = models.CharField(_("Bank Name"), max_length=128)

    class Meta:
        verbose_name = _("IBAN Account")
        verbose_name_plural = _("IBAN Accounts")
