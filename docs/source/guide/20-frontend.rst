Client Application
==================

The client application is per Django app. This is in order to reduce load time and memory usage. It means that:

- You can't access from application A to B on UI point of view;
- You still can dynamically load what you need or bundle the other applications' components;
- What is loaded is only your bundled application's views and components;

Oxylus uses the following frameworks: Vue (composition API), Vuetify, Pinia, Pinia-ORM. A client application is a javascript/typescript Vite project.

The basic project structure looks like this:

.. code-block:: bash

    assets /
        package.json       # package information
        tsconfig.js
        vite.config.js     # vite project configuration
        src /              # source
            index.ts       # entry point: creates Vue application
            sfc.ts         # optional entry point: single file components
            models.ts      # pinia-orm models definition
            composables.ts # vue composables
            components /   # vue components
        tests /            # tests
        node_modules /     # created when installing dependencies



The goal of the client application is to provide an interface to the end-user. This raises multiple requirements:

- user interface:

    - this is handled by Vue and Vuetify;
    - integrated into Oxylus framework: this is the ``@oxylus/ox`` libraries;

- manipulate objects from the backend:

    - modelize and handle data: using ``pinia-orm`` based models
    - synchronization with the server through API: (``@pinia-orm/axios`` in conjunction with ``rest_framework`` on the backend)

- quality: tests integration

The Oxylus layer makes this integration, and provides for the assets a set of components and composables.




Setup
-----

Dependencies
............

You'll need at least the ``@oxylus/ox`` npm package that provides all core elements to make it run. Some other: ``@oxylus/mails``, ``@oxylus/tasks``, etc.

Ensure to configure your ``package.json``, ``tsconfig.json`` and ``typedoc.json``.

Regarding, we already provide a  ``vite.config.js`` as template:

.. code-block:: javascript

    import baseConfig from '../ox/src/vite.config.base'

    export default baseConfig


For more customizations, use vite's ``mergeConfig`` method:

.. code-block:: javascript

    import { defineConfig, mergeConfig } from 'vite'
    import baseConfig from '../ox/src/vite.config.base'


    export default mergeConfig(
        baseConfig,
        defineConfig({
            build: {
                rollupOptions: {
                    input: {
                        // example: add an entry point for SFC.
                        sfc: 'src/sfc.ts'
                    }
                }
            },
        })
    )


Models
------

Models are stored in ``models.ts``. We use a custom version on pinia-orm's models.

Please refer to `Pinia ORM's documentation <https://pinia-orm.codedredd.de/>`_ for more info.


In ``assets/src/models.ts``:

.. code-block:: typescript

    import { models } from '@oxylus/ox'


    export class Author extends models.Model {
        static entity = "authors"
        // ...
    }

    export class Book extends models.Model {
        static entity = "books"

        // The junction between Django and Vue/Pinia-ORM
        static meta = new models.Meta({
            app: "my_app",      // Django app name
            model: "book",      // Django model name (as in label)
            url: "my_app/book/",// API entry point to model's viewset
            title: "title"      // Specify a field or func to use as verbose_name
        })

        static fields() {
            id: this.attr(null),       // will be object's uuid
            author: this.string(""),   // uuid to related author
            title: this.string(""),
            summary: this.string(""),
            published: this.string(""),

            $author: this.belongsTo(Author, 'authors') // Related author's object
        }
    }


Providing ``meta`` attributes allows the different utility classes to make the junction with Django, such as get API entry points.



Application Layout
------------------

The client application provide the following layout using ``OxApp`` component. The screenshot is of a model panel (``OxOrganisationTypePanel``, the view is ``list.table``).

.. image:: ../static/layout-000.png


- **A**: top bar, providing quick access and navigation;
- **B**: applications menu (which can be hidden by button [1]);
- **C**: all panels displaying only the current one. A panel can provide multiple views [7];
- **1**: button to show/hide applications menu;
- **2**: panel or view's title and icon;
- **3**: view's actions;
- **4**: panel's views navigation buttons;
- **5**: applications navigation (reflect the structure provided by ``panels.py``);
- **6**: user menu;
- **7**: panel's content or views;


Panels
......

The client interface is composed of multiple panels, one per use-case or model. Panels are provided by applications and can be sub-divised into multiple views. The base component for panels is ``OxPanel``, which is extendable by its slots.
As an example, a common case is to provide CRUD for models, which is what does ``OxModelPanel``: it provides views for listing (with search and filtering facilities), edition and creation.

Panels and nested views are named, and accessible through their path. A panel has a default view falling back to ``list.tables`` when none is provided (it can be configured through component's attribute ``view``).


Here is a simple example of a panel:

.. code-block:: xml

    <ox-panel name="login" :title="Login" :icon="mdi-account">
        <template #append-title>
            <!-- this goes in the top bar at the right -->
        </template>
        <template #default>
            <!-- this goes in the main content -->
            <ox-login/>
        </template>
    </ox-panel>

Another example with a model panel, taken from the ``OxUserPanel`` used for users management. For more detailed usage, please look at the ``OxModelPanel``
documentation.

.. code-block:: xml

    <ox-model-panel :name="props.name" :tabbed="props.tabbed"
            :repo="repos.users"
            :headers="props.headers"
            :relations="props.relations"
            search="search">
        <!-- forward slots to the inner component -->
        <template v-for="name in forwardSlots" :key="name" #[name]="bind">
            <slot :name="name" v-bind="bind"/>
        </template>

        <template #list.filters="{list,filters}">
            <!-- example extending list filters -->
            <v-select class="ml-3" density="compact"
                v-model="filters.groups__id__in" multiple
                label="Groups"
                :items="groups" item-title="$title" item-value="id"
                hide-details />

            <slot name="list.filters" :list="list" :filters="filters"/>
        </template>

        <template #item.groups="{item}" v-if="!slots['item.groups']">
            <!-- list item slot used to display groups -->
             <v-chip color="primary" v-for="group of item.groups" variant="tonal" class="mr-2">
                 {{ group.name }}
             </v-chip>
        </template>

        <template #views.list.kanban="{panel,items,list}">
            <!-- add kanban list view which is not provided by default on OxModelPanel -->
            <ox-list-kanban :items="items" field="groups_id" :headers="kanbanHeaders"
                item-title="username"
                @click="(item) => panel.reset('.edit', item)"/>
        </template>

        <template #views.add="{value,saved}"
               v-if="!slots['views.add'] && context.user.can('auth.add_user')">
            <!-- creation view, displayed only if user has the permission and slots has not already been provided. -->
            <ox-user-edit :initial="value" @saved="saved"/>
        </template>

        <template #views.edit.window.default="{value}"
                v-if="context.user.can('auth.change_user')">
            <!-- edit view -->
            <ox-user-edit :initial="value"/>
        </template>
    </ox-model-panel>

Views
.....

A panel may contains multiple views. In such case, navigation buttons are displayed in the top bar. Views can provide actions shown next to it.

Views are put in a different slot each named as ``views.[name]``. The ``[name]`` will be used as view name (which is used in paths).

``OxModelPanel`` provides default set of actions based on this name, for thoses starting with ``list.`` and ``detail.``. Note that the prefix is included as view name, such as ``list.table`` for slot ``views.list.table``.


Path & Navigation
.................

The ``OxApp`` provide the ``panels`` object (``Panels`` controller), which is used to reset and assign a current value to panels among other things. You can use the method ``show()`` to change current panel.

.. code-block:: typescript

    panels = inject("panels") // get provided panels from component

    // view and value are optional
    panels.show({panel: "my_panel", view: "list.detail", value: "object-uuid"})

    // you should provide href when targetting a panel that is on another page
    panels.show({panel: "my_panel", href: "path_to_app"})


View names are usually composed of two parts joined by a dot: view type (``list``, ``detail``) and the actual name. Such as you'll have ``detail.edit``, ``list.table``, ``list.kanban``, etc.


Interface integration
.....................

Panel and view title and navigations will be rendered in the top bar. A view can also provide extra actions and buttons there, such as showing
list filters. Note: filters are available for all list views, while the list itself is handled by the model panel component.

Panels can have a provided state which will be rendered when required (such as processing API request, or error display).


Actions
-------

Actions are buttons that can execute a specific behaviour. It checks user's permission in order to execute, and can display in two different ways: as select list item, or as a button.

[TODO] Where to put actions & extensibility

Monorepo setup
--------------
