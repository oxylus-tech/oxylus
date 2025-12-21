import { unref, watch } from 'vue'
import {useI18n as $useI18n, createI18n as $createI18n} from 'vue-i18n'
import type { Composer } from 'vue-i18n'

import config from '../config'
import type { Model } from '../models'
import {getCookieList} from '../utils'


export type I18nMessages = Record<string, string>
export type I18nLocaleMessages = Record<string, I18nMessages>

declare global {
    interface Window {
        __i18n_messages: I18nMessages
    }
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
    const locale = candidates.find(x => x in config.locales)


    return $createI18n({
        legacy: false,
        globalInjection: true,
        fallbackLocale: 'en',
        locale
    })
}


export function loadI18nScripts({composer=null}=null) {
    const elements = document.querySelectorAll("script[type='application/i18n']:not([data-loaded])")
    composer ??= i18n.global

    const allMessages: I18nLocaleMessages = composer.messages.value
    allMessages[composer.locale.value] ??= {}

    const messages = all[composer.locale.value]
    elements.forEach((el) => {
        const data = JSON.loads(el.innerText)
        Object.assign(messages, data)
        el.dataset["loaded"] = "1"
    })
}


/**
 * Main vue-i18n instance used by Oxylus application.
 */
export const i18n = createI18n()


/** Shortcut to {@link i18n} `t()` function. */
export const t = i18n.global.t
/** Shortcut to {@link i18n} `te()` function. */
export const te = i18n.global.te

export interface IUseI18n {
    composer?: Composer,
    path?: string,
    fallback?: boolean,
}

/**
 * This composable return vue-i18n's `t()` function and watch for
 * locale change in order to dynamically load corresponding message file.
 *
 * @param {String} [options.path] parent path of locales' dir.
 * @param {Boolean} [options.fallback] if true, use fallback locale
 * @return ``t()`` function.
 */
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
