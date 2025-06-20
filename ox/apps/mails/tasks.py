from django_tasks import task

from . import models
from .send import MailSend


@task()
def send_mail(uuid, context={}):
    """Send a mail provided by uuid.

    :param uuid: mail uuid
    :return SendMail status
    """
    obj = models.SendMail.objects.get(uuid=uuid)
    mail_send = MailSend(obj)
    mail_send.send(context)
    obj.refresh_from_db()
    return obj.state
