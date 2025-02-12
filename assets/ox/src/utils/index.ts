export {default as State, States}  from './state'
export * from './vue'


/**
 * {@link IObject}'s key
 */
export type IObjectKey = string|number

/**
 * Helper interface that is used to designate an object as
 * `{key_string_or_number: any_value}`.
 */
export type IObject<V=any> = {[k: IObjectKey]: V}


/**
 * From list of objects and attribute name, return a Set with all values
 * taken from them.
 *
 * @param objs - the list of objects
 * @param attr - attribute name to look for.
 * @return a `Set` of collected values.
 */
export function collectAttr(objs: Array<IObject>, attr: string): Set<any> {
    let dest : Set<any> = new Set()
    for(const obj of objs) {
        const vals = obj[attr]
        if(vals) {
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
 * @name MapKeysPred
 */
export type MapKeysPred = IObject | ((key: IObjectKey) => any)


/**
 * From provided object, create a new one using mapping predicate.
 *
 * @property keys - keys to map
 * @property map - take value from this object or calling this function.
 * @return newly created object.
 */
export function mapToObject(keys: IObject | Array<IObjectKey>, map: MapKeysPred | IObject) : IObject<IObjectKey> {
    if(!Array.isArray(keys))
        keys = Object.keys(keys)
    return keys.reduce((dest: IObject, key: IObjectKey) => {
        dest[key] = map instanceof Function ? map(key) : map[key];
        return dest
    }, {})
}

/**
 * Same as `Object.assign`, but skipping empty values
 */
export function assignNonEmpty(target: IObject, source: IObject) {
    if(!source)
        return

    for(const key of Object.keys(source))
        if(source[key] && source[key] !== 0 && source[key] !== 0.0)
            target[key] = source[key]
}


/**
 * Reset an object inplace, using provided assignement values.
 *
 * @param [target] object to reset
 * @param [assign] assign using this object
 * @return the object passed as target.
 */
export function reset(target: IObject, assign: IObject|undefined=undefined) : IObject {
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
 * Shallow copy of a class instance
 * Assign extra `attrs` attributes.
 */
export function shallowCopy(source: IObject, attrs: IObject={}) {
    const clone = Object.create(Object.getPrototypeOf(source))
    return Object.assign(clone, {...source, ...attrs})
}


/**
 * Return cookie with provided key
 *
 * @param {String} key: cookie name
 */
export function getCookie(key: string) : string | null {
    if(document.cookie && document.cookie !== '') {
        const cookie = document.cookie.split(';')
                               .find(c => c.trim().startsWith(key + '='))
        return cookie ? decodeURIComponent(cookie.split('=')[1]) : null;
    }
    return null
}

/**
 * Return cookie with provided key as list
 *
 * @param {String} key: cookie name
 * @param {String|null} split: split cookie value using this character.
 */
export function getCookieList(key: string, split: string): string[] {
    const cookie = getCookie(key)
    return cookie !== null ? cookie.split(split) : []
}


/**
 * CSRF token provided by Django
 */
export var csrfToken: string|null = null;

/**
 * Get CSRF token
 */
export function getCsrf() : string|null {
    if(csrfToken === null)
        csrfToken = getCookie('csrftoken')
    return csrfToken;
}
