

Current dev
===========

- login: on error 500, success message is provided as "Congrats! Data have been updated."

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

- Requirements:
    - libmagic(-dev)

- Application:

    - Backend vs frontend
    - Setup & Quickstart
    - Settings & configuration

    - Models:
        - Meta
        - Relationships
    - panels/views+nav/viewsets/permissions
    - SFC & ox-component


- CI/CD:

    - tests require assets to be built and deps installed
    - deployment:
        - require assets to be build (in order for collectstatic to work)
        - OR collectstatic before deployment (but ain't possible to provide output directory)

User documentation
==================

- Authentication:

    - the regular users should mostly never be marked as is_staff: this gives access to data that should not be available to everyone (see AdminBrowsableAPIRenderer)


Future improvements
===================

- Locales: currently the ``base.html`` view tries to load application locale even if it does not exists. Optimize it in order to reduce 404 errors
- Content RichEditor: provide a plugin for adding a context object.
