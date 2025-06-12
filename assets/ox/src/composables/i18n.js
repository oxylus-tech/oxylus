import { unref, watch } from 'vue';
import { useI18n as $useI18n, createI18n as $createI18n } from 'vue-i18n';
import config from '../config';
import { getCookieList } from '../utils';
/**
 * Initialize vue-i18n, looking in cookies in order to load the right locale.
 */
export function createI18n() {
    // remove country specific locale as they are not provided by locales
    // client side
    const candidates = (getCookieList("lang", ",") || navigator.languages || ["en"]).map(x => x.toLowerCase().replace(/[_-](\w+)/, ""));
    const locale = candidates.find(x => x in config.locales);
    return $createI18n({
        legacy: false,
        globalInjection: true,
        fallbackLocale: 'en',
        locale
    });
}
/**
 * Main vue-i18n instance used by Oxylus application.
 */
export const i18n = createI18n();
/**
 * Shortcut to {@link i18n} `t()` function.
 */
export const t = i18n.global.t;
/**
 * This composable return vue-i18n's `t()` function and watch for
 * locale change in order to dynamically load corresponding message file.
 *
 * @param {String} [options.path] parent path of locales' dir.
 * @param {Boolean} [options.fallback] if true, use fallback locale
 * @return ``t()`` function.
 */
export function useI18n({ path = "./", fallback = true, composer = null } = {}) {
    composer ??= i18n.global;
    loadLocale({ composer, path, fallback });
    watch(() => composer.locale, () => loadLocale({ composer, path, fallback }));
    return composer;
}
/**
 * Set locale (load it if required).
 * FIXME
 */
export function setLocale(i18n, path, locale) {
    if (!(locale in config.locales))
        throw Error("Locale is not provided by config.");
    i18n.global.locale.value = locale;
    loadLocaleFrom(i18n, path, locale);
    // FIXME: axios.defaults.headers.common['Accept-Language'] support?
    document.querySelector('html').setAttribute('lang', locale);
}
/**
 * Keeps track of already loaded locales (by path)
 */
export const loadedLocalePaths = new Set();
/**
 * Load locale using provided path and i18n locale composer.
 *
 * @param i18n - vue-i18n locale Composer;
 * @param [options.path] path to parent directory of locale dir;
 * @param [options.fallback] if True, use fallback locale whenever required.
 */
function loadLocale({ path = "./", fallback = true, composer = null } = {}) {
    composer ??= i18n.global;
    if (!path.startsWith('/'))
        path = import.meta.resolve(path);
    if (!path.endsWith('/'))
        path += '/';
    let promise = loadLocaleFrom(composer, path, unref(composer.locale));
    if (fallback && composer.fallbackLocale.value)
        promise = promise.catch((error) => loadLocaleFrom(composer, path, unref(composer.fallbackLocale)))
            .catch((error) => {
            throw Error(`Could not load locale ${composer.locale.value} nor its fallback ${composer.fallbackLocale.value} (path: ${path}). Error: ${error}`);
        });
    return promise;
}
/**
 * Load locale of specific name and add it to composer's messages.
 */
async function loadLocaleFrom(i18n, path, locale) {
    const locale2 = locale.replace(/[_-](\w+)/, '');
    path = `${path}locales/${locale2}.json`;
    if (loadedLocalePaths.has(path))
        return;
    loadedLocalePaths.add(path);
    const messages = await fetch(path).then(r => r.json());
    // we don't use setLocaleMessage, because we merge locales
    // from different apps
    i18n.messages.value[locale] = {
        ...i18n.messages.value[locale],
        ...messages
    };
}
export const tKeys = {
    model: (model) => `models.${model.entity}`,
    field: (field) => `fields.${field}`
};
