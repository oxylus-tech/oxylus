import {unref} from 'vue'
import type {Ref} from 'vue'
import type {Response} from '@pinia-orm/axios'

import {collectAttr} from '../utils'
import type {Model} from '../models'
import type {IObject} from '../utils'

import Query from './query'
import ModelController from './modelController'
import type {IQueryFetch} from './query'
import type {IModelController, IModelFetch} from './modelController'


export type FilterValue = number | string
export type Filters = IObject<FilterValue>


/** Base interface of a ModelList */
export interface IModelList<M extends Model> extends IModelController<M> {
    /** Provide extra GET parameters. */
    filters?: Filters
    /** Response's key used to return URL to previous paginated items. */
    prevKey: string
    /** Response's key used to return URL to next paginated items.  */
    nextKey: string
    /** Response's key used to return total items count. */
    countKey: string
}

/**
 * Arguments of {@link ModelList.fetch}. It is passed down to {@link Query.fetch}.
 */
export interface IModelListFetch<M extends Model> extends IModelFetch<M> {
    /** Query's GET parameters used to filter the list. */
    filters?: Filters
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
    ids: number[] = []
    filters: Filters = {}
    nextUrl: string|null = null
    prevUrl: string|null = null
    count: number|null = null

    dataKey = "results"
    nextKey = "next"
    prevKey = "previous"
    countKey = "count"

    /** Get items count. */
    get length(): number { return this.ids.length }

    /** Get item by list index */
    get(index: number): number { return index < this.ids.length ? this.ids[index] : null }

    /** Get item index by id */
    findIndex(id: number): number { return this.ids.indexOf(id) }

    /**
     * Get item id next to provided one at the specified direction.
     *
     * @param item - reference item
     * @param step - increment or decrement item index by this value.
     * @return the target item id or null if not found.
     */
    getSiblingIndex(item: M|null, step: number): number {
        if(item === null)
            return -1

        const index = this.findIndex(item.id)
        const sibling = index >= 0 ? index+step : -1
        return sibling >= 0 && sibling < this.ids.length ? sibling : -1
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

    protected getQueryOptions(options: IModelFetch<M>): IQueryFetch<M> {
        if(this.filters)
            options.params = {...this.filters, ...(options.params ?? [])}
        return super.getQueryOptions(options)
    }

    /**
     * Handle response from API.
     * Reset list and context information such as next/prev url, total count.
     */
    async handleResponse({append=false, ...options}: IModelListFetch<M>, response: Response): Promise<Response> {
        response = await super.handleResponse(options, response)
        if(!this.state.isError) {
            const ids = [...collectAttr(response.entities, 'id')]
            this.ids = append ? this.ids.concat(ids) : ids
            this.nextUrl = response.response.data[this.nextKey] || null
            this.prevUrl = response.response.data[this.prevKey] || null
            this.count = response.response.data[this.countKey] || this.ids.length
        }
        return response
    }
}

export default interface ModelList<M extends Model> extends IModelList<M> {
    ids: number[]
    nextUrl: string|null
    prevUrl: string|null
    count: number|null
}
