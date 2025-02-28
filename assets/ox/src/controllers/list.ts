import {computed, provide, reactive, unref} from 'vue'
import {Repository} from 'pinia-orm'
import type {ComputedRef, Reactive, Ref} from 'vue'

import {Model} from '../models'
import type {Repos} from '../models'
import {collectAttr, assignNonEmpty, State, RObject} from '../utils'
import type {IObject} from '../utils'

import Query from './query'
import type {IQueryFetch} from './query'

export type FilterValue = number | string
export type Filters = IObject<FilterValue>


/** Base interface of a List */
export interface IList<M extends Model> {
    /** Response's key used to return data */
    dataKey: string
    /** Response's key used to return URL to previous paginated items. */
    prevKey: string
    /** Response's key used to return URL to next paginated items.  */
    nextKey: string
    /** Response's key used to return total items count. */
    countKey: string
}

/** Reactive List interface options */
export interface IRListOpts<M extends Model> extends IList<M> {
    value?: any
}

/** Interface of reactive List */
export interface IRList<M extends Model> extends Reactive<List<M>> {
    value?: Ref<M>|M
    items: ComputedRef<M[]>
    prev: ComputedRef<M|null>
    next: ComputedRef<M|null>
}


/**
 * Arguments of {@link List.fetch}. It is passed down to {@link Query.fetch}.
 */
export interface IListFetch<M extends Model> extends IQueryFetch<M> {
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
 * const list = new List.reactive({
 *     query: new Query(repos.users, repos),
 *     relations: ['groups'],
 *     value,
 * })
 *
 * await list.fetch({url: '/users'})
 */
export default class List<M extends Model> extends RObject<IList<M>> {
    nextUrl: string|null = null
    prevUrl: string|null = null
    count: number|null = null
    ids: number[] = []

    dataKey = "results"
    nextKey = "next"
    prevKey = "previous"
    countKey = "count"

    /** Get items count. */
    get length() { return this.ids.length }

    /**
     * Return list items (fetched from repository)
     * @return an array of items.
     */
    get items() : Array<M> {
        return this.queryset(this.ids).get()
    }

    indexOf(id: number) { return this.ids.indexOf(id) }

    /** Fetch items from API (using self's {@link Query.fetch}). */
    async handleResponse({append=false, ...opts}: IListFetch<M>, response: Response): Promise<Response> {
        response = await super.handleResponse(opts, response)
        if(this.state.isError)
            return response

        const ids = [...collectAttr(result.entities, 'id')]
        this.ids = append ? this.ids.concat(ids) : ids

        this.nextUrl = result.response.data[this.nextKey] || null
        this.prevUrl = result.response.data[this.prevKey] || null
        this.count = result.response.data[this.countKey] || this.ids.length

        this.state.none()
        return result
    }

    /**
     * Fetch next items from API, override `url` using {@link List.nextUrl}.
     */
    async fetchNext(opts: IListFetch<M>) {
        return await this.fetch({...opts, url: this.nextUrl})
    }

    /**
     * Fetch previous items from API, override `url` using {@link List.prevUrl}.
     */
    async fetchPrev(opts: IListFetch<M>) {
        return await this.fetch({...opts, url: this.prevUrl})
    }
}

export default interface List<M extends Model> extends IList<M> {
    state: State
    nextUrl: string|null
    prevUrl: string|null
    count: number|null
    ids: number[]
}

export type ListOpts<M extends Model> = IRListOpts<M> & {
    query?: Query<M>,
    value?: any
}


export class Detail<M extends Model> extends RObject {
    query : Query<M>
    id : number|null = null
    relations: string[] = []

    select(id, fetch: boolean|null=null) {
        if(index !== null && id !== null)
            throw Error("Only one of `index` and `id` must be provided.")

        if(id)
            index = this.ids.indexOf(id)

        if(isRef(this.index))
            this.index.value = index
        else
            this.index = index
    }

    async fetch(options: IListFetch<M> ={}) {
        const result = await super.fetch(options)
        if(!options.append)
            this.select({index: -1})
        return result
    }
}
