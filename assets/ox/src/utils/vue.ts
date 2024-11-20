

/**
 * For the provided slots, return a dict of `{slot: name}` for slots
 * starting with prefix.
 */
export function filterSlots(slots: Object<String, Function>, prefix: string, {exclude=null}={}) {
    return Object.keys(slots)
        .filter((k) => k.startsWith(prefix) && k != exclude)
        .reduce((d, k) => { d[k] = k.replace(prefix, ''); return d }, {})
}
