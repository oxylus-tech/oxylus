How to...?
==========

Provide or use custom settings
------------------------------

When installed, an application can not provide by itself custom settings. This is due to security and consistence considerations. Only the admin user can provide custom django settings.

For dynamic user or system settings, use a model class + regular panel/view. The view can be added to user's settings. [TODO].

However, the application can use the :py:class:`ox.utils.conf.Settings`.

It allows to declare custom application settings, being nested under a specific namespace. This also ease documentation, by provided docsting to the actual settings.


Example in ``my_app.conf``:

.. code-block:: python

    from ox.utils import conf

    __all__ = ("MyAppSettings", "app_settings")

    # This is how you declare your settings with default values:
    class MyAppSettings(conf.Settings):
        ALLOWED_TAGS = ["a", "b", "br"]
        """ Allowed tags in user's content. """

        SOME_VALUE = 123
        """ Other documented settings. """

    # This is the actual instance used to retrieve settings
    # Values will be read from settings.MY_APP object
    app_settings = MyAppSettings("MY_APP")

    # To use it:
    # print(app_settings.ALLOWED_TAGS)


SFC / single file components and async loading
----------------------------------------------

In your ``vite.config.js``, add an entry point for SFC:

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

In your ``src/sfc.ts``, add components that can be loaded using asyncComponent:

.. code-block:: typescript

    // Import your components here.
    // Each file will be compiled in dist separately
    import('./components/OxFileSelect.vue')

Using the component:

.. code-block:: xml

    <!-- Using `ox-component` from `@oxylus/ox/components` -->
    <v-dialog v-model="showSelect" height="80%" scrollable>
        <ox-component src="../ox_files/OxFileSelect.js"
            :owner="props.owner" multiple
            @select="onSelect"
            @close="showSelect = false"/>
    </v-dialog>
