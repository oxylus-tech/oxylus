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
    item: M|null
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
export default class ModelDetail<M extends Model, O=IModelDetail<M>> extends ModelController<M, O> {
    item: M|null = null

    /** Fetch items from API (using self's {@link Query.fetch}). */
    async handleResponse(options: IModelFetch<M>, response: Response): Promise<Response> {
        response = await super.handleResponse(options, response)
        if(!this.state.isError)
            this.item = this.queryset(response.entities[0].id).first()
        return response
    }
}

export default interface ModelDetail<M extends Model, O=IModelDetail<M>> extends IModelDetail<M> {
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
