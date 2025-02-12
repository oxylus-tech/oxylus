import { Model as PModel, Relation } from 'pinia-orm'


export interface IMeta {
    app: string
    model?: string
    url?: string
    icon?: string
    title?: string | ((obj: any) => string)
}

export class Meta {
    constructor(attrs: IMeta = {app: ""}) {
        Object.assign(this, attrs)
    }

    getTitle<M extends Model>(obj: M & {[index:string]: any}): string | null {
        if(!this.title)
            return null
        if(this.title instanceof Function)
            return this.title(obj)
        return `${obj[this.title]}`
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
    static meta: Meta = new Meta({
        app: "ox_core",
    })

    get $meta() { return (this.constructor as typeof Model).meta }
    get $title() { return this.$meta.getTitle(this) }

    $url(path?: string) {
        let url = this.$meta.url
        if(this.id)
            url += `/${this.id}/`
        if(path)
            url += path
        return `${url}/`.replaceAll('//', '/')
    }
}
export interface Model extends IModel {}
