from django.utils.translation import gettext_lazy as _

from ox.core.panels import registry, Panel, Panels


panels = Panels(
    "locations",
    _("Locations"),
    items=[
        Panel(
            "countries",
            _("Countries"),
            "mdi-earth",
            "ox-country-panel",
            url="ox_locations:index",
            permission="ox_locations.view_country",
        ),
        Panel(
            "currencies",
            _("Currencies"),
            "mdi-currency-eur",
            "ox-currency-panel",
            url="ox_locations:index",
            permission="ox_locations.view_currency",
        ),
    ],
)

registry["settings"].append(panels)
