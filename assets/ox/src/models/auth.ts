import type {Response} from '@pinia-orm/axios'
import { Model, Meta } from './model.ts'
import type { IModel } from './model.ts'


export interface IContentType extends IModel {
    app: string
    model: string
    app_verbose: string
    model_verbose: string
    permissions: Permission[]
}

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

    /**
    * @property {string} label used as django identifier
    */
    get label() {
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


export interface IPermission extends IModel {
    name: string
    label: string
    codename: string
    content_type_id: number[]
    content_type: ContentType[]
}

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

    //! Action based on codename
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
export type IPermissionItem = string | IPermissionFunc


export class Permissions {
    items: IPermissionItem[]

    constructor(items: IPermissionItem[] = []) {
        this.items = items
    }

    /**
    * Return true when user has the permission to execute the action.
    */
    can<M extends Model>(user: User, value: M): boolean {
        if(!this.items)
            return true
        if(Array.isArray(this.items))
            return this.items.every(p => this._can(p, user, value))
        return this._can(this.items, user, value)
    }

    _can<M extends Model>(permission: IPermissionItem, user: User, value: M) : boolean {
        if(permission instanceof Function)
            return permission(user, value)

        if(!user || !(value instanceof Model))
            return false

        const meta = (value.constructor as typeof Model).meta
        return user.can(`${meta.app}.${permission}_${meta.model}`)
    }

}


export interface IGroup {
    name: string
    permissions_id: number[]
    permissions: Permission[]
}

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

export class User extends Model {
    static entity = "users"
    static meta = new Meta({
        app: "auth",
        model: "user",
        url: "ox/core/user/",
        icon: "mdi-account",
        title: "username",
    })

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

    can(perm: string): boolean {
        return this.all_permissions?.includes(perm) || false
    }

    canAny(perms: string[]): boolean {
        return this.all_permissions?.some(p => perms.includes(p)) || false
    }

    static config = {
        axiosApi: {
            dataKey: 'results',
            actions: {
                updatePassword(id: number, value: string): Response {
                    return this.post(
                        `ox/core/user/${id}/password/`, {password: value},
                        {save:false}
                    )
                }
            }
        }

    }
}
export interface User extends IUser {}
