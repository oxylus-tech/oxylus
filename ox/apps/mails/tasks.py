from django.apps import apps
from django_tasks import task

from . import models
from .send import MailSend


@task()
def send_mail(uuid: str, model: str, context={}):
    """Send a mail provided by uuid.

    :param uuid: mail uuid
    :param model: model label
    :return SendMail status
    """
    cls = apps.get_model(model)
    if not issubclass(cls, models.BaseMail):
        raise ValueError(f"The provided model `{model}` is not a subclass of mails.Mail.")

    try:
        obj = cls.objects.get(uuid=uuid)
        mail_send = MailSend(obj)
        mail_send.send(context)
    except Exception:
        obj.state = cls.State.ERROR
        obj.save()
        raise
    obj.refresh_from_db()
    return obj.state
