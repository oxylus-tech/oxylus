from rest_framework.decorators import action
from rest_framework.response import Response

from caps.views import OwnedViewSet
from . import models, serializers, tasks


__all__ = ("MailAccountViewSet", "SendMailViewSet")


class MailAccountViewSet(OwnedViewSet):
    queryset = models.MailAccount.objects.all().order_by("name")
    serializer_class = serializers.MailAccountSerializer

    filterset_fields = {"owner__uuid": ["in", "exact"]}
    search_fields = [
        "name",
    ]


class SendMailViewSet(OwnedViewSet):
    queryset = models.SendMail.objects.all().order_by("-updated")
    serializer_class = serializers.SendMailSerializer

    perms_map = {
        "send": ["ox_mails.change_sendmail"],
    }

    filterset_fields = {
        "owner__uuid": ["in", "exact"],
        "template__uuid": ["in", "exact"],
        "account__uuid": ["in", "exact"],
        "is_template": ["exact"],
    }

    @action(detail=True, methods=["POST", "PUT"])
    def send(self, request, uuid=None):
        obj = self.get_object()
        tasks.send_mail.enqueue(uuid=str(obj.uuid))
        obj.state = obj.State.SENDING
        obj.save()
        serializer = self.get_serializer(instance=obj)
        return Response(serializer.data)
