

Current dev
===========

Bugs
----

- OxAutocomplete:

    - bug when selecting a value: when the value is selected, the
      list may be updated discarding the items, this hide the item
      (since it is not more in the list).
      Mitigation:

      - keep the selected item in an separate variable from the list
      - on list load (filter/search), ensure item is in the list (list.add)

- OxModelEdit / modelEditor:

    - bug:
        - update/load edit view on existing item
        - then create a new item: save button is disabled


Technical documentation
=======================

- Application:

    - Backend vs frontend
    - Setup & Quickstart
    - models/views+nav/viewsets/permissions
    - Settings & configuration


User documentation
==================

- Authentication:

    - the regular users should mostly never be marked as is_staff: this gives access to data that should not be available to everyone (see AdminBrowsableAPIRenderer)
