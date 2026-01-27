Overview
========

What Oxylus is
--------------

Oxylus is a platform hosting Django applications using modern web interface. It provides different base applications that
are reusables in most use-cases, such as background tasks execution, users management, file upload.

Despite its learning curve, its provides many features that allows to ease new application implementation into an ecosystem
without having to worry about different things. It provide coherent interface among applications.

In short: what you only have to worry is your application scope.


Applications
------------

An application, as in good django's development practice should respond to a speficic usage scope. This in order to allow reusability and extensibility. We follow this nice idea.


Before digging in technical aspects, lets see what is required to create an application:

- a Django application: use ``django-admin startapp`` or copy/setup one manually:

    - ``apps.py``:

        - Inherit the ``AppConfig`` from Oxylus' :py:class:`~ox.core.apps.AppConfig`.
        - Provide more info (:py:class:`~ox.core.apps.AppConfig` and  :py:class:`~ox.core.assets.base.Assets`)
        - If specific :ref:`assets <guide-app-assets>` are required append them. There is no need to declare an ``Asset`` for the project being built, and default :py:attr:`~ox.core.apps.AppConfig.assets` already provides what you would use.

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

Ah! Also, we're using Poetry to setup and run Oxylus projects.

.. important:: *Be prepared to dig into multiple technologies, fullstack wide!*

    In the following guide we assume you already know a minimum about Django and Vue technologies. Basic knowledge of
    Pinia/Pinia-ORM is strongly advised, as well as Vuetify components.

    I know this might seems to be a lot, but indeed this is what is required to have a powerful dynamic web application.


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

        # Various data
        data /
            fixture*.{yaml,json} # Fixture to import on install

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

#. :doc:`Create the Django application <./10-backend>`
#. :doc:`Create the frontend <./20-frontend>`
