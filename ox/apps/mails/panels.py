from django.utils.translation import gettext_lazy as _

from ox.core.panels import registry, Panel, Panels


panels = Panels(
    "mails",
    _("Mails"),
    items=[
        Panel(
            "sendmails",
            _("Send"),
            "mdi-email-arrow-right",
            "ox-send-mail-panel",
            url="ox_mails:index",
            permissions="ox_mails.view_sendmail",
        ),
        Panels(
            "settings",
            _("Settings"),
            order=100,
            items=[
                Panel(
                    "mailaccounts",
                    _("Accounts"),
                    "mdi-email-lock",
                    "ox-mail-account-panel",
                    url="ox_mails:index",
                    permissions="ox_mails.view_mailaccount",
                ),
            ],
        ),
    ],
)

registry.append(panels)
