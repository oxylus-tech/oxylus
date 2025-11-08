from rest_framework.decorators import action
from rest_framework.response import Response

from caps.views import OwnedViewSet
from . import models, serializers, tasks


__all__ = ("MailAccountViewSet", "BaseMailViewSet", "MailViewSet")


class MailAccountViewSet(OwnedViewSet):
    queryset = models.MailAccount.objects.all().order_by("name")
    serializer_class = serializers.MailAccountSerializer

    filterset_fields = {"owner__uuid": ["in", "exact"]}
    search_fields = [
        "name",
    ]


class BaseMailViewSet(OwnedViewSet):
    """
    Base viewset to use for editing and sending emails.

    **You must specify permissions for the action ``send``!** For example:

    .. code-block:: python

        perms_map = {
            # Adapt for your own model
            "send": ["ox_mails.change_mail"],
        }

    """

    filterset_fields = {
        "owner__uuid": ["in", "exact"],
        "account__uuid": ["in", "exact"],
    }

    @action(detail=True, methods=["POST", "PUT"])
    def send(self, request, uuid=None):
        """
        Trigger django task to send a mail and return an updated mail instance.

        Task is :py:meth:`.send.send_mail`.
        """
        if not self.perms_map.get("send"):
            raise ValueError("Permission for this action MUST be specified by `perms_map`. ")

        obj = self.get_object()
        tasks.send_mail.enqueue(uuid=str(obj.uuid), model=type(obj)._meta.label_lower)
        obj.state = obj.State.SENDING
        obj.save()
        serializer = self.get_serializer(instance=obj)
        return Response(serializer.data)


class MailViewSet(BaseMailViewSet):
    """View set for the :py:class:`.models.Mail`."""

    queryset = models.Mail.objects.all().order_by("-updated")
    serializer_class = serializers.MailSerializer
    perms_map = {
        "send": ["ox_mails.change_mail"],
    }
