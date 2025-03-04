import type {Response} from '@pinia-orm/axios'

import type {Model} from '../models'
import {collectAttr} from '../utils'

import Query from './query'
import ModelController from './modelController'
import type {IModelController, IModelFetch} from './modelController'


/** Base interface of a ModelList */
export interface IModelList<M extends Model> extends ModelController<M> {
    /** Response's key used to return URL to previous paginated items. */
    prevKey: string
    /** Response's key used to return URL to next paginated items.  */
    nextKey: string
    /** Response's key used to return total items count. */
    countKey: string
}

/** Reactive ModelList interface options */
export interface IRModelListOpts<M extends Model> extends IModelList<M> {
    value?: any
}

/**
 * Arguments of {@link ModelList.fetch}. It is passed down to {@link Query.fetch}.
 */
export interface IModelListFetch<M extends Model> extends IModelFetch<M> {
    /**
     * Append items to list. If `false` (default), fetch results will replace
     * current list items.
     */
    append?: boolean
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
 * const list = new ModelList.reactive({
 *     query: new Query(repos.users, repos),
 *     relations: ['groups'],
 *     value,
 * })
 *
 * await list.load({url: '/users'})
 */
export default class ModelList<M extends Model> extends ModelController<M, IModelList<M>> {
    items: M[] = []
    nextUrl: string|null = null
    prevUrl: string|null = null
    count: number|null = null

    dataKey = "results"
    nextKey = "next"
    prevKey = "previous"
    countKey = "count"

    /** Get items count. */
    get length(): number { return this.items.length }

    get(index: number): M { return index < this.items.length ? this.items[index] : null }

    /** Get item by id */
    find(id: number): M { return this.items.find(i => i.id == id) }

    /** Get item index by id */
    findIndex(id: number): number { return this.items.findIndex(i => i.id == id) }

    /**
     * Get item next to provided one at the specified direction.
     *
     * @param item - reference item
     * @param step - increment or decrement item index by this value.
     * @return the target item or null if not found.
     */
    getSibling(item: M, step: number): M|null {
        const index = this.findIndex(item.id)
        const sibling = index > 0 ? index+step : -1
        return sibling > 0 ? this.get(sibling) : null
    }

    /**
     * Fetch next items from API, override `url` using {@link ModelList.nextUrl}.
     */
    async loadNext(options: IModelListFetch<M>): Promise<Response> {
        return await this.load({...options, url: this.nextUrl})
    }

    /**
     * Fetch previous items from API, override `url` using {@link ModelList.prevUrl}.
     */
    async loadPrev(options: IModelListFetch<M>): Promise<Response> {
        return await this.load({...options, url: this.prevUrl})
    }

    /** Fetch items from API (using self's {@link Query.fetch}). */
    async handleResponse({append=false, ...options}: IModelListFetch<M>, response: Response): Promise<Response> {
        response = await super.handleResponse(options, response)
        if(!this.state.isError) {
            const ids = [...collectAttr(response.entities, 'id')]
            const items = this.queryset(ids).get()
            this.items = append ? this.items.concat(items) : items
            this.nextUrl = response.response.data[this.nextKey] || null
            this.prevUrl = response.response.data[this.prevKey] || null
            this.count = response.response.data[this.countKey] || this.items.length
        }
        return response
    }
}

export default interface ModelList<M extends Model> extends IModelList<M> {
    items: M[]
    nextUrl: string|null
    prevUrl: string|null
    count: number|null
}

export type ModelListOpts<M extends Model> = IRModelListOpts<M> & {
    query?: Query<M>,
    value?: any
}
