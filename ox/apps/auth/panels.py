from django.utils.translation import gettext_lazy as _

from ox.core.panels import registry, Panel, Panels

panels = Panels(
    "auth",
    _("Authentication"),
    items=[
        Panel(
            "users",
            _("Users"),
            "mdi-account",
            "ox-user-panel",
            url="ox_auth:index",
            permission="auth.view_user",
        ),
        Panel(
            "groups",
            _("Groups"),
            "mdi-account-multiple",
            "ox-group-panel",
            url="ox_auth:index",
            permission="auth.view_group",
        ),
    ],
)

registry["settings"].append(panels)
