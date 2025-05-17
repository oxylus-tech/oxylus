import {t} from '../composables'

/**
 * This object provide commonly used validation rules to use with form fields.
 */
export default {
    /** Field is required */
    required(value) {
        return value ? true : t('fields._.required')
    },

    /**
     * Return a rule whose validating value is optional.
     *
     * By default rules require value to be provided. This returns a new
     * rule whose value can either be empty or must match provided rule.
     */
    optional(rule) {
        return (value) => {
            return !value || rule(value)
        }
    },

    /** Rule validating email */
    email(value) {
        const allowed = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
        return allowed.test(value) || t("fields.email.rule")
    },

    /** Rule validating username */
    username(value) {
        const allowed = /^[A-Za-z0-9@.+\-_]+$/
        return allowed.test(value) || "Username must not be empty. It only can contain letters, numbers and @/+/./- special characters"
    },
}
