import { createApp as $createApp, reactive, watch } from 'vue'
import { createVuetify as $createVuetify } from 'vuetify'
import { md3 } from 'vuetify/blueprints'
import colors from 'vuetify/util/colors'

import { createPinia as $createPinia, setActivePinia } from 'pinia'
import { createORM } from 'pinia-orm'
import { createPiniaOrmAxios } from '@pinia-orm/axios'
import axios from 'axios'

import '../styles/index.scss'
import * as vendorComponents from '@oxylus/ox/vendor'
import config from '../config'
import {i18n, useI18n, loadI18nScripts} from './i18n'
import type AppLocaleLoaders from '../i18n'
import {registerHumanizeDirectives} from '../directives/humanize'


/**
 * {@link createVuetify} parameters. Theses are passed down to Vuetify's
 * plugin initialization.
 */
export interface ICreateVuetifyOpts extends Record<string, any> {
    components?: Record<string,any>
}


/**
 * Options passed to {@link createApp}.
 */
export interface ICreateAppOpts {
    /**
     * Vue's `createApp` `props` arguments
     */
    props?: Record<string, any>
    /**
     *  Vuetify plugin's parameters (passed to {@link createVuetify})
     */
    vuetify?: ICreateVuetifyOpts
    /**
     * Plugins to add to Vue application.
     */
    plugins?: Record<string, any>[]
    /** Locale loaders (see {@link locales}). */
    locales: LocaleLoaders,
}

export interface IInitOpts extends ICreateAppOpts {
    /** Vue's App config. */
    App?: any
    /** Element selector to mount application on. */
    el?: string
    /**
     * If True (default), defer application creation after page has been
     * loaded (on `window.load` event)
     */
    onLoad?: boolean
}


/**
 * Update application loading state. Either it is a string, either a boolean
 * indicating wheter app is loaded or none.
 *
 * When it is a string, lookup for children with `data-state` attribute. Those
 * matching the provided key will be displayed (`display: flex`), other hidden
 * (`display: none`).
 *
 * When it is a boolean, display loading overlay on `false` (not ready) and display
 * elements for state `start`. Otherwise (ready), hide the overlay.
 *
 * Overlay display is controller using body `loading` class.
 */
function setLoadState(key: string|boolean) {
    switch(key) {
        case false:
            document.body.classList.add('loading')
            setLoadState('start')
            break;
        case true:
            document.body.classList.remove('loading')
            break;
        default:
            const el = document.getElementById('loading-overlay')
            el.dataset.state = key

            const labels = el.querySelectorAll('*[data-state]')
            for(const label of labels)
                label.style.display = label.dataset.state == key ? 'block' : 'none'
    }
}


/**
 * Main entry point to initialize and mount an application.
 *
 * The base `App` config is provided by `ox/components` modules.
 */
export function init({App=null, el='#app', onLoad=true, ...options}: IInitOpts={}) {
    async function initApp() {
        const app = await createApp(App, options)
        const vm = el ? app.mount(el) : null
        setLoadState(true)
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
export async function createApp(app: Record<string, any>, {props={}, vuetify={}, plugins=null, locales}: ICreateAppOpts={}) {
    setLoadState('create-app')
    app = $createApp(app, props)
    app.config.globalProperties.window = window
    app.config.globalProperties.$oxylus = window.oxylus

    app.use(createVuetify(vuetify))
    app.use(i18n)

    registerHumanizeDirectives(app)

    setLoadState('i18n')
    await loadI18nScripts()
    await useI18n({locales})

    setLoadState('plugins')
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
            VTextarea: { variant: 'outlined', },
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
export function createPinia({axiosConfig=null, baseURL=null}: Record<string, any>={}) {
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
