import {isRef} from 'vue'


export interface IFilterSlotOpts {
    exclude?: string | string[] | ((name: string) => boolean)
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
        names = Array.isArray(exclude) ? names.filter(k => !exclude.includes(k))
            : typeof(exclude) == "string" ? names.filter(k => k != exclude)
            : names.filter(exclude)

    if(prefix)
        return names.reduce((d, k) => { d[k] = k.replace(prefix, ''); return d }, dest)
    return names
}


export function exposeRefs<T extends Record<string, any>>(source: T) {
    const target: Record<string, any> = {}

    for(const key in source) {
        const value = source[key]
        if(isRef(value))
            Object.defineProperty(target, key, {
                get: () => value.value,
                set: (v) => (value.value = v),
            })
        else
            target[key] = value
    }
    return target
}
