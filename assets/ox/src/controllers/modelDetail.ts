import type {Response} from '@pinia-orm/axios'

import type {Model} from '../models'
import {collectAttr} from '../utils'

import Query from './query'
import ModelController from './modelController'
import type {IModelController, IModelFetch} from './modelController'
import type ModelList from './modelList'


/** Base interface of a ModelDetail */
export interface IModelDetail<M extends Model> extends IModelController<M> {
    /** Current item. */
    item?: M
}

/** Parameters of {@link ModelDetail.fetch}. */
export interface IModelDetailFetch<M extends Model> extends IModelFetch<M> {
    /** Id of the object to load. */
    id: number
}

/**
 * Handle a list of model instances fetched using Rest Api. It is
 * used in model's panels.
 *
 * It uses {@link Query} object in order to fetch items and relations.
 *
 *
 * @example
 * const value = ref(null)
 * const detail = new ModelDetail.reactive({
 *     query: new Query(repos.users, repos),
 *     relations: ['groups'],
 * })
 *
 * await detail.load({id: 32})
 */
export default class ModelDetail<M extends Model, O=IModelDetail<M>> extends ModelController<M, O> {
    item?: M = null

    /** Fetch items from API (using self's {@link Query.fetch}). */
    async handleResponse(options: IModelDetailFetch<M>, response: Response): Promise<Response> {
        response = await super.handleResponse(options, response)
        if(!this.state.isError)
            this.item = this.queryset(response.entities[0].id).first()
        return response
    }

    protected getQueryUrl({id, ...options}: IModelDetailFetch<M>) {
        return this.url || this.model.meta.getUrl({id})
    }
}

export default interface ModelDetail<M extends Model, O=IModelDetail<M>> extends IModelDetail<M> {
}


/** Interface for a {@link ModelListDetail} */
export interface IModelListDetail<M extends Model> extends IModelDetail<M> {
    /** Related list */
    list: ModelList<M>
}

/**
 * A model detail related to a list.
 *
 * This allows to provide properties such as next or prev item related
 * to current one.
 */
export class ModelListDetail<M extends Model, O=IModelListDetail<M>> extends ModelDetail<M, O> {
    /** The next item in the list if applicable. */
    get next(): M|null {
        return this.item ? this.list.getSibling(this.item, 1) : null
    }

    /** The previous item in the list if applicable. */
    get prev(): M|null {
        return this.item ? this.list.getSibling(this.item, -1) : null
    }
}

export interface ModelListDetail<M extends Model, O=IModelListDetail<M>> extends IModelListDetail<M> {}
