import pytest
from django.conf import settings

from ox.apps.mails.models import MailAccount, Mail
from ox.apps.files.models import File


@pytest.fixture
def mail_account(agent):
    return MailAccount.objects.create(
        owner=agent,
        smtp_host="test-example.com",
        smtp_username="test@test-example.com",
        smtp_password="password",
        smtp_encryption=MailAccount.Encryption.TLS,
        # TODO: imap when imap support comes
    )


@pytest.fixture
def recipients_list():
    return ["Thomas <thomas@foo.bar>", "Alice <alice@foo.bar>"]


@pytest.fixture
def recipients(recipients_list):
    return ", ".join(recipients_list)


@pytest.fixture
def mail(agent, mail_account, recipients):
    return Mail.objects.create(
        owner=agent,
        account=mail_account,
        recipients=recipients,
        subject="Welcome {{ recipient }}!",
        content="Welcome {{ recipient }}! {{ foo }}?",
        context={"foo": "bar"},
    )


@pytest.fixture
def files(agent, image_000, pdf_000):
    files = [
        File(owner=agent, name="image", mime_type="image/jpg"),
        File(owner=agent, name="pdf", mime_type="application/pdf"),
    ]
    files[0].file.name = str(image_000.relative_to(settings.MEDIA_ROOT))
    files[1].file.name = str(pdf_000.relative_to(settings.MEDIA_ROOT))
    return File.objects.bulk_create(files)


@pytest.fixture
def with_attachments(mail, owner, files):
    mail.attachments.set(files)
    return mail
