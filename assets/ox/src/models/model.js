import { Model as PModel, Relation } from 'pinia-orm';
/** Provide extra information on the model, see {@link Model.meta}. */
export class Meta {
    constructor(attrs = { app: "" }) {
        Object.assign(this, attrs);
    }
    /** Return a model instance's title */
    getTitle(obj) {
        if (!this.title)
            return null;
        if (this.title instanceof Function)
            return this.title(obj);
        return `${obj[this.title]}`;
    }
    /** Return API url based on id and path. **/
    getUrl({ path = null, id = null }) {
        let url = this.url;
        if (!url)
            throw Error("No url declared on this model.");
        if (id)
            url += `/${id}/`;
        if (path)
            url += path;
        return `${url}/`.replaceAll('//', '/');
    }
    /** Return permission codename */
    getPermission(action) {
        return `${this.app}.${action}_${this.model}`;
    }
}
export class Model extends PModel {
    /**
     * This static attribute SHOULD be provided by the subclass of this model.
     *
     * It specifies various metadata which are used to provide information to
     * user, API, check permissions, etc.
     */
    static meta = new Meta({
        app: "ox_core",
    });
    static config = {
        axiosApi: { dataKey: 'results' }
    };
    /** Get model's Meta class */
    get $meta() { return this.constructor.meta; }
    /** Get instance's title based on Meta class. */
    get $title() { return this.$meta.getTitle(this); }
    /** Get API's model instance url */
    $url(path) { return this.$meta.getUrl({ path, id: this.id }); }
}
