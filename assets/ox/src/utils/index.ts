export {default as State, States}  from './state'
export * from './vue'


export type IObjectKey = string|number
export type IObject<V=any> = {[k: IObjectKey]: V}



export function aggregateValues(objs: Array<IObject>, attr: string): Set<any> {
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
 * @property source - object to take keys
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
* Reset an object inplace, using provided assignement values.
* @return the object passed as target.
*/
export function reset(target: IObject, assign=undefined) : T{
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
 * @param {String|null} split: split cookie value using this character.
 */
export function getCookie(key: string, split: string|null=null) : string | string[] | null {
    if(document.cookie && document.cookie !== '') {
        const cookie = document.cookie.split(';')
                               .find(c => c.trim().startsWith(key + '='))
        const value = cookie ? decodeURIComponent(cookie.split('=')[1]) : null;
        return value && split ? value.split(split) : value
    }
    return null
}


/**
 * CSRF token provided by Django
 */
export var csrfToken: string = null;

/**
 * Get CSRF token
 */
export function getCsrf() : string {
    if(csrfToken === null)
        csrfToken = getCookie('csrftoken')
    return csrfToken;
}
