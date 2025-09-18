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


/**
 * Main vue-i18n instance used by Oxylus application.
 */
export const i18n = createI18n()


/**
 * Shortcut to {@link i18n} `t()` function.
 */
export const t = i18n.global.t
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
    composer ??= i18n.global
    composer.messages.value[composer.locale.value] = window.__i18n_messages
    watch(composer.locale, (locale) => {
        composer.messages.value[locale] = window.__i18n_messages
    })
    return composer
}

export const tKeys = {
    model: (model: typeof Model) => `models.${model.meta.model}`,
    field: (field: string) => `fields.${field}`
}
