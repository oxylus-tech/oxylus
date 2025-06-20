from django.utils.translation import gettext_lazy as _
from rest_framework.decorators import action
from rest_framework.response import Response

from caps.views import OwnedViewSet
from ox.core.views import nav
from . import models, serializers, tasks


__all__ = ("MailAccountViewSet", "MailTemplateViewSet", "SendMailViewSet")


nav.app_nav.append(
    nav.NavGroup(
        "mails",
        _("Mails"),
        items=[
            nav.NavItem(
                "sendmails",
                _("Send"),
                url="ox_mails:index",
                icon="mdi-email-arrow-right",
                permissions="ox_mails.view_sendmail",
            ),
            nav.NavSubGroup(
                "settings",
                _("Settings"),
                order=100,
                items=[
                    nav.NavItem(
                        "mailaccounts",
                        _("Accounts"),
                        url="ox_mails:index",
                        icon="mdi-email-lock",
                        permissions="ox_mails.view_mailaccount",
                    ),
                    nav.NavItem(
                        "mailtemplates",
                        _("Templates"),
                        url="ox_mails:index",
                        icon="mdi-email-edit",
                        permissions="ox_mails.view_mailtemplate",
                    ),
                ],
            ),
        ],
    ),
)


class MailAccountViewSet(OwnedViewSet):
    queryset = models.MailAccount.objects.all().order_by("name")
    serializer_class = serializers.MailAccountSerializer

    filterset_fields = {"owner__uuid": ["in", "exact"]}
    search_fields = [
        "name",
    ]


class MailTemplateViewSet(OwnedViewSet):
    queryset = models.MailTemplate.objects.all().order_by("name")
    serializer_class = serializers.MailTemplateSerializer

    filterset_fields = {
        "owner__uuid": ["in", "exact"],
        "account__uuid": ["in", "exact"],
    }


class SendMailViewSet(OwnedViewSet):
    queryset = models.SendMail.objects.all().order_by("-updated")
    serializer_class = serializers.SendMailSerializer

    filterset_fields = {"owner__uuid": ["in", "exact"], "template__uuid": ["in", "exact"]}

    @action(detail=True, methods=["POST"])
    def send(self, request, uuid=None):
        obj = self.get_object()
        tasks.send_mail.enqueue(uuid=str(obj.uuid))
        obj.state = obj.State.SENDING
        obj.save()
        serializer = self.get_serializer(instance=obj)
        return Response(serializer.data)
