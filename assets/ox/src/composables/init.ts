import { createApp as $createApp, reactive, watch } from 'vue'
import { createI18n as $createI18n } from 'vue-i18n'
import { createVuetify as $createVuetify } from 'vuetify'
import { md3 } from 'vuetify/blueprints'

import { createPinia as $createPinia, setActivePinia } from 'pinia'
import { createORM } from 'pinia-orm'
import { createPiniaOrmAxios } from '@pinia-orm/axios'
import axios from 'axios'

import '../styles/index.scss'
import * as vuetifyComponents from '../components/vuetify'
import config from '../config'
import {getCookie} from '../utils'


/**
 * Main entry point to initialize and mount an application.
 */
export function init({App=null, el='#app', ...options}={}, onLoad=true) {
    function initApp() {
        const app = createApp(App, options)
        const vm = el ? app.mount(el) : null

        // setGlobals && setOxerpGlobals({app, vm})
        document.body.classList.remove('loading')
        return {app, el, vm}
    }

    // return window.addEventListener(
    //    'load', () => initApp()
    //)
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
export function createApp(app, {props={}, vuetify={}, plugins=null}={}) {
    app = $createApp(app, props)
    app.config.globalProperties.window = window

    app.use(createVuetify(vuetify))
    app.use(createI18n())
    plugins && plugins.forEach(plugin => app.use(plugin))
    return app
}


export function createI18n() {
    // remove country specific locale as they are not provided by locales
    // client side
    const candidates = (getCookie("lang", ",") || ["en"]).map(
        x => x.toLowerCase().replace(/[_-](\w+)/, "")
    )
    const locale = candidates.find(x => x in config.locales)
    return $createI18n({
        legacy: false,
        fallbackLocale: 'en',
        locale
    })
}


/**
 * Create and return vuetify plugin with default components set.
 * This is called by `createApp`.
 */
export function createVuetify({components={}, ...opts}) {
    opts.components = {
        ...vuetifyComponents,
        ...components
    }
    return $createVuetify({
        blueprint: md3,
        theme: {},
        ...opts
    })
}



/**
 * Create Pinia and PiniaOrm plugins instances.
 * If no `baseURL` is provided, get it from `document.body.dataset.apiUrl`.
 */
export function createPinia({axiosConfig=null, baseURL=null}={}) {
    if(!baseURL)
        baseURL = document.body.dataset.apiUrl

    const pinia = $createPinia()
    const piniaOrm = createORM({})
    // temp workaround: createORM does not keep provided plugins
    // using {plugins: ...} later
    piniaOrm().use(
        createPiniaOrmAxios({
            axios,
            ...(axiosConfig || config.axiosConfig),
            baseURL,
        })
    )
    setActivePinia(pinia)
    return pinia.use(piniaOrm)
}
