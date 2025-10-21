import { Model as $Model, Relation } from 'pinia-orm'


/** A model instance id **/
export type ModelId = string|number


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
        if(!url)
            throw Error("No url declared on this model.")

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
type IRelations = Record<string, Relation>


/**
 * This is the base class used for declaring model in @oxylus.
 *
 *
 * # Configuration
 *
 * It is assumed that models are used from derived AxiosRepository instances
 * (actually, @oxylus uses {@link RefRepository} which allows low memory usage).
 *
 * When you declare a model must provide its {@link Model.meta} attribute.
 * It is an instance of {@link Meta} which is used to link with django application.
 *
 * Basically it allows to:
 *
 * - Get API urls for objects and lists;
 * - Run permission checks by providing the actual name of required permission;
 * - Provide a label to user about the model name;
 * - Provide a title to user about the instance;
 * - Have minimal information about the backend equivalent model (on which permission checks actually is based);
 *
 * Example of Meta configuration:
 *
 * ```
 * static meta = new Meta({
 *     app: 'auth',         // Django app label
 *     model: 'user',       // Model name (as used in Django's model.Meta.label_lower
 *     url: 'auth/user/',   // API entry point, nested under server's one
 *     icon: 'mdi-account', // Model icon
 *     title: 'username',   // Used to display instance's as string
 * })
 *
 * # API
 *
 * By default, the model is configured to get the values from API under the `results` key.
 * This actually corresponds to default Django Rest Framework when pagination
 * is activated. Most of the API views are paginated, only few aren't (eg. permissions since they never change and are limited).
 *
 * You should consider to use pagination as much as you can. Don't worry, we
 * already handle full retrieving of relationships and so on (see {@link Query} and {@link ModelList} for more info).
 *
 */
export class Model extends $Model {
    /**
     * This static attribute SHOULD be provided by the subclass of this model.
     *
     * It specifies various metadata which are used to provide information to
     * user, API, check permissions, etc.
     */
    public static meta: Meta = new Meta({
        app: "ox_core",
    })

    public static config: Record<string, any> = {
        axiosApi: { dataKey: 'results' }
    }

    /** Get model's Meta class */
    get $meta(): Meta { return (this.constructor as typeof Model).meta }

    /** Get instance's title based on Meta class. */
    get $title(): string|null { return this.$meta.getTitle(this) }

    /** Get API's model instance url */
    $url(path?: string): string { return this.$meta.getUrl({path, id: this.id}) }
}

export interface Model extends IModel {}
