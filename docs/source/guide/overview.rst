Technical Overview
==================
Oxylus is a regular Django project (backend, api and SSR), with Vue applications handling client side interaction. Regarding the frontend, we also use Django's template system to extend component across applications (eg. add an application entry to user navigation).

The project is structured based on Django receipes: a project containing multiple applications, each for a specific purpose. We assume the reader is familiarized with both technologies.

Oxylus is organised around different parts:

- backend: django application provides views, templates, API and platform integration.
- frontend: ``assets`` are built and distributed into ``static``. This is where Vite and Vue enter into action.

The code is organised in order to keep coherency between both sides. Each side handles things its own ways (project buiding, testing, code documentation): this keeps bests practices on. However, we provide utilities in order to integrate frontend into backend (including assets management, see :doc:`Assets <../api/core/assets>`).

*Note:* All oxylus libraries and modules use the abbreviation ``ox`` (as ``ox_core`` for core frontend libraries and AppConfig's label).


Internals
---------

Directories & files structure
.............................

The Oxylus project follows the following convention:

- ``ox``: contains the whole python project

    - ``core``: base django application, providing both basic models, interface and core tools.
    - ``apps``: directory containing other applications, such as authentication one.
    - ``settings``: project settings
    - ``utils``: utilities
    - ``static``: statics directories.

- ``assets/``: client side projects, whose directory name corresponds to the related Django ``AppConfig.label``. They are expected to be ViteJS project.
- ``docs/``

Frontend code can also be nested under application's directory (as ``assets``).


Backend
.......
Oxylus applications inherits from different classes and templates provided by ``ox.core``.

- ``ox.core.apps``: handle assets management, application dependencies among other things.
- ``ox.core.views``, ``ox.core.serializers``, ...:

    - common classes and mixins (app views, viewsets, etc.);
    - basic use cases such user authentication, errors handling;

- ``ox.core.management``: tools used to manage and develop Oxylus applications, such as assets management.

- ``ox/core/app.html``: base page template;
- ``ox/core/components/``: contains multiple base template for components. This allows to extend dynamic Vue ones using Django templates.

The templates are used for two main purposes, render web pages and allows further application to extends the user interface using templates' blocks (Django) and components slots (Vue).


Client application
..................
Client applications use the following libraries among others: ``Vue``, ``pinia``, ``pinia-orm``, ``vuetify``. And of course the main Oxylus javascript library ``ox``.
The concept is that an application provide panels in which there are views. Application data are articulated around ORM models, fetched through Django Rest Framework API. Composables and components are used for the UX part.

The name of the models should reflect what exists in the backend.

Application interface is structured as there is:

- top bar:

    - application title

- panels navigation: navigation over the panels of all providing applications;
- panels window:

    - ``OxPanel``: a panel is an interface specific to a use case;
    - ``OxModelPanel`` panels: provide basic CRUD interface with item actions, different list views, customizable ``add`` and ``edit`` view;

- components:

    - ``OxModelEdit``: provide model edition interface and utilities.
    - ``OxListKanban``, ``OxListTable``, ...: list views
