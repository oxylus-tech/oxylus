Applications
============

An application, as in good django's development practice should respond to a speficic usage scope. This in order to allow reusability and extensibility. We follow this nice idea.


Before digging in technical aspects, lets see what is required to create an application:

- `django-admin startapp`: create a django application
- `apps.py`:

    - Inherit the generated `AppConfig` from :py:class:`~ox.core.apps.AppConfig`.
    - Provide more info (:py:class:`~ox.core.apps.AppConfig` and  :py:class:`~ox.core.apps.AppMeta`)
    - If specific :doc:`assets <assets>` are required append them. There is no need to declare an `Asset` for the project being built, and default :py:attr:`~ox.core.apps.AppConfig.assets` already provide what you would use.

- views: you'd certainly use only one :py:class:`ox.core.views.base.AppView` subclass, plus Django Rest Framework viewsets.
- setup up a Vite project into ``assets/`` directory. Soon will a tool come that will do the job for us. For the moment, just copy-paste an existing one.
- add application to django's setting ``INSTALLED_APPS``.



AppConfig
---------

The `AppConfig` in Oxylus is responsible of different extra things:

    - specifying application dependencies and metadata: this will later be used in order to create a user interface for installing and creating application.
    - information displayed for the user (icon, root url).
    - assets: provide Vite project built for the client application.

After the application has been created, in ``apps.py``, some changes will be needed. Lets take :py:class:`ox.apps.auth.apps.AppConfig` as an example:


.. code-block:: python


    from ox.core import apps

    from django.utils.translation import gettext_lazy as _


    __all__ = ("AppConfig",)


    class AppConfig(apps.AppConfig):
        # regular attributes existing in Django's AppConfig:
        name = "ox.apps.auth"
        label = "ox_auth"
        verbose_name = _("Users & Groups")

        # Oxylus ones:
        #
        # provide an icon used for the application
        icon = "mdi-account-group-outline"

        # prepend application's urls using this path (default's to ``app.label``).
        path_label = "ox/auth"
        # url name of the application's main page.
        index_urlname = "ox_auth:index"

        class Meta:
            dependencies = ("ox.core",)


There are one attribute hidden here, but inherited from the parent class: :py:attr:`~ox.core.apps.AppConfig.assets`. This is because there is no need for the ``ox.auth`` application of extra dependencies or specific customization. The ``assets/`` directory will be discovered where it should, and required dependencies (including ``ox`` libraries).


Models
------

[TODO]

It is a good practice to avoid exposing objects database identifiers. This avoid security pitfalls as access element exploiting predictive id.

Oxylus provide models with a uuid that can then be used from views and viewsets to access the actual resource. Most of how models are designed are not integrated into the platform as we need to see how will the future come. For the moment however there is no implemented way to access objects by uuid when they come from external applications (such as ``django.contrib.auth``).

For the moment we use the Django's basic permission system. It is however in case studies to use `capability based <http://www.erights.org/elib/capability/ode/ode.pdf>` one when we'll need object permissions (this is already wip in experimental side-project).


Views
-----

In regular django there is a view par use-case (eg. five views for a model's CRUD: list, detail, create, edit, delete). In Oxylus however, things are handled differently: this is the client application which will be responsible to render the equivalent panels for multiple models. It uses API calls in order to update information on the server among other things.

The backend side is then used for two things: rendering the application view and providing API endpoints. It will also handle overriding templates from other Django applications if (most certainly) required.

First will be to create a view, inheriting from :py:class:`ox.core.views.base.AppView`. Here is an example based on a modified version of :py:class:`ox.apps.auth.views.AppView`.

.. code-block:: python


    from django.contrib.auth.mixins import LoginRequiredMixin, PermissionRequiredMixin
    from django.utils.translation import gettext_lazy as _

    from ox.core.views import AppView

    class AppView(PermissionRequiredMixin, LoginRequiredMixin, AppView):
        # we restrict the view to users having thoses permissions
        permission_required = ["auth.view_user", "auth.view_group"]
        # Default panel to display when none is requested by user.
        default_panel = "user-list"

        # For the sake of example: this method is used to provide initial data inside
        # the rendered page. It will be loaded when mounting Vue application.
        def get_app_data(self, **kwargs):
            kwargs.setdefault('foo', 123)
            return super().get_app_data(**kwargs)


ViewSets
........

In order to handle API interaction, Oxylus uses `Django Rest Framework <https://www.django-rest-framework.org/>` in order to ensure this task. Please refer to its documentation.

Oxylus provides :py:class:`ox.core.views.api.ModelViewSet` in order to manipulate objects by uuid among other things.


Panels
......

A client application contains one or more panels, each dedicated to a specific user task. For a CRUD there will be three of them at least: one or more list panels, one to create, one to edit (equivalent to both detail and edit by default). The delete view is not necessary as it is considered as an action; a button appearing in list and edit view.

In Oxylus, there are *detail panel* (whose names are prefixed with ``detail``) and *list panel* (with names prefix ``list.``). Detail panel are linked to an object that exists on the server. User can target a specific panel using the HTTP request's GET parameters ``panel`` (and ``panel_item`` for detail panel).
Other kind of panels are possible as long as they respect the existing conventions.


Application data
................

We can directly provide some data to the client application, as this avoids extra request and we already have fetched elements from the database. This is what Oxylus does when it provides the current user information behind the scene, or the panel to be displayed. The use should be limited, taking into consideration that API may avoids deduplication of concerns and complexity.


Templates
.........

The :py:class:`~ox.core.apps.base.AppView` will add an extra template name to look for by Django: ``[app_config.path_label]/app.html`` (:py:attr:`ox.core.apps.AppConfig.path_label`).

The user provided template should inherit from ``ox/core/app.html``. It will handle loading assets, and rendering the default application layout in which to put the panels' components. There are multiple block that can be overriden, but most important are:

- ``nav-list``: the is the main navigation menu through all the application. It can be extended by overriding the ``ox/core/app.html``, in order to allow the menu item in all application views.
- ``title``: title to display in ``<title>`` and default panel title.
- ``app-main``: this were the client application components are.

Some of thoses are named after the slots of the parent component, which is here ``OxApp``. It is a good practice de keep cohenrency between django blocks and slots names.

Example of ``ox/auth/app.html``:

.. code-block:: jinja

    # extends from the base application template
    {% extends "ox/core/app.html" %}
    # we add comment about: context, blocks (+slots)
    {% comment %}
    Context:
    - user_table_headers: headers of user data table
    {% endcomment %}
    {% load i18n %}

    {% block app-main %}
    # include panels from separate files.
    # `tabbed` is passed down as attribute of the generated panel.
    # keep it when it is used inside `app-main` block.
    {% include "./components/user_panel.html" with tabbed=1 %}
    {% include "./components/group_panel.html" with tabbed=1 %}
    {% endblock %}


Here we include panels from external files. Those actually inherits from ``ox/core/components/model_panel.html``.

In Oxylus, ``components/`` directory is used for components rendered in django templates. Thoses files should provide only code to allow other application to extend de component, as component are basically a client side concept. We also recommend to include components from the ``app.html``, in order to allow their usage at different places and provide clear structure.

Lets take the example of ``contacts`` application: it will extend the ``UserPanel``, providing an additional interface in order to edit the user's related contact information.


Urls
....

Each application provides its urls by the exported ``urls`` and ``api_urls`` lists. It is discovered by Oxylus in order to generate all urls (:py:class:`ox.urls.Router.Discover>`). One attribute is for views; the other for API endpoints.

The urls will be prefixed with application :py:attr:`~ox.core.apps.AppConfig.path_label`
(defaults to :py:attr:`~ox.core.apps.AppConfig.label`), such as they are prefixed with:

- ``{path_label}/``: for views;
- ``api/{path_label}``: for api entry points. They are namespaced under ``{{ app.label }}-api``, such as for example ``ox_core-api:account``;

For example:

.. code-block:: python

    from django.urls import path

    from . import views

    from django.urls import path
    from rest_framework.routers import DefaultRouter

    from . import views

    # Use DRF router to register viewsets and generate routes for us
    router = DefaultRouter()
    router.register(r"group", views.GroupViewSet, basename="group")
    router.register(r"user", views.UserViewSet, basename="user")

    api_urls = router.urls # or: `router.urls + [ ... ]`

    # Regular views url
    urls = [
        # application view as application main page.
        # this is a convention to use "index" as name.
        path("", views.AppView.as_view(), name="index"),
        # optionaly add other views which require to be on a different page
        path("settings/", views.SettingsView.as_view(), name="settings"),
    ]


The generated urls will look like: ``/my_app/``, ``/my_app/settings/``, or ``/api/my_app/group/``.

Assets
------

As they are regular Vite project, client applications can be manually built each using usual workflow. Oxylus however provide command line interface ``django-admin assets`` which is used to build and distribute files over ``static/`` among other things.

Backend application will usually provide a client side counterpart (if none, it will use by default
``ox_core`` one), under ``app_dir/assets/`` directory. Oxylus provide its own assets into the repository root ``assets/``. If some needs, it can use Assets' ``lookup_dirs`` in order to add its own directories.

This would provide a file structure like this

.. code-block:: bash

    my_app /                # django application directory
         assets /
            package.json    # npm package
            vite.conf.js    # vitejs config
            src /           # where the source code is
            ...
         templates /
            my_app /
            ...             # for example overload "ox/core/app.html"
         static /
            my_app /        # built by `django-admin assets -b`
                index.js    # expected generated bundle
                index.css
         ...


When declaring an application using packages, one should inherits from ``api.core.apps.AppConfig`` which integrate default assets such as Vue and Vuetify. If extra dependencies are required, it can extend such as:

.. code-block:: python


    from ox.core import apps
    from ox.core.assets import Assets, Asset

    class MyAppConfig(apps.AppConfig):
        # ....
        assets = Assets(
            apps.ox_lib_assets, # or apps.AppConfig.assets
            # fake example, look at doc of Asset class for specific options
            Asset("lodash", "lodash.prod.js", dev_js="lodash.dev.js")
        )

In order to build the dependencies, you can run ``django-admin assets -bidw`` (**b**: build, **i**: init, **d**: development mode, **w**: watch for changes).

That's it! Internally Oxylus will handle dependencies inclusion into rendered templates.
