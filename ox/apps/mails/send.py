from email.message import EmailMessage
from functools import cached_property
import logging
import re
import smtplib
from typing import Any

from django.template import Template
from django.utils.html import strip_tags

from ox.apps.contacts.models import Person
from .models import OutMail, MailAccount


logger = logging.getLogger()


class SendMail:
    """Handle sending an :py:class:`~.models.OutMail`."""

    mail: OutMail
    """ Outgoing mail """
    account: MailAccount
    """ Email account used to send the message. Defaults to mail's one. """

    def __init__(self, mail: OutMail, account: MailAccount | None = None):
        self.mail = mail
        self.account = account or mail.template.account

    @cached_property
    def templates(self) -> dict[str, Template]:
        """Dict of templates instance for each renderable part of the message.

        The keys will be: ``subject``, ``header``, ``content``, ``signature``, ``footer``.
        """
        return {
            "subject": Template(self.mail.get_subject()),
            "content": Template(self.mail.get_content()),
        }

    def send(self, context: dict[str, Any]):
        """
        Send the mail to all contacts through SMTP.

        Update the mail status once sent.

        :param context: extra context to pass down to content's Template
        """
        if self.account.smtp_encryption == self.account.Encryption.SSL:
            cls = smtplib.SMTP_SSL
        else:
            cls = smtplib.SMTP

        with cls(self.account.smtp_host, self.account.smtp_port) as smtp:
            if self.account.smtp_encryption == self.account.Encryption.TLS:
                smtp.starttls()
            smtp.login(self.account.smtp_username, self.account.smtp_password)

            self.mail.status = OutMail.Status.SENDING
            self.mail.save(update_fields=["status"])

            logger.info(f"Start send mail with id {self.mail.id}")
            for contact in self.mail.contacts.all():
                self.send_mail(smtp, contact, context)

            self.mail.status = OutMail.Status.SENT
            self.mail.save(update_fields=["status"])

    def send_mail(self, smtp: smtplib.SMTP, contact: Person, context: dict[str, Any]):
        """Send mail to provided contact.

        :param smtp: logged in smtp instance.
        :param contact: target contact.
        :param context: extra context data.
        """
        message = self.get_message(contact, context)
        logger.info(f"Send mail {self.mail.id} to {contact.email}")
        smtp.send_message(message)

    def get_message(self, contact: Person, context: dict[str, Any]) -> EmailMessage:
        """Return EmailMessage to send to provided contact with rendered content and subject.

        :param contact: target contact
        :param context: extra context
        """
        context = self.mail.get_context(contact=contact, **context)
        content = self.templates["content"].render(context)
        content_text = self._strip_re_1.sub(" ", strip_tags(content))
        content_text = self._strip_re_2.sub("\n", content_text).strip()

        msg = EmailMessage()
        msg["To"] = contact.email
        msg["From"] = self.account.smtp_username
        msg["Subject"] = self.templates["subject"].render(context)
        msg.set_content(content_text)
        msg.add_alternative(content, subtype="html")
        return msg

    _strip_re_1 = re.compile("[ \t]+")
    _strip_re_2 = re.compile("\n ")
