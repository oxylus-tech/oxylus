from django.apps import apps
from django.utils.module_loading import import_string
from django_tasks import task

from ox.apps.content.renderers import Renderer
from . import models
from .send import MailSend


@task()
def send_mail(uuid: str, model: str, renderer: str, context={}):
    """Send a mail provided by uuid.

    :param uuid: mail uuid
    :param model: model label
    :param renderer: renderer class
    :return SendMail status
    """
    cls = apps.get_model(model)
    if not issubclass(cls, models.BaseMail):
        raise ValueError(f"The provided model `{model}` is not a subclass of mails.Mail.")

    _renderer = import_string(renderer)
    if not isinstance(_renderer, Renderer):
        raise ValueError(f"`{renderer}` is not a renderer.")

    try:
        obj = cls.objects.get(uuid=uuid)
        mail_send = MailSend(obj, _renderer)
        mail_send.send(context)
    except Exception:
        obj.state = cls.State.ERROR
        obj.save()
        raise
    obj.refresh_from_db()
    return obj.state
