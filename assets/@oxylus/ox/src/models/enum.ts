import { t } from '../composables/i18n'


/**
 * Return string label for the provided enum.
 */
function toString(prefix: string, prop: string) {
    let key = `enums.${prefix}.${prop}`
    let val = t(key)
    if(val != key)
        return val

    return t(`enums.${prefix}._.${prop}`)
}

export interface IEnum extends Record<string, any> {
    __prefix: string
}


/**
 * Provide an enum and utilities for rendering enum in a list.
 * See {@link Enum} function for more informations.
 */
export const enumProxy = {
    get(target: Record<string, any>, prop: string, receiver: IEnum) {
        if(prop == "items")
            return Object.keys(target).filter(k => k[0] != '_').map(k => ({
                value: target[k],
                title: toString(target.__prefix, k)
            }))
        if(prop == "toString")
            return (k: string) => toString(receiver.__prefix, k)
        return Reflect.get(target, prop, receiver)
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
