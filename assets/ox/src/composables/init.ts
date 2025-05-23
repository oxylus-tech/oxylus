import { createApp as $createApp, reactive, watch } from 'vue'
import { createVuetify as $createVuetify } from 'vuetify'
import { md3 } from 'vuetify/blueprints'
import colors from 'vuetify/util/colors'

import { createPinia as $createPinia, setActivePinia } from 'pinia'
import { createORM } from 'pinia-orm'
import { createPiniaOrmAxios } from '@pinia-orm/axios'
import axios from 'axios'

import '../styles/index.scss'
import * as vendorComponents from 'ox/vendor'
import config from '../config'
import {i18n, useI18n} from './i18n'

import type {IObject} from '../utils'


/**
 * {@link createVuetify} parameters. Theses are passed down to Vuetify's
 * plugin initialization.
 */
export interface ICreateVuetifyOpts extends IObject {
    components?: Record<string,any>
}


/**
 * Options passed to {@link createApp}.
 */
export interface ICreateAppOpts {
    /**
     * Vue's `createApp` `props` arguments
     */
    props?: IObject
    /**
     *  Vuetify plugin's parameters (passed to {@link createVuetify})
     */
    vuetify?: ICreateVuetifyOpts
    /**
     * Plugins to add to Vue application.
     */
    plugins?: IObject[]
}

export interface IInitOpts extends ICreateAppOpts {
    /** Vue's App config. */
    App?: IObject
    /** Element selector to mount application on. */
    el?: string
    /**
     * If True (default), defer application creation after page has been
     * loaded (on `window.load` event)
     */
    onLoad?: boolean
}


/**
 * Main entry point to initialize and mount an application.
 *
 * The base `App` config is provided by `ox/components` modules.
 */
export function init({App=null, el='#app', onLoad=true, ...options}: IInitOpts={}) {
    function initApp() {
        const app = createApp(App, options)
        const vm = el ? app.mount(el) : null
        document.body.classList.remove('loading')
        return {app, el, vm}
    }

    return new Promise((resolve) => {
        if(onLoad)
            return window.addEventListener(
                'load', () => resolve(initApp())
            )
        resolve(initApp())
    })
}


/**
 * Create Oxerp application (including Vuetify).
 * It also provide app's global property `window` in order to allow components
 * access to this object.
 */
export function createApp(app: IObject, {props={}, vuetify={}, plugins=null}: ICreateAppOpts={}) {
    app = $createApp(app, props)
    app.config.globalProperties.window = window

    app.use(createVuetify(vuetify))
    app.use(i18n)
    useI18n()

    plugins && plugins.forEach(plugin => app.use(plugin))
    return app
}



/**
 * Create and return vuetify plugin with default components set.
 * This is called by `createApp`.
 */
export function createVuetify({components={}, defaults={}, ...opts}: ICreateVuetifyOpts) {
    opts.components = {
        ...vendorComponents,
        ...components
    }
    return $createVuetify({
        blueprint: md3,
        theme: {
            themes: {
                light: {
                    dark: false,
                    colors: {
                        primary: colors.green.darken1,
                        secondary: colors.green.lighten4
                    }
                }
            }
        },
        defaults: {
            ...defaults,
            VTextField: { variant: 'underlined', },
            VSelect: { variant: 'underlined', },
            VTextarea: { variant: 'underlined', },
            VCombobox: { variant: 'underlined', },
            VAutocomplete: { variant: 'underlined', },
        },
        ...opts
    })
}



/**
 * Create Pinia and PiniaOrm plugins instances.
 * If no `baseURL` is provided, get it from `document.body.dataset.apiUrl`.
 */
export function createPinia({axiosConfig=null, baseURL=null}: IObject={}) {
    if(!baseURL)
        baseURL = document.body.dataset.apiUrl

    const pinia = $createPinia()
    const piniaOrm = createORM({
        plugins: [
            createPiniaOrmAxios({
                axios,
                ...(axiosConfig || config.axiosConfig),
                baseURL,
            })
        ]
    })
    setActivePinia(pinia)
    return pinia.use(piniaOrm)
}
