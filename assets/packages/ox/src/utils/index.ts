export {default as State, States}  from './state'
export * from './functional'
export * from './vue'


/**
 * Generic type for typing classes.
 */
export type ClassType<T = any> = new (...args: any[]) => T;


/**
 * Return cookie with provided key
 *
 * @param {string} key - cookie name
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
 * @param {String} key - cookie name
 * @param {String|null} split - split cookie value using this character.
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


/**
 * Return country UTF-8 flag from provided country ISO code.
 */
export function getCountryFlag(code) {
    if (typeof code !== 'string' || code.length !== 2)
        return ''

    if(code == "en")
        code = "gb"

    const OFFSET = 0x1F1E6
    const chars = code.toUpperCase().split('')
    const isValid = chars.every((c: string) => c >= 'A' && c <= 'Z')

    return isValid
        ? String.fromCodePoint(...chars.map(c => OFFSET + c.charCodeAt(0) - 65))
        : ''
}


/**
 * Read data from the provided source element.
 * @param {String} dataEl - id of the DOM element.
 * @return {Object} read data
 */
export function readJsonScript(dataEl: string): any {
    const el = document.getElementById(dataEl)
    if(!el)
        throw `Element {elementId} not found`;
    return el.innerText ? JSON.parse(el.innerText) : {};
}
