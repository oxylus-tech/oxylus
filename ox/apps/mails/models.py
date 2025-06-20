from email.utils import parseaddr

from django.core.exceptions import ValidationError
from django.core.validators import validate_email
from django.db import models
from django.template import Context
from django.utils.translation import gettext_lazy as _

from encrypted_fields.fields import EncryptedCharField

from caps.models import Owned
from ox.utils.models import Named, Timestamped, ChildOwned
from ox.apps.content.models import RichTextField
from ox.apps.contacts.models import Person


__all__ = ("MailAccount", "MailTemplate", "SendMail", "validate_email_list")


def validate_email_list(value):
    if value:
        emails = [e.strip() for e in value.split(",") if e.strip()]
        for raw in emails:
            name, email = parseaddr(raw)
            if not email:
                raise ValidationError(_(f"Invalid email format: '{raw}'"))
            try:
                validate_email(email)
            except ValidationError:
                raise ValidationError(_(f"Invalid email address: '{email}'"))


class MailAccount(Named, Owned):
    """Configure an email account used to send mails."""

    class Encryption(models.IntegerChoices):
        NONE = 0x00, _("NONE")
        TLS = 0x01, "TLS"
        SSL = 0x02, "SSL"

    # SMTP Configuration
    smtp_host = models.CharField(_("Host (SMTP)"), max_length=255)
    smtp_port = models.PositiveIntegerField(_("Port (SMTP)"), default=587)
    smtp_username = EncryptedCharField(_("Username (SMTP)"), max_length=255)
    smtp_password = EncryptedCharField(_("Password (SMTP)"), max_length=128)
    smtp_encryption = models.PositiveSmallIntegerField(
        _("Encryption (SMTP)"), choices=Encryption, default=Encryption.SSL
    )

    # IMAP Configuration (optional)
    imap_host = models.CharField(_("Host (IMAP)"), max_length=255, blank=True, null=True)
    imap_port = models.PositiveIntegerField(_("Port (IMAP)"), blank=True, null=True)
    imap_username = EncryptedCharField(_("Username (IMAP)"), max_length=255, blank=True, null=True)
    imap_password = EncryptedCharField(_("Password (IMAP)"), max_length=128, blank=True, null=True)
    imap_ssl = models.BooleanField(_("Use SSL (IMAP)"), default=True, null=True, blank=True)
    imap_folder = models.CharField(_("Folder (IMAP)"), max_length=255, default="INBOX")

    class Meta:
        verbose_name = _("Email Account")
        verbose_name_plural = _("Email Accounts")


class MailTemplate(Named, Timestamped, ChildOwned):
    """Email template."""

    account = models.ForeignKey(MailAccount, models.SET_NULL, null=True, blank=True, verbose_name=_("Account"))
    subject = models.CharField(_("Subject"), max_length=128)
    content = RichTextField(_("Content"))

    parent_attr = "account"

    class Meta:
        verbose_name = _("Email Template")
        verbose_name_plural = _("Email Templates")


class SendMail(Timestamped, ChildOwned):
    """Outgoing mail to a set of contacts"""

    class State(models.IntegerChoices):
        DRAFT = 0x00, _("Draft")
        SENDING = 0x01, _("Sending")
        SENT = 0x02, _("Sent")
        ERROR = 0x03, _("Error")

    template = models.ForeignKey(MailTemplate, models.SET_NULL, null=True, blank=True)
    contacts = models.ManyToManyField(Person, verbose_name=_("Recipients"))
    state = models.PositiveSmallIntegerField(_("State"), choices=State.choices, default=State.DRAFT)
    context = models.JSONField(_("Context"), default=dict)

    subject = models.TextField(_("Subject"), default="", help_text=_("When provided, overrides template's content"))
    content = RichTextField(_("Message"), default="", help_text=_("When provided, overrides template's content."))

    parent_attr = "template"

    class Meta:
        verbose_name = _("Mail")
        verbose_name_plural = _("Mails")

    def get_content(self):
        """Return raw content."""
        return self.content or self.template.content

    def get_subject(self):
        """Return raw subject."""
        return self.subject or self.template.subject

    def get_context(self, **context) -> Context:
        """Return mail context."""
        return Context({**self.context, **context})
