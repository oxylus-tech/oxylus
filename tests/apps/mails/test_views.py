import pytest
from django_tasks.backends.database.models import DBTaskResult

from ox.apps.mails import views
from ox.apps.mails.models import SendMail


@pytest.fixture
def send_mail_viewset(user, user_request, send_mail):
    # work around to pass user the permission change_sendmail
    user.is_superuser = True
    user.save(update_fields=["is_superuser"])
    return views.SendMailViewSet(request=user_request, kwargs={"uuid": str(send_mail.uuid)}, format_kwarg={})


class TestSendMailViewSet:
    def test_send(self, send_mail_viewset, user_request, send_mail):
        send_mail_viewset.action = "send"
        resp = send_mail_viewset.send(user_request, str(send_mail.uuid))
        task = DBTaskResult.objects.all().last()
        assert resp.data["state"] == SendMail.State.SENDING
        assert task.args_kwargs["kwargs"]["uuid"] == str(send_mail.uuid)
