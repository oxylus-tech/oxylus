import { unref, watch } from 'vue'
import {useI18n as $useI18n} from 'vue-i18n'
import type { Composer } from 'vue-i18n'

import config from '../config'


export function setLocale(i18n: Composer, path: string, locale: string) {
    if(!(locale in config.locales))
        throw Error("Locale is not provided by config.")

    i18n.global.locale.value = locale
    loadLocaleFrom(i18n, path, locale)

    // FIXME: axios.defaults.headers.common['Accept-Language'] support?

    document.querySelector('html').setAttribute('lang', locale)
}

// keeps track of already loaded locales
export const loadedLocalePaths = new Set()


export async function loadLocaleFrom(i18n: Composer, path: string, locale: string) {
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


export function loadLocale(i18n: Composer, {path="./", fallback=true}={}): Promise<void> {
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


export function useI18n({path="./", fallback=true, ...opts}={}) {
    const i18n = $useI18n(opts)
    loadLocale(i18n, {path, fallback})
    watch(() => i18n.locale, () => loadLocale(i18n, {path, fallback}))
    return i18n
}
