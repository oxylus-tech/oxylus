from email.utils import parseaddr

from django.core.exceptions import ValidationError
from django.core.validators import validate_email
from django.db import models
from django.utils.translation import gettext_lazy as _

from ox.content.models import TemplatePack, Content


__all__ = (
    "MailTemplatePack",
    "Mail",
    "validate_email_list",
)


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


class MailTemplatePack(TemplatePack):
    source_dir = "mails"

    class Meta:
        verbose_name = _("Mail Template")
        verbose_name_plural = _("Mail Templates")


class Mail(Content):
    template_pack = models.ForeignKey(MailTemplatePack, models.SET_NULL, null=True, blank=True)
    subject = models.CharField(_("Subject"), max_length=128, default="")
    to = models.CharField(_("To"), max_length=256, validators=[validate_email_list])
    cc = models.CharField(_("CC"), max_length=256, validators=[validate_email_list])
    bcc = models.CharField(_("BCC"), max_length=256, validators=[validate_email_list])

    class Meta:
        verbose_name = _("Mail")
        verbose_name_plural = _("Mails")
