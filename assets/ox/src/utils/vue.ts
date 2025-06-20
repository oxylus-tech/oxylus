import {inject, provide, reactive as $reactive} from 'vue'


export interface IFilterSlotOpts {
    exclude?: string[] | ((name: string) => bool)
}

export type IRFitlerSlot = {[k: string]: string}


// TODO: prefix in options
/**
 * For the provided slots, return a dict of `{slot: name}` for slots
 * starting with prefix.
 *
 * @param slots - slots as an object of `{slotName: slotFunction}`
 * @param prefix - filter slots with this prefix
 * @param options.exclude - slot name to exclude
 * @return an object whose keys are slot full name, and value slot name without prefix (when prefix is provided) or just a list of slot names.
 */
export function filterSlots(slots: {[k: string]: Function}, prefix?: string, {exclude=null}: IFilterSlotOpts={}): IRFitlerSlot|string[] {
    const dest : IRFitlerSlot = {}
    let names = Object.keys(slots)
    if(prefix)
        names = names.filter((k) => k.startsWith(prefix))
    if(exclude)
        names = Array.isArray(exclude)
            ? names.filter(k => !exclude.includes(k))
            : names.filter(exclude)

    if(prefix)
        return names.reduce((d, k) => { d[k] = k.replace(prefix, ''); return d }, dest)
    return names
}


/**
 * Get injected value, `provide()` one if none is found.
 *
 * @return the injected value or the new provided one.
 */
export function injectOrProvide<T>(key: string, factory: () => T): any {
    let value = inject(key)
    if(value === undefined) {
        value = factory()
        provide(key, value)
    }
    return value
}
