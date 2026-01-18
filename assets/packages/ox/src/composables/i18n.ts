import { unref, watch } from 'vue'
import {useI18n as $useI18n, createI18n as $createI18n} from 'vue-i18n'
import type { Composer } from 'vue-i18n'
import { Repository as $Repository } from 'pinia-orm'

import config from '../config'
import { Model, type ModelType, Repository } from '../models'
import {getCookieList} from '../utils'
import { type AppLocaleLoaders, loadLocales} from '../i18n'


export type I18nMessages = Record<string, string|I18nMessages>
export type I18nLocaleMessages = Record<string, I18nMessages>


/**
 * Common locales for the app to load.
 *
 * It is the result of `import.meta.glob` under app key (common is `ox`), as:
 * `{ "app_key": { "file": importMethod }}`. Where:
 * - `app_key`: the corresponding Oxylud application label;
 * - `file`: the name of the locale file;
 * - `importMethod`: the async method used to load file content;
 *
 * It is assumed that locales are stored under `src/locale` directory, where file are
 * suffixed with `[LANG].json` (as `vue.en.json` or `en.json`).
 */
export const locales: AppLocaleLoaders = {
    ox: import.meta.glob('../locale/*.json', { import: 'default' })
}


/**
 * Initialize vue-i18n, looking in cookies in order to load the right locale.
 */
export function createI18n() {
    // remove country specific locale as they are not provided by locales
    // client side
    const candidates = (getCookieList("lang", ",") || navigator.languages || ["en"]).map(
        x => x.toLowerCase().replace(/[_-](\w+)/, "")
    )
    // FIXME i18n.ts => use app data?
    const locale = candidates.find(x => x in config.locales)

    return $createI18n({
        legacy: false,
        globalInjection: true,
        fallbackLocale: 'en',
        locale
    })
}


/**
 * Load locales from i18n <script> if not already loaded.
 *
 * The script must have type `applicatino/i18n`.
 */
export async function loadI18nScripts({composer=null}={}): Promise<void> {
    const elements = document.querySelectorAll("script[locale]:not([data-loaded])")

    composer ??= i18n.global
    const promises = [...elements].map(async el => {
        const locale = el.getAttribute('locale')
        if(locale != composer.locale.value && locale != composer.fallbackLocale.value) {
            console.warn(`Locale ${locale} is not the current one, nor the fallback. skip`)
            return
        }

        const url = el.getAttribute('src')
        if(!url) {
            console.warn('No `src` attribute provided on element - skip. Element: ', el)
            return
        }

        const resp = await fetch(url)
        try {
            const data = await resp.json()
            composer.mergeLocaleMessage(locale, data)
        }
        catch(err) {
            el.dataset["loaded"] = "error"
            throw err
        }
        el.dataset["loaded"] = "ok"
    })

    await Promise.all(promises)
}


/**
 * Main vue-i18n instance used by Oxylus application.
 */
export const i18n = createI18n()


export type TKeyable = string|ModelType|Repository|[ModelType|Repository, string]

/**
 * Return resolved translation key based on provided input.
 *
 * The input can be:
 * - a regular string: this is returned as is
 * - a repository instance: it resolves model translation key
 * - a model class: it resolve model translation key;
 * - `[ModelClass, "postfix"]`: it resolves model translation key
 */
export function tKey(value: TKeyable): string {
    if(value instanceof $Repository)
        value = value.use
    if(value?.prototype instanceof Model)
        return `${value.meta.app}.${value.meta.model}`
    if(Array.isArray(value))
        return tKey(value[0]) + (value[1] ? `.${value[1]}` : '')
    return value || ""
}

/**
 * Return translation equivalent to {@link i18n} `t()` function.
 *
 * See {@link tKey} for the `key` argument values.
 */
export function t(key: string, ...args) : string {
    return i18n.global.t(tKey(key), ...args)
}

/**
 * Return translation equivalent to {@link i18n} `t()` function.
 *
 * See {@link tKey} for the `key` argument values.
 */
export function te(key: string, ...args) : string {
    return i18n.global.te(tKey(key), ...args)
}

export interface IUseI18nOpts {
    loaders?: AppLocaleLoaders,
    composer?: Composer
}

export interface IUseI18n {
    i18n: I18n,
    t: (key: TKeyable, ...opts) => string,
    te: (key: TKeyable, ...opts) => string,
    setLocale: (locale: string) => void,
}


/**
 * Use I18n locales ensuring they are initialized.
 */
export function useI18n({locales, composer}: IUseI18nOpts): IUseI18n {
    composer ??= i18n.global

    if(locales) {
        loadLocales(i18n, composer.locale.value, composer.fallbackLocale.value, locales)
        watch(composer.locale, (locale: string) => {
            loadLocales(i18n, locale, composer.fallbackLocale.value, locales)
        })
    }

    function setLocale(locale: string) {
        composer.locale.value = locale
    }
    return {t, te, i18n, setLocale}
}


/**
 * This composable return vue-i18n's `t()` function and watch for
 * locale change in order to dynamically load corresponding message file.
 *
 * @param {String} [options.path] parent path of locales' dir.
 * @param {Boolean} [options.fallback] if true, use fallback locale
 * @return ``t()`` function.
 */
/*
export function useI18n({path="./", fallback=true, composer=null}: IUseI18n={}) {
    // Note: composer.messages is a computed value that return the value of
    // an internal Ref _messages. We directly change this inner object here.
    // This maybe has to change in the future if it is found to be buggy.
    composer ??= i18n.global

    const _messages: I18nLocaleMessages = composer.messages.value
    _messages[composer.locale.value] = window.__i18n_messages as I18nMessages

    watch(composer.locale, (locale: string) => {
        _messages[locale] = (window.__i18n_messages as I18nMessages)
    })
    return composer
}

export const tKeys = {
    model: (model: typeof Model) => `models.${model.meta.model}`,
    field: (field: string) => `fields.${field}`
}
*/
