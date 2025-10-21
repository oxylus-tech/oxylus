import { models } from "@oxylus/ox"
export {models} from '@oxylus/ox'

/** Represent a `django-caps` Agent. */
export class Agent extends models.Model {
    static entity = "agents"
    static meta = new models.Meta({
        app: "caps",
        model: "agent",
        url: "ox/auth/agent",
        title: "name"
    })

    static fields() {
        return {
            id: this.attr(null),
            name: this.string(""),
            user: this.number(null),
            group: this.number(null),

            $user: this.belongsTo(models.User, 'user'),
            $group: this.belongsTo(models.Group, 'group')
        }
    }
}


/** Base class for `django-caps` Access */
export class Access extends models.Model {
    static fields() {
        return {
            id: this.attr(null),
            receiver: this.string(""),
            emitter: this.string(""),
            grants: this.attr({}),
            expiration: this.string(""),
        }
    }

    grants: Record<string, number>
}


/** Base class for `django-caps` Object. **/
export class Owned extends models.Model {
    static fields() {
        return {
            id: this.attr(null),
            owner: this.string(""),
            access: this.attr(null),

            $owner: this.belongsTo(Agent, 'owner'),
        }
    }

    access: Access

    /** Return True if permission is granted. **/
    has_perm(perm: string) {
        // when access is not provided user is owner.
        return !this.access || perm in this.access.grants
    }
}
