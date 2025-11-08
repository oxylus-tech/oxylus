import {isEqual} from 'lodash'
import {toRaw, type Reactive} from 'vue'

export type RecordKey = string|number


/**
 * From list of objects and attribute name, return a Set with all values
 * taken from them.
 *
 * @param objs - the list of objects
 * @param attr - attribute name to look for.
 * @return a `Set` of collected values.
 */
export function collectAttr(objs: Record<string, any>[], attr: string): Set<any> {
    let dest : Set<any> = new Set()
    for(const obj of objs) {
        const vals = obj[attr]
        if(vals !== undefined) {
            if(Array.isArray(vals))
                dest = dest.union(new Set(vals))
            else
                dest.add(vals)
        }
    }
    return dest
}


/**
 * Either a function returning the created value or an object to take values from
 */
export type MapKeysPred = Record<string, any> | ((key: RecordKey) => any)


/**
 * From provided object, create a new one using mapping predicate.
 *
 * @property keys - keys to map
 * @property map - take value from this object or calling this function.
 * @return newly created object.
 */
export function mapToObject(keys: Record<string, any> | Array<RecordKey>, map: MapKeysPred | Record<string, any>) : Record<RecordKey, any> {
    if(!Array.isArray(keys))
        keys = Object.keys(keys)
    return keys.reduce((dest: Record<RecordKey, any>, key: RecordKey) => {
        dest[key] = map instanceof Function ? map(key) : map[key];
        return dest
    }, {})
}

/**
 * Same as `Object.assign`, but skipping empty values.
 * FIXME: what about empty objects and arrays?
 */
export function assignNonEmpty(target: Record<string, any>, source: Record<string, any>) : Record<string, any> {
    // FIXME: what about empty objects and arrays?
    for(const key of Object.keys(source))
        try {
            if(source[key] && source[key] !== 0 && source[key] !== 0.0)
                target[key] = source[key]
        }
        catch(e) { console.warn(e) }
    return target
}


/**
 * Reset an object inplace, using provided assignement values.
 *
 * @param {Object} target - object to reset
 * @param {Object} assign - ssign using this object
 * @return the object passed as target.
 */
export function reset(target: Record<RecordKey, any>, assign: Record<RecordKey, any>|undefined=undefined) : Record<RecordKey, any> {
    for(const key of Object.keys(target)) {
        const val = assign?.[key]
        if(!assign || val === undefined)
            delete target[key]
        else
            target[key] = assign[key]
    }
    if(assign)
        for(const [key, value] of Object.entries(assign))
            if(!(key in target))
                target[key] = value
    return target
}


/**
 * Execute the provided function if the values ar not equal (using lodash's `isEqual`).
 *
 * Ensure that values are `toRaw` (vue).
 */
export function ifNotEqual<R extends any>(a: any|Reactive<any>, b: any[]|Reactive<any>, func: (a: any, b: any) => R): R|void {
    a = toRaw(a)
    b = toRaw(b)
    if(!isEqual(a, b))
        return func(a, b)
}

/**
 * Same as {@link ifNotEqual}, except that at returns an arrow function instead of executing the
 * code directly.
 */
export function ifNotEqualFn<T extends any|Reactive<any>, R extends any>(func: (a: T, b: T) => R): (a: T, b: T) => R|void {
    return (a, b) => ifNotEqual(a, b, func)
}
