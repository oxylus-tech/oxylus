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
from ox.apps.files.models import File


__all__ = ("MailAccount", "BaseMail", "Mail", "validate_email_list")


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

    mail_header = RichTextField(
        _("Mail Header"),
        help_text=_("Emails' header at the top of all mails"),
        blank=True,
        null=True,
    )
    mail_signature = RichTextField(
        _("Signature"), help_text=_("Email signature appent to all mails' content"), blank=True, null=True
    )
    mail_subscription_footer = RichTextField(
        _("Subscription Footer"),
        help_text=_("Footer appent below mails send to contacts of subscription contact lists."),
        blank=True,
        null=True,
    )

    # SMTP Configuration
    smtp_host = models.CharField(_("Host (SMTP)"), max_length=255)
    smtp_port = models.PositiveIntegerField(_("Port (SMTP)"), default=587)
    smtp_username = EncryptedCharField(_("Username (SMTP)"), max_length=255)
    smtp_password = EncryptedCharField(_("Password (SMTP)"), max_length=128)
    smtp_encryption = models.PositiveSmallIntegerField(
        _("Encryption (SMTP)"), choices=Encryption, default=Encryption.SSL
    )

    # IMAP Configuration (optional)
    # imap_host = models.CharField(_("Host (IMAP)"), max_length=255, blank=True, null=True)
    # imap_port = models.PositiveIntegerField(_("Port (IMAP)"), blank=True, null=True)
    # imap_username = EncryptedCharField(_("Username (IMAP)"), max_length=255, blank=True, null=True)
    # imap_password = EncryptedCharField(_("Password (IMAP)"), max_length=128, blank=True, null=True)
    # imap_ssl = models.BooleanField(_("Use SSL (IMAP)"), default=True, null=True, blank=True)
    # imap_folder = models.CharField(_("Folder (IMAP)"), max_length=255, default="INBOX")

    class Meta:
        verbose_name = _("Email Account")
        verbose_name_plural = _("Email Accounts")


class BaseMail(Timestamped, ChildOwned):
    """
    Base class for outgoing emails. Later is it planned for incoming too.

    This is an abstract model as it shall be subclassed.
    """

    class State(models.IntegerChoices):
        DRAFT = 0x00, _("Draft")
        SENDING = 0x01, _("Sending")
        SENT = 0x02, _("Sent")
        ERROR = 0x03, _("Error")

    account = models.ForeignKey(MailAccount, models.CASCADE, verbose_name=_("Account"))
    state = models.PositiveSmallIntegerField(_("State"), choices=State.choices, default=State.DRAFT)

    context = models.JSONField(_("Context"), default=dict)
    subject = models.TextField(_("Subject"), default="", help_text=_("When provided, overrides template's content"))
    content = RichTextField(_("Message"), default="", help_text=_("When provided, overrides template's content."))
    attachments = models.ManyToManyField(File, related_name="+", verbose_name=_("Attach files"))

    # From ChildOwned
    parent_attr = "account"

    class Meta:
        abstract = True
        verbose_name = _("Mail")
        verbose_name_plural = _("Mails")

    # TODO: validate owner from template

    def get_recipients(self) -> list[tuple[str, Context]]:
        """Return the recipients of the mail."""
        raise NotImplementedError("This method must be implemented by subclass.")

    def get_content(self):
        """Return raw content."""
        return self.content

    def get_subject(self):
        """Return raw subject."""
        return self.subject

    def get_context(self, **context) -> Context:
        """Return mail context."""
        return Context({**self.context, **context})


class Mail(BaseMail):
    """A simple mail sending to a list of recipients as string."""

    recipients = models.CharField(
        _("Recipients"),
        max_length=512,
        validators=[validate_email_list],
        help_text=_("A list of recipients, separated by a comma."),
    )
    """ Recipients, as a list of email strings. """

    # Ensure to be detected by vue-i18n util
    State = BaseMail.State

    class Meta:
        verbose_name = _("Mail")
        verbose_name_plural = _("Mails")

    def get_recipients(self):
        emails = [e.strip() for e in self.recipients.split(",") if e.strip()]
        recipients = []
        for raw in emails:
            name, email = parseaddr(raw)
            recipients.append((email, {"name": name or email.split("@")[0]}))
        return recipients
