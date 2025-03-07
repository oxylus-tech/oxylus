import { unref, watch } from 'vue'
import {useI18n as $useI18n, createI18n as $createI18n} from 'vue-i18n'
import type { Composer } from 'vue-i18n'
import type { Model } from 'pinia-orm'

import config from '../config'
import {getCookieList} from '../utils'


/**
 * Initialize vue-i18n, looking in cookies in order to load the right locale.
 */
export function createI18n() {
    // remove country specific locale as they are not provided by locales
    // client side
    const candidates = (getCookieList("lang", ",") || ["en"]).map(
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
 * Main vue-i18n instance used by Oxylus application.
 */
export const i18n = createI18n()


/**
 * Shortcut to {@link i18n} `t()` function.
 */
export function t(...args: any): string {
    return i18n.global.t(...args)
}


/**
 * Set locale (load it if required).
 */
export function setLocale(i18n: Composer, path: string, locale: string) {
    if(!(locale in config.locales))
        throw Error("Locale is not provided by config.")

    i18n.global.locale.value = locale
    loadLocaleFrom(i18n, path, locale)

    // FIXME: axios.defaults.headers.common['Accept-Language'] support?

    document.querySelector('html').setAttribute('lang', locale)
}

/**
 * Keeps track of already loaded locales (by path)
 */
export const loadedLocalePaths = new Set()


export interface IUseI18n {
    path?: string,
    fallback?: boolean,
}

/**
 * This composable return vue-i18n's `t()` function and watch for
 * locale change in order to dynamically load corresponding message file.
 *
 * @param {String} [options.path] parent path of locales' dir.
 * @param {Boolean} [options.fallback] if true, use fallback locale
 * @param [options.opts] passed down to vue-i18n's ``useI18n``.
 * @return ``t()`` function.
 */
export function useI18n({path="./", fallback=true, ...opts}: IUseI18n={}) {
    const i18n = $useI18n(opts)
    loadLocale(i18n, {path, fallback})
    watch(() => i18n.locale, () => loadLocale(i18n, {path, fallback}))
    return i18n
}


/**
 * Load locale of specific name and add it to composer's messages.
 */
async function loadLocaleFrom(i18n: Composer, path: string, locale: string) {
    const locale2 = locale.replace(/[_-](\w+)/, '')
    path = `${path}locales/${locale2}.json`
    if(loadedLocalePaths.has(path))
        return

    loadedLocalePaths.add(path)

    const messages = await fetch(path).then(r => r.json())
    // we don't use setLocaleMessage, because we merge locales
    // from different apps
    i18n.messages.value[locale] = {
        ...i18n.messages.value[locale],
        ...messages
    }
}


/**
 * Load locale using provided path and i18n locale composer.
 *
 * @param i18n - vue-i18n locale Composer;
 * @param [options.path] path to parent directory of locale dir;
 * @param [options.fallback] if True, use fallback locale whenever required.
 */
function loadLocale(i18n: Composer, {path="./", fallback=true}={}): Promise<void> {
    if(!path.startsWith('/'))
        path = import.meta.resolve(path)
    if(!path.endsWith('/'))
        path += '/'

    let promise = loadLocaleFrom(i18n, path, unref(i18n.locale))
    if(fallback && i18n.fallbackLocale.value)
        promise = promise.catch((error) => loadLocaleFrom(i18n, path, unref(i18n.fallbackLocale) as string))
            .catch((error) => {
                throw Error(
                    `Could not load locale ${i18n.locale.value} nor its fallback ${i18n.fallbackLocale.value} (path: ${path}). Error: ${error}`
                )
            })
    return promise
}


export const tKeys = {
    model: (model: typeof Model) => `models.${model.entity}`,
    field: (field: string) => `fields.${field}`
}
