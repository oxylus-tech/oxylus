import type { I18n } from 'vue-i18n'

// Promise cache to deduplicate concurrent loads
const loadPromises = new Map<string, Promise<void>>()


/** An async function to load a locale. **/
export type LocaleLoader = () => Promise<any>
/** Locale loaders as result of `import.meta.glob`, an object of promises functions */
export type AppLocaleLoaders = Record<string, () => Promise<any>>
/** Locale loaders by package name */
export type LocaleLoaders = Record<string, AppLocaleLoaders>


/**
 * Load locales from multiple apps locale loaders.
 */
export async function loadLocales(i18n: I18n, locale: string, fallback: string, loaders: LocaleLoaders): Any {
    const promises = Object.entries(loaders).map(
        ([app, _loaders]) => loadLocaleFromLoaders(i18n, locale, fallback, app, _loaders)
    )
    return await Promise.all(promises)
}


/**
 * Load a locales from an app loaders.
 */
export async function loadLocaleFromLoaders(i18n: I18n, locale: string, fallback: string, app: string, loaders: AppLocaleLoaders) {
    const promises = []

    const locale_key = `.${locale}.json`
    const fallback_key = `.${fallback}.json`
    for(var [key, loader] of Object.entries(loaders)) {
        if(key.endsWith(locale_key))
            promises.push(
                loadFromLoader(i18n, locale, app, key, loader)
            )
        else if(key.endsWith(fallback_key))
            promises.push(
                loadFromLoader(i18n, fallback, app, key, loader)
            )
    }

    return await Promise.all(promises)
}


/** Load locale from a single locale loader. */
export function loadFromLoader(i18n: I18n, locale: string, app: string, key: string, loader: string): Promise<void> {
    key = `${app}:${locale}:${key}`

    // TODO: app namespacing
    if(loadPromises.has(key))
        return loadPromises.get(key)

    const promise = (async () => {
        const messages: any | null = await loader()
        if(messages)
            i18n.global.mergeLocaleMessage(locale, messages)
    })()
    loadPromises[key] = promise
    return promise
}


/**
 * Load a single locale file from static loader or remote URL
 * Uses a cache to avoid duplicate fetches
 */
export async function loadOne(
    i18n: I18n,
    url: string,
    locale: string,
) {
    const key = `:${locale}:${path}`

    // Return cached promise if already loading or loaded
    if (loadPromises.has(key)) {
        return loadPromises.get(key)!
    }

    let messages: any | null = null

    try {
        const res = await fetch(url)
        if (res.ok) {
            messages = await res.json()
        }
    } catch (e) {
        console.warn('Failed to load i18n file', url, e)
    }

    if (messages) {
        i18n.global.mergeLocaleMessage(locale, messages)
    }

    loadPromises.set(key, promise)
}
