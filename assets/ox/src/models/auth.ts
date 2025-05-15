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

    static fields() {
        return {
            id: this.attr(null),
            app: this.string(''),
            model: this.string(''),
            app_verbose: this.string(''),
            model_verbose: this.string(''),
            permissions: this.hasMany(Permission, "content_type_id"),
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
        const perm = this.permissions.filter(p => p.action == action)
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

    static fields() {
        return {
            id: this.attr(null),
            name: this.string(''),
            label: this.string(''),
            codename: this.string(''),
            content_type_id: this.attr(null),
            content_type: this.belongsTo(ContentType, "content_type_id"),
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
            return `${model.meta.app}.${action}_${model.meta.model}`
        }
        return perm
    }


    /** Action based on codename */
    get action() {
        return this.codename.split("_")[0]
    }
}
export interface Permission extends IPermission {}


/**
 * Return true wether user has permission to execute a specific action.
 * @name IPermissionFunc
 * @function
 * @param {User} user - the user executing to check permission against.
 * @param {any} value - the object;
 * @return {Boolean} true if user has permission, false otherwise.
 */
export type IPermissionFunc = <M extends Model>(user: User, value: M) => boolean
/**
 * A Permission can either be a string or a function (@link IPermissionFunc}. When it is a string it can be:
 * - a fully qualified permission codename
 * - an action (codename is constructed based on value model).
 *
 */
export type IPermissionItem = string | IPermissionFunc

export type IPermissionItems = IPermissionItem | IPermissionItem[]

/**
 * Helper class used to handle a set of permissions.
 *
 * The permissions is an array of codename or function to execute. It then can be checked against a provided model instance.
 */
export class Permissions {
    items: IPermissionItems

    constructor(items: IPermissionItems = []) {
        this.items = items
    }

    /**
    * Return true when user has the permission to execute the action.
    *
    * Different cases:
    * - no permissions contained returns `true`
    * - permissions is a an array: all must returns `true`
    * - permissions is a single item
    */
    can<M extends Model>(user: User, value: M): boolean {
        if(!this.items)
            return true
        const items = Array.isArray(this.items) ? this.items : [this.items]

        return items.every(p => this._can(p, user, value))
    }

    _can<M extends Model>(permission: IPermissionItem, user: User, value: M) : boolean {
        if(permission instanceof Function)
            return permission(user, value)

        if(!user || !(value instanceof Model))
            return false

        if(permission.indexOf('_') <= 0 || permission.indexOf('.') <= 2) {
            const meta = (value.constructor as typeof Model).meta
            permission = `${meta.app}.${permission}_${meta.model}`
        }
        return user.can(permission)
    }
}


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

    static config = {
        axiosApi: {
            dataKey: 'results',
        }
    }

    static fields() {
        return {
            id: this.attr(null),
            name: this.string(''),
            permissions_id: this.attr([]),
            permissions: this.hasManyBy(Permission, "permissions_id"),
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
                        `${this.meta.getUrl({id})}/password/`, {password: value},
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
            permissions_id: this.attr([]),
            permissions: this.hasManyBy(Permission, "permissions_id"),
            groups_id: this.attr([]),
            groups: this.hasManyBy(Group, "groups_id"),
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
     */
    can(perm: IPermissionGetCodename): boolean {
        perm = Permission.getCodename(perm)
        return this.all_permissions?.includes(perm) || false
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
