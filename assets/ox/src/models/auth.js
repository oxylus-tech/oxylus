import { unref } from 'vue';
import { Model, Meta } from './model';
/** Represent `django.contrib.contenttypes.models.ContentType`. */
export class ContentType extends Model {
    static entity = "contentTypes";
    static meta = new Meta({
        app: "contenttypes",
        model: "content_type",
        url: "ox/core/content_type/",
        title: "label"
    });
    static config = {};
    static fields() {
        return {
            id: this.attr(null),
            app: this.string(''),
            model: this.string(''),
            app_verbose: this.string(''),
            model_verbose: this.string(''),
            permissions: this.hasMany(Permission, "content_type_id"),
        };
    }
    /** Label used as django identifier */
    get label() {
        return `${this.app}.${this.model}`;
    }
    /**
    * Return Permission for the provided action.
    * @param {string} action Permission's action to match.
    * @return Permission or null if not found
    */
    getPermission(action) {
        const perm = this.permissions.filter(p => p.action == action);
        return perm && perm[0] || null;
    }
}
/** Represent `django.contrib.auth.models.Permission`. */
export class Permission extends Model {
    static entity = "permissions";
    static meta = new Meta({
        app: "auth",
        model: "permission",
        url: "ox/core/permission/",
        title: "label"
    });
    static config = {};
    static fields() {
        return {
            id: this.attr(null),
            name: this.string(''),
            label: this.string(''),
            codename: this.string(''),
            content_type_id: this.attr(null),
            content_type: this.belongsTo(ContentType, "content_type_id"),
        };
    }
    /**
     * Return permission as codename.
     *
     * Perm can be:
     * - a string
     * - a list of [ClassType, actionString]
     */
    // TODO: correct typescript type
    static getCodename(perm) {
        if (Array.isArray(perm)) {
            const [model, action] = perm;
            return `${unref(model).meta.app}.${action}_${model.meta.model}`;
        }
        return perm;
    }
    /** Action based on codename */
    get action() {
        return this.codename.split("_")[0];
    }
}
/** Represent `django.contrib.auth.models.Group`. */
export class Group extends Model {
    static entity = "groups";
    static meta = new Meta({
        app: "auth",
        model: "group",
        url: "ox/core/group/",
        icon: "mdi-account-multiple",
        title: "name",
    });
    static fields() {
        return {
            id: this.attr(null),
            name: this.string(''),
            permissions_id: this.attr([]),
            permissions: this.hasManyBy(Permission, "permissions_id"),
        };
    }
}
/** Represent `django.contrib.auth.models.User`. */
export class User extends Model {
    static entity = "users";
    static meta = new Meta({
        app: "auth",
        model: "user",
        url: "ox/core/user/",
        icon: "mdi-account",
        title: "username",
    });
    static config = {
        axiosApi: {
            dataKey: 'results',
            actions: {
                updatePassword(id, value) {
                    return this.post(`${this.repository.use.meta.getUrl({ id })}password/`, { password: value }, { save: false });
                }
            }
        }
    };
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
        };
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
    can(perm, obj) {
        perm = Permission.getCodename(perm);
        const allowed = this.all_permissions?.includes(perm) || false;
        if (allowed && obj && obj.access)
            return perm in obj.access.grants;
        return allowed;
    }
    /**
     * Return `true` if the user has any of the provided permissions.
     *
     * Value is checked against `all_permissions` field.
     */
    canAny(perms) {
        return this.all_permissions?.some(p => perms.includes(Permission.getCodename(p))) || false;
    }
}
