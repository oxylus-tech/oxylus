/**
 * From list of objects and attribute name, return a Set with all values
 * taken from them.
 *
 * @param objs - the list of objects
 * @param attr - attribute name to look for.
 * @return a `Set` of collected values.
 */
export function collectAttr(objs, attr) {
    let dest = new Set();
    for (const obj of objs) {
        const vals = obj[attr];
        if (vals) {
            if (Array.isArray(vals))
                dest = dest.union(new Set(vals));
            else
                dest.add(vals);
        }
    }
    return dest;
}
/**
 * From provided object, create a new one using mapping predicate.
 *
 * @property keys - keys to map
 * @property map - take value from this object or calling this function.
 * @return newly created object.
 */
export function mapToObject(keys, map) {
    if (!Array.isArray(keys))
        keys = Object.keys(keys);
    return keys.reduce((dest, key) => {
        dest[key] = map instanceof Function ? map(key) : map[key];
        return dest;
    }, {});
}
/**
 * Same as `Object.assign`, but skipping empty values
 */
export function assignNonEmpty(target, source) {
    if (!source)
        return;
    for (const key of Object.keys(source))
        if (source[key] && source[key] !== 0 && source[key] !== 0.0)
            target[key] = source[key];
}
/**
 * Reset an object inplace, using provided assignement values.
 *
 * @param [target] object to reset
 * @param [assign] assign using this object
 * @return the object passed as target.
 */
export function reset(target, assign = undefined) {
    for (const key of Object.keys(target)) {
        const val = assign?.[key];
        if (!assign || val === undefined)
            delete target[key];
        else
            target[key] = assign[key];
    }
    if (assign)
        for (const [key, value] of Object.entries(assign))
            if (!(key in target))
                target[key] = value;
    return target;
}
/**
 * Shallow copy of a class instance
 * Assign extra `attrs` attributes.
 */
export function shallowCopy(source, attrs = {}) {
    const clone = Object.create(Object.getPrototypeOf(source));
    return Object.assign(clone, { ...source, ...attrs });
}
/**
 * Return two objects from the provided one with the first one having
 * values specified by keys, other with what's left.
 */
export function splitValues(source, keys) {
    if (!Array.isArray(keys))
        keys = Object.keys(keys);
    return Object.keys(source).reduce((dst, key) => {
        if (keys.indexOf(key) == -1)
            dst[1][key] = source[key];
        else
            dst[0][key] = source[key];
        return dst;
    }, [{}, {}]);
}
/**
 * Return a new object from provided one with only specified values.
 */
export function filterValues(source, keys) {
    return Object.keys(source).reduce((dst, key) => {
        if (keys.indexOf(key) != -1)
            dst[key] = source[key];
        return dst;
    }, {});
}
/**
 * Return a new object from provided one with specified values excluded.
 */
export function excludeValues(source, keys) {
    return Object.keys(source).reduce((dst, key) => {
        if (keys.indexOf(key) == -1)
            dst[key] = source[key];
        return dst;
    }, {});
}
