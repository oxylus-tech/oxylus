import pytest

from ox.apps.mails import serializers
from ox.apps.mails.models import MailAccount


@pytest.fixture
def mail_account_ser():
    return serializers.MailAccountSerializer()


ser_data = {
    "name": "Name",
    "smtp_host": "mail.oxylus.app",
    "smtp_port": 587,
    "smtp_username": "test@oxylus.app",
    "smtp_encryption": MailAccount.Encryption.SSL,
}


class TestMailAccountSerializer:
    def test_validate_delete_smtp_password(self, mail_account_ser):
        dat = mail_account_ser.validate({**ser_data, "smtp_password": None})
        assert "smtp_password" not in dat
        dat = mail_account_ser.validate({**ser_data, "smtp_password": "fake"})
        assert "smtp_password" in dat

    def test_validate_delete_imap_password(self, mail_account_ser):
        dat = mail_account_ser.validate({**ser_data, "imap_password": None})
        assert "imap_password" not in dat
        dat = mail_account_ser.validate({**ser_data, "imap_password": "fake"})
        assert "imap_password" in dat
