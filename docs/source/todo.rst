

Current dev
===========

Files
-----

- FolderNavDrawer:

    - drawer
    - remove, rename folder

- file & folder name validation ('/')


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
