export {default as State, States}  from './state'
export * from './functional'
export * from './vue'


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
