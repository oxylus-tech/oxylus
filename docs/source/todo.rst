

Current dev
===========


- Serialization / API: start to nest data to avoid overload of http requests
- Translations:
    - SFC
    - reorganize naming scheme, as default : "fields.{name}", and models / fields as "{app}.{model}.fields.{field}"
- Contacts:
    - "name" field usage
    - Contact serializer: contact_lists is only on PersonSerializer => generalize or remove (simpler => depends on contact list editor)
    - contact_lists m2m change of model: impact/fixes

To check:
- login: on error 500, success message is provided as "Congrats! Data have been updated."


Contacts
--------

- Contact list filters: is subscription, related to a group, or an organisation
- ContactMail

Content
-------

- dynamic block data attribute: normalize, as "data-block", "data-block-*"
- insert url from variable
- better url edition

Auth
----

- Share access


Bugs
----

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
