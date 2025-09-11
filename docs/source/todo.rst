

Current dev
===========

Mails
-----

- SendMail:

    - Set the template: copy informations from it;
    - list view: action to create a mail from this template;
    - remove template attribute? Just generate from a mail

        - add tags in such case

Contacts
--------

- Contact list filters: is subscription, related to a group, or an organisation

Files
-----


Bugs
----

- rules.errors

- OxModelEdit / modelEditor:

    - bug:
        - update/load edit view on existing item
        - then create a new item: save button is disabled

- Confirmation before leaving edited content does not work


Technical documentation
=======================

- Application:

    - Backend vs frontend
    - Setup & Quickstart
    - Settings & configuration

    - Models:
        - Meta
        - Relationships
    - panels/views+nav/viewsets/permissions
    - SFC & ox-component


User documentation
==================

- Authentication:

    - the regular users should mostly never be marked as is_staff: this gives access to data that should not be available to everyone (see AdminBrowsableAPIRenderer)
