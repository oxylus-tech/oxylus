import type {Model} from '../models'
import {collectAttr} from '../utils'

import Query from './query'
import ModelController from './modelController'
import type {IQueryFetch} from './query'
import type {IModelController} from './modelController'


/** Base interface of a ModelDetail */
export interface IModelDetail<M extends Model> extends ModelController<M> {
    /** Response's key used to return data */
    dataKey: string
    /** Response's key used to return URL to previous paginated items. */
    prevKey: string
    /** Response's key used to return URL to next paginated items.  */
    nextKey: string
    /** Response's key used to return total items count. */
    countKey: string
}

/** Reactive ModelDetail interface options */
export interface IRModelDetailOpts<M extends Model> extends IModelDetail<M> {
    value?: any
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
 *     value,
 * })
 *
 * await detail.load({url: '/users'})
 */
export default class ModelDetail<M extends Model> extends ModelController<M, IModelDetail<M>> {
    item: M = []

    /** Fetch items from API (using self's {@link Query.fetch}). */
    async handleResponse(options: IQueryFetch<M>, response: Response): Promise<Response> {
        response = await super.handleResponse(options, response)
        if(!this.state.isError)
            this.item = this.queryset(result.entities[0].id, true)
        return response
    }
}

export default interface ModelDetail<M extends Model> extends IModelDetail<M> {
    item: M|null = null
}

export type ModelDetailOpts<M extends Model> = IRModelDetailOpts<M> & {
    query?: Query<M>,
    value?: any
}


/** Interface for a {@link ModelListDetail} */
export interface IModelListDetail<M extends Model> extends IModelDetail<M> {
    /** Related list */
    list: ModelList<M>
}

/**
 * A model detail related to a list.
 */
export class ModelListDetail<M extends Model> extends ModelDetail<M, IModelListDetail<M>> {
    /** The next item in the list if applicable. */
    get next(): M|null {
        return this.item ? this.list.getSibling(this.item, 1) : null
    }

    /** The previous item in the list if applicable. */
    get prev(): M|null {
        return this.item ? this.list.getSibling(this.item, -1) : null
    }
}

export interface ModelListDetail<M extends Model> extends IModelListDetail<M> {}
