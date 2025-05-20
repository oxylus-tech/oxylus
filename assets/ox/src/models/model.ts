import { Model as PModel, Relation } from 'pinia-orm'


export interface IMeta {
    /** Django application name providing the model. */
    app: string
    /** Django model label */
    model?: string
    /** API entry point to the model. */
    url?: string
    /** Material Design icon */
    icon?: string
    /** Attribute name or callable providing a title to the model instance. */
    title?: string | ((obj: any) => string)
}


/** Provide extra information on the model, see {@link Model.meta}. */
export class Meta {
    constructor(attrs: IMeta = {app: ""}) {
        Object.assign(this, attrs)
    }

    /** Return a model instance's title */
    getTitle<M extends Model>(obj: M & {[index:string]: any}): string | null {
        if(!this.title)
            return null
        if(this.title instanceof Function)
            return this.title(obj)
        return `${obj[this.title]}`
    }

    /** Return API url based on id and path. **/
    getUrl({path=null, id=null}: {path?: string, id?: number|string}): string {
        let url = this.url
        if(id)
            url += `/${id}/`
        if(path)
            url += path
        return `${url}/`.replaceAll('//', '/')
    }

    /** Return permission codename */
    getPermission(action: string): string {
        return `${this.app}.${action}_${this.model}`
    }
}
export interface Meta extends IMeta {}


export interface IModel {
    id: number
}


/**
 * :js:meth:`Model.getRelatedFields` return type.
 */
type IRelations = { [s: string]: Relation }



export class Model extends PModel {
    /**
     * This static attribute SHOULD be provided by the subclass of this model.
     *
     * It specifies various metadata which are used to provide information to
     * user, API, check permissions, etc.
     */
    static meta: Meta = new Meta({
        app: "ox_core",
    })

    static config = {
        axiosApi: { dataKey: 'results' }
    }

    /** Get model's Meta class */
    get $meta(): Meta { return (this.constructor as typeof Model).meta }

    /** Get instance's title based on Meta class. */
    get $title(): string|null { return this.$meta.getTitle(this) }

    /** Get API's model instance url */
    $url(path?: string): string { return this.$meta.getUrl({path, id: this.id}) }
}
export interface Model extends IModel {
    meta: Meta
}
