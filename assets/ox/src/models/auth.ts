import { unref } from 'vue'
import type {Response} from '@pinia-orm/axios'
import { Model, Meta } from './model'
import type { IModel } from './model'


/** Interface of {@link ContentType} model */
export interface IContentType extends IModel {
    app: string
    model: string
    app_verbose: string
    model_verbose: string
    permissions: Permission[]
}

/** Represent `django.contrib.contenttypes.models.ContentType`. */
export class ContentType extends Model {
    static entity = "contentTypes"
    static meta = new Meta({
        app: "contenttypes",
        model: "content_type",
        url: "ox/core/content_type/",
        title: "label"
    })
    static config = {}

    static fields() {
        return {
            id: this.attr(null),
            app: this.string(''),
            model: this.string(''),
            app_verbose: this.string(''),
            model_verbose: this.string(''),
            $permissions: this.hasMany(Permission, "content_type"),
        }
    }

    /** Label used as django identifier */
    get label(): string {
        return `${this.app}.${this.model}`
    }

    /**
    * Return Permission for the provided action.
    * @param {string} action Permission's action to match.
    * @return Permission or null if not found
    */
    getPermission(action: string) {
        const perm = this.$permissions.filter(p => p.action == action)
        return perm && perm[0] || null
    }
}
export interface ContentType extends IContentType {}


/** Interface of {@link Permission} model. */
export interface IPermission extends IModel {
    name: string
    label: string
    codename: string
    content_type_id: number[]
    content_type: ContentType[]
}

/** Argument of {@link Permission.getCodename} */
export type IPermissionGetCodename = string | [ClassType<Model>, string]

/** Represent `django.contrib.auth.models.Permission`. */
export class Permission extends Model {
    static entity = "permissions"
    static meta = new Meta({
        app: "auth",
        model: "permission",
        url: "ox/core/permission/",
        title: "label"
    })
    static config = {}

    static fields() {
        return {
            id: this.attr(null),
            name: this.string(''),
            label: this.string(''),
            codename: this.string(''),
            content_type: this.attr(null),
            $content_type: this.belongsTo(ContentType, "content_type"),
        }
    }

    /**
     * Return permission as codename.
     *
     * Perm can be:
     * - a string
     * - a list of [ClassType, actionString]
     */
    // TODO: correct typescript type
    static getCodename(perm: IPermissionGetCodename): string {
        if(Array.isArray(perm)) {
            const [model, action] = perm
            return `${unref(model).meta.app}.${action}_${model.meta.model}`
        }
        return perm
    }


    /** Action based on codename */
    get action() {
        return this.codename.split("_")[0]
    }
}
export interface Permission extends IPermission {}


/** Interface of {@link Group} model. */
export interface IGroup {
    name: string
    permissions_id: number[]
    permissions: Permission[]
}

/** Represent `django.contrib.auth.models.Group`. */
export class Group extends Model {
    static entity = "groups"
    static meta = new Meta({
        app: "auth",
        model: "group",
        url: "ox/core/group/",
        icon: "mdi-account-multiple",
        title: "name",
    })

    static fields() {
        return {
            id: this.attr(null),
            name: this.string(''),
            permissions: this.attr([]),
            $permissions: this.hasManyBy(Permission, "permissions"),
        }
    }
}
export interface Group extends IGroup {}


/** Interface of {@link User} model. */
export interface IUser {
    username: string
    last_name: string
    first_name: string
    email: string
    is_superuser: boolean,
    all_permissions?: string[]
    permissions_id?: number[]
    permissions?: Permission[]
    groups_id?: number[]
    groups?: Group[]
}

/** Represent `django.contrib.auth.models.User`. */
export class User extends Model {
    static entity = "users"
    static meta = new Meta({
        app: "auth",
        model: "user",
        url: "ox/core/user/",
        icon: "mdi-account",
        title: "username",
    })

    static config = {
        axiosApi: {
            dataKey: 'results',
            actions: {
                updatePassword(id: number, value: string): Response {
                    return this.post(
                        `${this.repository.use.meta.getUrl({id})}password/`, {password: value},
                        {save:false}
                    )
                }
            }
        }
    }

    static fields() {
        return {
            id: this.attr(null),
            username: this.string(''),
            last_name: this.string(''),
            first_name: this.string(''),
            email: this.string(''),
            is_superuser: this.boolean(false),
            all_permissions: this.attr([]),
            permissions: this.attr([]),
            groups: this.attr([]),
            $permissions: this.hasManyBy(Permission, "permissions"),
            $groups: this.hasManyBy(Group, "groups"),
        }
    }

    /**
     * Return `true` if the user has the provided permission.
     *
     * Permission is checked against `all_permissions` field.
     *
     * It can be ({@link Permission.getCodename}):
     * - a string: permission codename
     * - a list of: `[ModelClass, "action string"]`
     *
     * @param perm - Check for this permission ({@link Permission.getCodename} value)
     * @param obj - a `django-caps` `Owned` object: if provided and the object has an `access`, check for object permissions
     * @return whether user has permission or not.
     */
    can(perm: IPermissionGetCodename, obj?: Record): boolean {
        perm = Permission.getCodename(perm)
        const allowed = this.all_permissions?.includes(perm) || false
        if(allowed && obj && obj.access)
            return perm in obj.access.grants
        return allowed
    }

    /**
     * Return `true` if the user has any of the provided permissions.
     *
     * Value is checked against `all_permissions` field.
     */
    canAny(perms: IPermissionGetCodename[]): boolean {
        return this.all_permissions?.some(p => perms.includes(Permission.getCodename(p))) || false
    }
}
export interface User extends IUser {}
