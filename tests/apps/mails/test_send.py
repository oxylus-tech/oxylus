from email.message import EmailMessage

import pytest
from django.template import Template

from ox.apps.mails.models import MailAccount
from ox.apps.mails.send import MailSend


@pytest.fixture
def mail_send(send_mail):
    return MailSend(send_mail)


class TestMailSend:
    def test___init__(self, mail_send):
        assert mail_send.account == mail_send.mail.account

    def test_templates(self, mail_send):
        assert all(isinstance(v, Template) for v in mail_send.templates.values())
        assert "subject" in mail_send.templates
        assert "content" in mail_send.templates

    def test_send_with_tls(self, mocker, mail_account, mail_send, contact_1, contact_2):
        mail_send.account.encryption = MailAccount.Encryption.TLS

        with mocker.patch("smtplib.SMTP") as mock_smtp:
            smtp_instance = mock_smtp.return_value.__enter__.return_value

            mail_send.send({"bar": "tee"})

            mock_smtp.assert_called_with(mail_account.smtp_host, mail_account.smtp_port)
            smtp_instance.starttls.assert_called_once()
            smtp_instance.login.assert_called_once_with(mail_account.smtp_username, mail_account.smtp_password)

            smtp_instance.send_message.assert_called()

        # contact
        for i, contact in enumerate(mail_send.mail.contacts.all()):
            msg = smtp_instance.send_message.call_args_list[i][0][0]
            assert msg["From"] == mail_account.smtp_username
            assert msg["To"] == contact.email
            assert msg["Subject"] == f"Welcome {contact.full_name}!"
            assert f"Welcome {contact.first_name}! bar?" in msg.get_body(preferencelist=["html"]).get_content()

    def test_add_attachments(self, mocker, mail_send, files):
        msg = EmailMessage()
        mail_send.add_attachments(msg, files)

        for file, attachment in zip(files, msg.iter_attachments()):
            assert file.name == attachment.get_filename()
            assert file.mime_type == attachment.get_content_type()

    def test_send_mails_with_contact_list(self):
        raise NotImplementedError("TBD")
