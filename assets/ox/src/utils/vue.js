import { inject, provide, reactive as $reactive } from 'vue';
/**
 * For the provided slots, return a dict of `{slot: name}` for slots
 * starting with prefix.
 *
 * @param [slots] slots as an object of `{slotName: slotFunction}`
 * @param [exclude] slot name to exclude
 * @return an object whose keys are slot full name, and value slot name without prefix.
 */
export function filterSlots(slots, prefix, { exclude = null } = {}) {
    const dest = {};
    let names = Object.keys(slots).filter((k) => k.startsWith(prefix));
    if (exclude)
        names = Array.isArray(exclude)
            ? names.filter(k => !exclude.includes(k))
            : names.filter(exclude);
    return names.reduce((d, k) => { d[k] = k.replace(prefix, ''); return d; }, dest);
}
/**
 * Get injected value, `provide()` one if none is found.
 *
 * @return the injected value or the new provided one.
 */
export function injectOrProvide(key, factory) {
    let value = inject(key);
    if (value === undefined) {
        value = factory();
        provide(key, value);
    }
    return value;
}
