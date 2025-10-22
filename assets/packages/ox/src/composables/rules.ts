import {t} from '../composables'

export type Rule = (value: any) => boolean|string

/**
 * This object provide commonly used validation rules to use with form fields.
 *
 * Some of the functions declared are not actual Rule, but return one to use instead.
 */
export default {
    /** Field is required */
    required(value: any) : boolean|string {
        return value || value === 0 ? true : t('fields._.required')
    },

    /**
     * Return a rule validating field errors returned from the server based
     * on the provided error list.
     */
    errors(errorList: string[]|null|undefined) : Rule {
        return () => (errorList?.length ? errorList.join('<br>') || false : true)
    },

    /**
     * Return a rule whose validating value is optional.
     *
     * By default rules require value to be provided. This returns a new
     * rule whose value can either be empty or must match provided rule.
     */
    optional(rule: any) : Rule {
        return (value: any) => (!value || rule(value))
    },

    /** Rule validating email */
    email(value: string) : boolean|string {
        const allowed = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
        return allowed.test(value) || t("fields.email.rule")
    },

    /** Rule validating username */
    username(value: string) : boolean|string {
        const allowed = /^[A-Za-z0-9@.+\-_]+$/
        return allowed.test(value) || "Username must not be empty. It only can contain letters, numbers and @/+/./- special characters"
    },
}
