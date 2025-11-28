Django Application
==================

We'll concentrate here on the various aspects of setting up and create the Django application.


AppConfig
---------

The ``AppConfig`` in Oxylus is responsible of different extra things:

    - specifying application dependencies and metadata: this will later be used in order to create a user interface for installing and creating application.
    - information displayed for the user (icon, root url).
    - assets: provide Vite project built for the client application.

After the application has been created, in ``apps.py``, some changes will be needed. Lets take at this example:


.. code-block:: python

    from django.utils.translation import gettext_lazy as _
    from ox.core import apps


    __all__ = ("AppConfig",)


    class AppConfig(apps.AppConfig):
        name = "my_app"
        label = "my_app"
        verbose_name = _("My App")

        # Declare an icon used for rendering, using Material design icon
        icon = "mdi-card-account-mail"

        # Root url to use for API, templates and statics
        root_url = "my_app"

        # Name of the npm package used for frontend apps
        npm_package = "my_app"

        # Declare app dependencies (only Django applications)
        # This is used by installer to install/setup the dependencies
        # dependencies = ("django.contrib.auth", "ox.apps.auth")


Application Assets
..................

Oxylus handles assets management, using declaration :py:attr:`~ox.core.apps.AppConfig.assets`. It uses two classes here:

- :py:class:`~ox.core.assets.base.Asset`: declaration for a npm package, with specified distributed file (js, js for development, and css);
- :py:class:`~ox.core.assets.base.Assets`: this is the actual declaration for an application of its npm package, with entry points, dependencies and so on.

Those classes are used for multiple purposes:

- Automatically include relevant javascript and stylesheets into the rendered Django template;
- Generate importmap, which is mandatory if you don't bundle all javascript code;
- Finding statics in development mode, and collect them for production;


.. code-block:: python

    from pathlib import Path
    # ...
    from ox.core.assets import Asset, Assets

    class AppConfig(apps.AppConfig):
        # ... other attribute

        assets = Assets(
            # Assets directory
            Path(__file__).parent / "assets",
            includes=[
                # Application entry point
                Asset("", "index.js"),
            ],
            dependencies=[
                # We require Oxylus dependencies
                apps.ox_assets,
                # We don't bundle chat.js in the compiled javascript app
                # So we provide it here
                Asset("chart", "chart.umd.min.js", dev_js="chart.umd.js"),
            ]
        )


The :py:class:`~ox.core.assets.base.Assets` has an extra attribute ``name`` that we don't need to provide at this point: it will be set at the AppConfig instanciation. This allows to reuse the same assets declaration for multiple applications.


Models
------

.. code-block:: python

    from django.db import models
    from django.utils.translation import gettext_lazy as _

    # Use this model subclass as it already provides uuid for external
    # references among other things. This uuid is NOT a primary key.
    from ox.core.models import Model


    __all__ = ("Book", "Author")


    class Author(Model):
        first_name = models.CharField(_("First name"), max_length=64)
        last_name = models.CharField(_("Last name"), max_length=64)
        biography = models.TextField(_("Biography"), max_length=64)

        class Meta:
            verbose_name = _("Author")
            verbose_name_plural = _("Authors")


    class Book(Model):
        author = models.ForeignKey(Author, models.CASCADE, verbose_name=_("Author"))
        title = models.CharField(_("Title"), max_length=64)
        summary = models.TextField(_("Summary"))
        published = models.DateField(_("Date of publication"))

        class Meta:
            verbose_name = _("Book")
            verbose_name_plural = _("Books")


It is preferred to always use translations; as we will see later, this will be gathered by the ``vue-i18n`` management command to make it available to frontend.


Permissions & security
......................

It is a good practice to avoid exposing objects database identifiers. This avoid security pitfalls as access element exploiting predictive id.

Oxylus provide models with a uuid that can then be used from views and viewsets to access the actual resource. Most of how models are designed are not integrated into the platform as we need to see how will the future come. For the moment however there is no implemented way to access objects by uuid when they come from external applications (such as ``django.contrib.auth``).

Regarding the permission systems being used, Oxylus uses two:

- Django's basic permission system: simple groups and users permissions;
- Object permission system based on `Django Caps <https://pypi.org/project/django-caps/>`__


Serializers
-----------

Preferably use Oxylus's :py:class:`~ox.core.serializers.base.ModelSerializer` for
serializer, and :py:class:`~ox.core.serializers.base.RelatedField` for UUID field
targeting another model instance.

.. code-block:: python

    from rest_framework import serializers
    from ox.core.serializers import ModelSerializer, RelatedField
    from . import models


    __all__ = ("AuthorSerializer", "BookSerializer")

    class AuthorSerializer(ModelSerializer):
        class Meta:
            model = models.Author
            fields = ["first_name", "last_name", "biography"]


    class BookSerializer(ModelSerializer):
        # RelatedField is just a wrapper around DRF's SlugField
        # It uses model's UUID as reference instead of internal DB primary key
        author = RelatedField(queryset=models.Author.objects.all())

        class Meta:
            model = models.Book
            fields = ["author", "title", "summary", "published"]


Views
-----

In regular django there is a view par use-case (eg. five views for a model's CRUD: list, detail, create, edit, delete). In Oxylus however, things are handled differently: this is the client application which will be responsible to render the equivalent views for multiple models. Views are regrouped under a Panel component which is responsible to call API to update information from/on the server among other things.

The backend side is then used for two things: rendering the application view and providing API endpoints. It will also handle overriding templates from other Django applications if (most certainly) required.

There are two main views that can be used for server-side rendering:

- :py:class:`~ox.core.views.app.AppView`: base application view;
- :py:class:`~ox.core.views.app.UserAppView`: application view requiring user's login;

However, in most case when declaring your app view you won't even need to create a custom AppView class. The reason is simple: most of the logic resides in viewsets, and by
providing the right attribute values, everything will be handled in a declarative manner.

However, lets take a look to what it might looks like:

.. code-block:: python


    from django.contrib.auth.mixins import LoginRequiredMixin, PermissionRequiredMixin
    from django.utils.translation import gettext_lazy as _

    from ox.core.views import UserAppView
    from .panels import panels

    class AppView(PermissionRequiredMixin, UserAppView):
        # we restrict the view to users having thoses permissions
        permission_required = ["auth.view_user", "auth.view_group"]
        # Default panel to display when none is requested by user.
        default_panel = "user-list"

        # Select which panels to render, see below
        panels = panels

        # For the sake of example: this method is used to provide initial data inside
        # the rendered page. It will be loaded when mounting Vue application.
        def get_app_data(self, **kwargs):
            kwargs.setdefault('foo', 123)
            return super().get_app_data(**kwargs)


.. hint::
    We can directly provide some data to the client application, as this avoids extra
    request and we already have fetched elements from the database. This is what Oxylus
    does when it provides the current user information behind the scene, or the panel
    to be displayed. The use should be limited, taking into consideration that API may
    avoids deduplication of concerns and complexity.

    They will be accessible from the application context's data. [TODO/FIXME]


ViewSets
........

In order to handle API interaction, Oxylus uses `Django Rest Framework <https://www.django-rest-framework.org/>` in order to ensure this task. Please refer to its documentation.

Oxylus provides :py:class:`ox.core.views.api.ModelViewSet` in order to manipulate objects by uuid among other things.

Lets extend ``views.py``:

.. code-block:: python

    # Add to imports
    from ox.core.views import ModelViewSet
    from . import models, serializers

    # The actual viewsets
    class BookViewSet(ModelViewSet):
        queryset = models.Book.objects.all().order_by("-id")
        serializer_class = serializers.BookSerializer

        # You can override default filterset_fields
        # filterset_fields = ModelViewSet.filterset_fields
        search_fields = ["title", "summary"]
        ordering_fields = ["title", "published"]

    class BookViewSet(ModelViewSet):
        queryset = models.Author.objects.all().order_by("-id")
        serializer_class = serializers.AuthorSerializer
        search_fields = ["last_name", "first_name"]
        ordering_fields = ["last_name", "first_name"]



Templates
.........

The :py:class:`~ox.core.apps.base.AppView` will add an extra template name to look for by Django: ``[app_config.path_label]/app.html`` (:py:attr:`ox.core.apps.AppConfig.path_label`).

The user provided template should extend ``ox/core/app.html``. It will handle loading assets, and rendering the default application layout in which to put the panels' components.

However, same as for the application view, you won't need to extend it must of the time, as configuring ``panels.py`` and ``urls.py`` is sufficient.

In Oxylus, ``components/`` directory is used for components rendered in Django templates. Thoses files should provide only code to allow other application to extend de component, as component are basically a client side concept. We also recommend to include components from the ``app.html``, in order to allow their usage at different places and provide clear structure.

Lets take the example of ``ox_contacts`` application: it will extend ``ox/core/components/model_actions.html`` to add a button to edit the user linked to a contact.


Panels
------

A client application contains one or more panels, each dedicated to a specific use case or a model. A panel may contains multiple view, eg. for CRUD there will be at least two: ``list.table`` (default list view), and ``detail.edit`` (used for: create, edit and display).
The delete view is not necessary as it is considered as an action; a button appearing in list and edit view.

Panels are declared inside ``panels.py``. This module will be loaded at initialization and is used to declare :py:class:`~ox.core.panels.Panels` and nested :py:class:`~ox.core.panels.Panel` - registered to a :py:class:`ox.core.panels.Registry`.

This allows two things in a declarative manner:

- Automate server-side rendering of the application view: components will be integrated based on the provided configuration;
- Generate navigation menu;


Example of ``panels.py``:

.. code-block:: python

    from django.utils.translation import gettext_lazy as _

    from ox.core.panels import registry, Panel, Panels

    # Declare the panels
    panels = Panels(
        "my_app",    # name of the panel
        _("My App"), # label

        # Nested panels (and navigation items)
        items=[
            # Declare a single panel
            Panel(
                "authors",
                _("Authors"),
                "mdi-card-account-details",      # icon
                "myapp-author-panel",            # panel component
                url="my_app:index",              # view url
                order=0,                         # menu item order
                permission="my_app.view_author", # required permissions

                # Optional: use this template to add extra actions for a model
                actions_template="ox/contacts/components/author_actions.html",
            ),
            Panel(
                "books",
                _("Books"),
                "mdi-domain",
                "myapp-book-panel",
                url="my_app:index",
                permission="my_app.view_book",
            ),
        ]
    )

    # Append the Panels to the registry.
    registry.append(panels)

    # You also can add a panels to an existing one in the registry, lets say the
    # "settings" one:
    # registry["settings"].append(panels)


Urls
----

Each application provides its urls by the exported ``urls`` and ``api_urls`` lists. It is discovered by Oxylus in order to generate all urls (:py:class:`ox.urls.Router.Discover`). One attribute is for views; the other for API endpoints.

The urls will be prefixed with application :py:attr:`~ox.core.apps.AppConfig.root_url`
(defaults to :py:attr:`~ox.core.apps.AppConfig.label`), such as they are prefixed with:

- ``{root_url}/``: for views;
- ``api/{root_url}``: for api entry points. They are namespaced under ``{{ app.label }}-api``, such as for example ``ox_core-api:account``;

For example:

.. code-block:: python

    from django.urls import path
    from rest_framework.routers import DefaultRouter

    from ox.core.views import UserAppView
    from . import panels, views

    # Use DRF router to register viewsets and generate routes for us
    router = DefaultRouter()
    router.register(r"author", views.AuthorViewSet, basename="author")
    router.register(r"book", views.BookViewSet, basename="book")

    api_urls = router.urls # or: `router.urls + [ ... ]`

    # Regular views url
    urls = [
        # application view as application main page.
        # this is a convention to use "index" as name.
        path(
            "",
            UserAppView.as_view(
                default_panel="books",  # set a default panel
                panels=panels.panels,   # set the actual panels to render
            ),
            name="index"
        )
        # Optional: add other views which require to be on a different page
        # path("settings/", views.SettingsView.as_view(), name="settings"),
    ]


The generated urls will look like: ``/my_app/``, ``/my_app/settings/``, or ``/api/my_app/author/``.


.. important::
    In Oxylus the url names and paths match the lower case model name (without snake/camel case).

    The api views are generated using the DRF's router, which appends ``-list``, ``-create``, etc. the url name. They
    will be namespaced under ``{app.label}-api``.

    Example: ``ox_contacts-api:organisationtype-list`` for ``api/ox/contacts/organisationtype/`` (because:
    ``ox_erp.contacts.apps.AppConfig.root_url == "ox/contacts"``)



There we are...
---------------

Lets summarize a bit. We have a Django application with:

- correct AppConfig;
- models, serializers and viewsets;
- panels and urls;

Also remember:

- internationalize everything you can (aka what is rendered to users);
- use provided classes as they ensure better security (eg. avoid db primary keys exposure);


Install the app
---------------

Lets install the app. Grosso modo, the server is ran from the oxylus application. The packages need to be installed inside its environment. Then setup the application as regular Django app (migrations/collectstatic/etc) needs to be run.

The first step might differ depending whether you on development instance or on a production one:

- *Development*: what you want is to be able to run the server and have change taken in account in the running instance. In such case, just create a symbolic link to the application module inside the instance's environment.
- *Production*: what you want is to install a package from pip inside the environment.

Once it is done, just run the following command:

.. code-block:: bash

    # replace `module.appN` with the module path to the app
    ./manage.py ox install module.app1 module.app2 # ...

This commands ensure to:

- setup settings, enabling the app in the ``conf/plugins.yaml`` file.
- run migration, collect assets and statics, install application fixtures.
- revert in case of error.
- handle dependencies install declared in :py:attr:`ox.core.apps.AppConfig.dependencies`;


Well done! What's next? Let go dive to the frontend application development.
