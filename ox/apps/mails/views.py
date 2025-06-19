from django.utils.translation import gettext_lazy as _

from caps.views import OwnedViewSet
from ox.core.views import nav
from . import models, serializers


__all__ = ("MailAccountViewSet", "MailTemplateViewSet", "OutMailViewSet")


nav.app_nav.append(
    nav.NavGroup(
        "mails",
        _("Mails"),
        items=[
            nav.NavItem(
                "outmails",
                _("Outgoing"),
                url="ox_mails:index",
                icon="mdi-email-arrow-right",
                permissions="ox_mails.view_outmail",
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


class OutMailViewSet(OwnedViewSet):
    queryset = models.OutMail.objects.all().order_by("-updated")
    serializer_class = serializers.OutMailSerializer

    filterset_fields = {"template__uuid": ["in", "exact"]}
