from email.message import EmailMessage
from functools import cached_property
import logging
import re
import smtplib
from typing import Any, Iterable

from django.template import Template, Context
from django.utils.html import strip_tags

from ox.apps.files.models import File
from .models import BaseMail, MailAccount


logger = logging.getLogger()


class MailSend:
    """
    This class handles sending an email from a model subclassing :py:class:`~.models.BaseMail`.
    """

    mail: BaseMail
    """ Outgoing mail """
    account: MailAccount
    """ Email account used to send the message. Defaults to mail's one. """

    def __init__(self, mail: BaseMail, account: MailAccount | None = None):
        self.mail = mail
        self.account = account or mail.account

    @cached_property
    def templates(self) -> dict[str, Template]:
        """Dict of templates instance for each renderable part of the message.

        The keys will be: ``subject``, ``header``, ``content``, ``signature``, ``footer``.
        """
        subscription = self.account.mail_subscription_footer
        if subscription:
            subscription = f"{{% if is_subscription %}}{subscription}{{% endif %}}"

        return {
            "subject": Template(self.mail.get_subject()),
            "content": Template(
                "<br><br>".join(
                    v
                    for v in (
                        self.mail.get_content(),
                        self.account.mail_signature,
                        subscription,
                    )
                    if v
                )
            ),
        }

    def send(self, context: dict[str, Any] = {}):
        """
        Send the mail to all mail's recipients (:py:meth:`.models.BaseMail.get_recipients`) through SMTP.

        Update the mail state once sent.

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

            self.mail.state = BaseMail.State.SENDING
            self.mail.save(update_fields=["state"])

            logger.info(f"Start send mail with id {self.mail.id}")
            for recipient, extra_context in self.mail.get_recipients():
                self.send_mail(smtp, recipient, {**context, **extra_context})

            self.mail.state = BaseMail.State.SENT
            self.mail.save(update_fields=["state"])

    def send_mail(self, smtp: smtplib.SMTP, recipient: str, context: dict[str, Any]):
        """Send mail to provided recipient.

        :param smtp: logged in smtp instance.
        :param recipient: target email.
        :param context: extra context data.
        """
        context = self.mail.get_context(recipient=recipient, **context)
        message = self.get_message(recipient, context)
        logger.info(f"Send mail {self.mail.id} to {recipient}")
        smtp.send_message(message)

    def get_message(self, recipient: str, context: Context) -> EmailMessage:
        """Return EmailMessage to send to provided recipient with rendered content and subject.

        :param contact: target contact
        :param context: extra context
        """
        content = self.get_content(context)
        content_text = self._strip_re_1.sub(" ", strip_tags(content))
        content_text = self._strip_re_2.sub("\n", content_text).strip()

        msg = EmailMessage()
        msg["To"] = recipient
        msg["From"] = self.account.smtp_username
        msg["Subject"] = self.templates["subject"].render(context)
        msg.set_content(content_text)
        msg.add_alternative(content, subtype="html")

        self.add_attachments(msg, self.mail.attachments.all())
        return msg

    def get_content(self, context: Context) -> str:
        """Render content to HTML and return."""
        return self.templates["content"].render(context)

    _strip_re_1 = re.compile("[ \t]+")
    _strip_re_2 = re.compile("\n ")

    def add_attachments(self, message: EmailMessage, files: Iterable[File]):
        """Add attachments to mail."""
        for file in files:
            self.add_attachment(message, file)

    def add_attachment(self, message: EmailMessage, file: File):
        """Add attachments to mail."""
        with file.file.open() as f:
            file_data = f.read()

        mime = file.mime_type.split("/")
        message.add_attachment(file_data, maintype=mime[0], subtype=mime[1], filename=file.name)
