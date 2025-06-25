import pytest
from django.conf import settings

from ox.apps.contacts.models import Person
from ox.apps.mails.models import MailAccount, SendMail
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
def contact_1(transactional_db):
    return Person.objects.create(first_name="France", last_name="Degale", email="france@degale.be")


@pytest.fixture
def contact_2(transactional_db):
    return Person.objects.create(first_name="Philippe", last_name="Pinpon", email="philippe@pinpon.fr")


@pytest.fixture
def send_mail(agent, mail_account, contact_1, contact_2):
    obj = SendMail.objects.create(
        owner=agent,
        account=mail_account,
        subject="Welcome {{ contact.full_name }}!",
        content="Welcome {{ contact.first_name }}! {{ foo }}?",
        context={"foo": "bar"},
    )
    obj.contacts.set([contact_1, contact_2])
    return obj


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
def with_attachments(send_mail, owner, files):
    send_mail.attachments.set(files)
    return send_mail
