Overview
========

Applications
------------

An application, as in good django's development practice should respond to a speficic usage scope. This in order to allow reusability and extensibility. We follow this nice idea.


Before digging in technical aspects, lets see what is required to create an application:

- a Django application: use ``django-admin startapp`` or copy/setup one manually:

    - ``apps.py``:

        - Inherit the ``AppConfig`` from :py:class:`~ox.core.apps.AppConfig`.
        - Provide more info (:py:class:`~ox.core.apps.AppConfig` and  :py:class:`~ox.core.apps.AppMeta`)
        - If specific :doc:`assets <assets>` are required append them. There is no need to declare an ``Asset`` for the project being built, and default :py:attr:`~ox.core.apps.AppConfig.assets` already provides what you would use.

- a frontend application: a Vite/Vue project the source of the package is usually put in Django app's ``assets`` sub-directory;

- Models:

    - Declare your models in ``models.py``;
    - Declare serializers & related viewsets;
    - *On the frontend*: declare the related models;

- Views:

    - An application view, subclassing :py:class:`ox.core.views.base.AppView`;
    - Viewsets, one per model;
    - *On the frontend*: create a ``ModelPanel`` for each model;

- Urls: urls are automatically discovered by Oxylus at initialization (app's ``urls`` module).


What does it means?
...................

Lets take a look at basic application structure:

.. code-block:: bash

    my-app /
        apps.py         # Application configuration
        models.py       # Models & querysets definitions
        panels.py       # Define menus here
        serializers.py  # Models serializers
        urls.py         # Define urls & api_urls here
        views.py        # AppView & viewsets

        # Frontend application
        assets /
            package.json        # NPM package configuration
            vite.config.js      # Vite configuration
            tsconfig.json       # Typescript configuration if you're using it
            src /               # Aaaah source directory
                index.ts        # Where to init the application
                models.ts       # Models definition
                composables.ts  # Composables if needed
                components /    # Vue components
                    *.vue # MyModelPanel.vue, etc.

        # Built assets in assets/dirs and dependencies will copied here
        static /


As you can see its a regular Django app + few extra files (``panels.py``, ``urls.py``) and an ``assets`` directory containing the code for the frontend.

*Eeegh!*, might you think, *thats a lot of files...*. But though this seems a lot this becomes kinda simple once you got it (expecting you've already used both technologie, otherwise I know that's a lot to take in).

We'll go through it step by step in the next sections.

#. :doc:`Create the Django application <./10-backend.py>`
#. :doc:`Create the frontend <./20-frontend.py>`


Oxylus Organisation
-------------------

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

Client applications use the following libraries among others: ``Vue``, ``pinia``, ``pinia-orm``, ``vuetify``. And of course the main Oxylus javascript library ``@oxylus/ox``.
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
