import pytest
from django_tasks.backends.database.models import DBTaskResult

from ox.apps.mails import views
from ox.apps.mails.models import Mail


@pytest.fixture
def mail_viewset(user, user_request, mail):
    # work around to pass user the permission change_sendmail
    user.is_superuser = True
    user.save(update_fields=["is_superuser"])
    return views.MailViewSet(request=user_request, kwargs={"uuid": str(mail.uuid)}, format_kwarg={})


class TestMailViewSet:
    def test_send(self, mail_viewset, user_request, mail):
        mail_viewset.action = "send"
        resp = mail_viewset.send(user_request, str(mail.uuid))
        task = DBTaskResult.objects.all().last()
        assert resp.data["state"] == Mail.State.SENDING
        assert task.args_kwargs["kwargs"]["uuid"] == str(mail.uuid)
