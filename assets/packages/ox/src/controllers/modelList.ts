import type {Response} from '@pinia-orm/axios'
import {union, map} from 'lodash'

import type {ModelType, ModelId, Repos} from '../models'

import type {IQueryFetch, IQuery} from './query'
import type {IModelController, IModelFetch} from './modelController'
import ModelController from './modelController'


export type FilterValue = number | string
export type Filters = Record<string,FilterValue>


/** Base interface of a ModelList */
export interface IModelList<MT extends ModelType> extends IModelController<MT> {
    /** Provide extra GET parameters. */
    filters?: Filters
    /** Response's key used to return URL to previous paginated items. */
    prevKey?: string
    /** Response's key used to return URL to next paginated items.  */
    nextKey?: string
    /** Response's key used to return total items count. */
    countKey?: string
    /** Repositories (used for query). */
    repos: Repos
    /** Is list editable */
    editable: boolean
}


export type IModelListProps<MT extends ModelType> = IModelList<MT> & IQuery<MT>


/**
 * Arguments of {@link ModelList.fetch}. It is passed down to {@link Query.fetch}.
 */
export interface IModelListFetch<MT extends ModelType> extends IModelFetch<MT> {
    /** Query's GET parameters used to filter the list. */
    filters?: Filters
    /**
     * Append items to list. If `false` (default), fetch results will replace
     * current list items.
     */
    append?: boolean | number
}


/**
 * Handle a list of model instances fetched using Rest Api. It is
 * used in model's panels.
 *
 * It uses {@link Query} object in order to fetch items and relations.
 *
 * Items references are tracked using repo's {@link RefCounter}.
 *
 * @example
 * const {list, items} = useModelList({
 *     query: new Query(repos.users, repos),
 *     relations: ['groups'],
 * })
 *
 * await list.load({url: '/users'})
 */
export default class ModelList<MT extends ModelType> extends ModelController<MT, IModelList<MT>> {
    // /** Reference counter key **/
    // $id: number

    ids: ModelId[] = []
    filters: Filters = {}
    nextUrl: string|null = null
    prevUrl: string|null = null
    count: number|null = null
    page_size: number|null = null

    dataKey = "results"
    nextKey = "next"
    prevKey = "previous"
    countKey = "count"

    get length() { return this.ids.length }

    constructor(options?: IModelController<MT>) {
        super(options)
        options && Object.assign(this, options)
    }

    /** Return index for id */
    indexOf(id: number) { return this.ids.indexOf(id) }

    /** Destroy list, ensuring cleaning behind the scenes */
    drop() {
        this.ids.splice(0)
    }

    /** Reset list */
    reset(ids: ModelId[] = []) {
        this.ids = [...ids]
        this.nextUrl = null
        this.prevUrl = null
        this.count = this.ids.length
    }

    /** Get item index by id */
    //findIndex(id: number): number { return this.items.findIndex((v) => v.id == id) }

    /** Add item if not present in list.
    *
    * @param id - item id to insert
    * @param index - if provided insert at this position
    * @return item index if already in the list, else insertion one
    */
    add(id: ModelId, index: number = null): number {
        const idx = this.ids.indexOf(id)
        if(idx != -1)
            return idx

        if(index !== null) {
            this.ids.splice(index, 0 , id)
            return index
        }
        this.ids.push(id)
        return this.ids.length-1
    }

    /** Remove item by id from list if present. */
    remove(id: ModelId) {
        const idx = this.ids.indexOf(id)
        if(idx != -1)
            this.ids.splice(idx, 1)
    }

    /**
     * Get item id next to provided one at the specified direction.
     *
     * @param item - reference item
     * @param step - increment or decrement item index by this value.
     * @return the target item id or null if not found.
     */
    getSiblingIndex(item: InstanceType<MT>|null, step: number): number {
        if(item === null)
            return -1

        const index = this.ids.indexOf(item.id)
        const sibling = index >= 0 ? index+step : -1
        return sibling >= 0 && sibling < this.ids.length ? sibling : -1
    }

    /**
     * Fetch next items from API, override `url` using {@link ModelList.nextUrl}.
     */
    async loadNext(options: IModelListFetch<MT>): Promise<Response> {
        return await this.load({...options, url: this.nextUrl})
    }

    /**
     * Fetch previous items from API, override `url` using {@link ModelList.prevUrl}.
     */
    async loadPrev(options: IModelListFetch<MT>): Promise<Response> {
        return await this.load({...options, url: this.prevUrl})
    }

    protected getQueryOptions(options: IModelFetch<MT>): IQueryFetch<MT> {
        if(!("filters" in options) && this.filters)
            options.params = {...this.filters, ...(options.params ?? [])}
        if(this.page_size)
            options.params = {...options.params, page_size: this.page_size}
        return super.getQueryOptions(options)
    }

    /**
     * Handle response from API: update owned items list and related information (next/prev url, total count).
     *
     * Theses informations will not be set if `options.save == false`. You
     * can however call this method later if you need to defer persistence.
     */
    async handleResponse({append=false, ...options}: IModelListFetch<MT>, response: Response): Promise<Response> {
        response = await super.handleResponse(options, response)
        if(!this.state.isError && options.save !== false) {
            const ids = map(response.entities, 'id')
            this.update(ids, append)
            this.nextUrl = response.response.data[this.nextKey] || null
            this.prevUrl = response.response.data[this.prevKey] || null
            this.count = response.response.data[this.countKey] || this.ids.length
        }
        return response
    }

    /**
     * Update the list with the provided ids
     *
     * @param {ModelId[]} ids - The ids to add to the list
     * @param {boolean|number} append - When `true`, append items. When a number, insert at the provided position. \
     *                                  When `false`, remove all previous ids.
     */
    update(ids?: ModelId[], append: boolean|number =false) {
        if(typeof append == "number")
            this.ids.splice(append, 0, ...ids)
        else if(append && this.ids.length)
            this.ids = union(this.ids, ids)
        else
            this.ids = ids
    }

    /**
     * Update the list with the provided items.
     *
     * It first insert items in the repository before calling {@link ModelList.update}.
     *
     * @param {Model[]} items - The items to insert and add to the list.
     * @param ...args - Arguments passed down to {@link ModelList.update}.
     */
    updateWith(items: InstanceType<MT>[], append: boolean|number = false) {
        this.repo.insert(items)
        this.update(items.map(v => v.id), append)
    }
}

export default interface ModelList<MT extends ModelType> extends IModelList<MT> {
    ids: ModelId[]
    nextUrl: string|null
    prevUrl: string|null
    count: number|null
}
