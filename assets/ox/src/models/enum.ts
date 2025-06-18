import { t } from '../composables/i18n'

function toString(prefix: string, prop: string) {
    return t(`enums.${prefix}.${prop}`)
}

/**
 * Provide an enum and utilities for rendering enum in a list.
 */
export const enumProxy = {
    get(target: Record<string, any>, prop: string, receiver) {
        if(prop == "items")
            return Object.keys(target).filter(k => k[0] != '_').map(k => ({
                value: target[k],
                title: toString(target.__prefix, k)
            }))
        if(prop == "toString")
            return (k) => toString(receiver.__prefix, k)
        return Reflect.get(...arguments)
    },

}

/**
 * Create a new enum using provided field values.
 *
 * This returns a Proxy that provides the following:
 *
 * - `toString(field: string)`: return translated string for the provided field name
 * - `items`: a list of enumerated values to be used by `v-select` (with `title` and `value`).
 *
 * @param prefix - prefix used in translation, as `enums.{prefix}.{props}`.
 * @param fields - enum fields and values
 */
export function Enum(prefix: string, fields: Record<string, any>) {
    fields.__prefix = prefix
    return new Proxy(fields, enumProxy)
}
