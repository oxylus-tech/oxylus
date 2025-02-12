List of Django templates
========================

Here is a list of templates and their usages. This is usefull to extends interface
functionalities based on the different apps.

ox/core
-------

Templates files in this directory correspond to pages rendered to user.

- ``ox/core/base.html``: base layout used by all others pages.
- ``ox/core/app.html``: layout used by Oxylus application. This is different from ``base.html`` since the first
  one is more general, and this one targets Vue applications.
- ``ox/core/login.html``: user login page.
- ``ox/core/account.html``: user account page.
- ``ox/core/settings.html``: settings page.

ox/core/components
..................

Regroup core's components templates rendered by Django.

- ``ox/core/components/actions.html``: base template providing a set of actions;
- ``ox/core/components/model_actions.html``: base template providing actions to all model instances;
- ``ox/core/components/app_bar_right.html``: right-most part of top application bar;
