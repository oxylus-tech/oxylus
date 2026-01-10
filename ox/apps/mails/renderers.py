from django.utils.translation import gettext_lazy as _
from ox.apps.content.renderers import Renderer, VariableInfo

__all__ = "renderer"


renderer = Renderer(
    variables={
        "name": VariableInfo(_("Recipient Name")),
        "email": VariableInfo(_("Recipient Email")),
        "subscription.name": VariableInfo(
            _("Mailing-list Name"), _("Name of the mailing-list from which mail was sent."), True
        ),
        "subscription.url": VariableInfo(
            _("Subscription Link"), _("Link to recipient's subscription preferences."), True
        ),
    }
)
""" Renderer used by :py:class:`.send.Send`. """
