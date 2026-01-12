from django.utils.translation import gettext_lazy as _

from ox.core.panels import registry, Panel, Panels


panels = Panels(
    "mails",
    _("Mails"),
    items=[
        #        Panel(
        #            "mails",
        #            _("Mails"),
        #            "mdi-email-arrow-right",
        #            "ox-mail-panel",
        #            url="ox_mails:index",
        #            permissions="ox_mails.view_mail",
        #        ),
        Panel(
            "mailaccounts",
            _("Accounts"),
            "mdi-email-lock",
            "ox-mail-account-panel",
            url="ox_mails:index",
            permissions="ox_mails.view_mailaccount",
        ),
    ],
)

registry["settings"].append(panels)
