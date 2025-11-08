from email.message import EmailMessage

import pytest
from django.template import Template

from ox.apps.mails.models import MailAccount
from ox.apps.mails.send import MailSend


@pytest.fixture
def mail_send(mail):
    return MailSend(mail)


class TestMailSend:
    def test___init__(self, mail_send):
        assert mail_send.account == mail_send.mail.account

    def test_templates(self, mail_send):
        assert all(isinstance(v, Template) for v in mail_send.templates.values())
        assert "subject" in mail_send.templates
        assert "content" in mail_send.templates

    def test_send_with_tls(self, mocker, mail_account, mail_send, recipient_list):
        mail_send.account.encryption = MailAccount.Encryption.TLS

        mock_smtp = mocker.patch("smtplib.SMTP")
        smtp_instance = mock_smtp.return_value.__enter__.return_value

        mail_send.send({"bar": "tee"})

        mock_smtp.assert_called_with(mail_account.smtp_host, mail_account.smtp_port)
        smtp_instance.starttls.assert_called_once()
        smtp_instance.login.assert_called_once_with(mail_account.smtp_username, mail_account.smtp_password)

        smtp_instance.send_message.assert_called()

        # contact
        for i, recipient in enumerate(recipient_list):
            msg = smtp_instance.send_message.call_args_list[i][0][0]
            assert msg["From"] == mail_account.smtp_username
            assert msg["To"] == recipient
            assert msg["Subject"] == f"Welcome {recipient}!"
            assert f"Welcome {recipient}! bar?" in msg.get_body(preferencelist=["html"]).get_content()

    def test_add_attachments(self, mocker, mail_send, files):
        msg = EmailMessage()
        mail_send.add_attachments(msg, files)

        for file, attachment in zip(files, msg.iter_attachments()):
            assert file.name == attachment.get_filename()
            assert file.mime_type == attachment.get_content_type()
