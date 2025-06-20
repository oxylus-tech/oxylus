import { cloneDeep, isEqual, pick } from 'lodash'
import type { Attribute, Repository } from 'pinia-orm'
import type { Response } from '@pinia-orm/axios'
import {toRaw} from 'vue'

import { State } from '../utils'
import Editor from './editor'
import type { IObject } from '../utils'
import type { Model } from '../models'
import type {IEditor, IEditorProps, IEditorSend} from './editor'


/**
 * ModelEditor properties (as passed down to {@link OxModelEdit} component).
 */
export interface IModelEditorProps<T extends Model> extends IEditorProps<T> {
    /** Related repository */
    repo: Repository<T>
}

export interface IModelEditorSend extends Record {
    id: number
}


/**
 * Editor sub-class used to edit model instances.
 *
 * Regarding properties ({@link IModelEditorProps}):
 * - `name` defaults to `{model.entity}-edit`.
 * - `repo` is mandatory
 *
 */
export default class ModelEditor<T extends Model, P extends IModelEditorProps<T>> extends Editor<T,P> {
    constructor(options : IEditor<T,P>) {
        options.fields = Object.keys((options.props.repo.use as typeof Model).fields())
        options.empty ??= new options.props.repo.use()
        super(options)
    }

    get repo() { return this.props.repo }
    get name() { return this.props.name || `${this.repo.use.entity}-edit` }
    isEdited(): boolean {
        return !isEqual(pick(this.value, this.fields), pick(this.initial, this.fields))
    }

    get url(): string {
        const url = super.url || (this.repo.use as typeof Model)?.meta?.url
        if(!url)
            throw Error("No url specified as parameter or in Model.meta.")
        return url
    }

    reset(value: T|null): void {
        if(!value || !Object.keys(value).length)
            value = this.empty

        const fields = this.fields.filter(k => k in value)
        this.value = cloneDeep(pick(value, fields)) || {}
        this.state.none()
    }

    serialize(value: T): {[k: string]: any} {
        const cls = this.repo.use
        const obj = new cls({...this.value})
        return obj.$toJson(null, {relations: false})
    }

    async send(value: IModelEditorSend|FormData, params: Record = {}) : State {
        let [func, url] = ["post", this.url]
        if(this.value.id) {
            url = `${url}${this.value.id}/`
            func = "put"
        }
        return await this.repo.api()[func](url, value, params).then(
            (result: Response) => State.ok(result.entities[0]),
            (error: Response) => State.error(error.response.data)
        )
    }
}
export default interface ModelEditor<T extends Model, P extends IModelEditorProps<T>> extends Editor<T,P> {
    fields: string[]
}
