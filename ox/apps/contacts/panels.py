from django.utils.translation import gettext_lazy as _

from ox.core.panels import registry, Panel, Panels

panels = Panels(
    "contacts",
    _("Contacts"),
    items=[
        Panel(
            "persons",
            _("Persons"),
            "mdi-card-account-details",
            "ox-person-panel",
            url="ox_contacts:index",
            order=0,
            permission="ox_contacts.view_person",
            actions_template="ox/contacts/components/person_actions.html",
        ),
        Panel(
            "organisations",
            _("Organisations"),
            "mdi-domain",
            "ox-organisation-panel",
            url="ox_contacts:index",
            permission="ox_contacts.view_organisation",
            actions_template="ox/contacts/components/organisation_actions.html",
        ),
        Panel(
            "contactlists",
            _("Contact Lists"),
            "mdi-card-account-details-star",
            "ox-contact-list-panel",
            order=80,
            url="ox_contacts:index",
            permission="ox_contacts.view_contactlist",
        ),
        Panels(
            "settings",
            _("Settings"),
            order=100,
            items=[
                Panel(
                    "organisationtypes",
                    _("Organisation Types"),
                    "mdi-domain-switch",
                    "ox-organisation-type-panel",
                    url="ox_contacts:index",
                    permission="ox_contacts.view_organisationtype",
                )
            ],
        ),
    ],
)

registry.append(panels)
