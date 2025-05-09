import {t} from '../composables'

export function mandatoryRule(value) {
    return value ? true : t('fields._.mandatory')
}


/** Return rule whose validating value is optional.
 *
 * By default rules require value to be provided. This returns a new
 * rule whose value can either be empty or must match provided rule.
 */
export function optionalRule(rule) {
    return (value) => {
        return !value || rule(value)
    }
}

/** Rule validating email */
export function emailRule(value) {
    const allowed = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    return allowed.test(value) || t("fields.email.rule")
}

/** Rule validating username */
export function usernameRule(value) {
    const allowed = /^[A-Za-z0-9@.+\-_]+$/
    return allowed.test(value) || "Username must not be empty. It only can contain letters, numbers and @/+/./- special characters"
}
