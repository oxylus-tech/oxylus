import {computed, provide, reactive, unref} from 'vue'
import {Repository} from 'pinia-orm'
import type {ComputedRef, Reactive, Ref} from 'vue'

import {Query} from './api'
import type {IQueryFetch} from './api'
import {Model} from '../models'
import type {Repos} from '../models'
import {collectAttr, assignNonEmpty, State} from '../utils'
import type {IObject} from '../utils'


export type FilterValue = number | string
export type Filters = IObject<FilterValue>


/**
 * Base interface of an List
 */
export interface IList<M extends Model> {
    /**
     * {@link Query} used to fetch list items.
     */
    query: Query<M>
    /**
     * Query's GET parameters used to filter the list.
     */
    filters?: Filters
    relations?: string[]
    url?: string
    dataKey: string
    prevKey: string
    nextKey: string
    countKey: string
}

/**
 * Component properties of an List.
 */
export interface IListProps {
    repo?: Object
    url: string
    relations?: string[]
    dataKey?: string
    prevKey?: string
    nextKey?: string
    countKey?: string
    showFilters: boolean
}


/**
 * Reactive List interface options
 */
export interface IRListOpts<M extends Model> extends IList<M> {
    value?: any
}

/**
 * Interface of reactive List
 */
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
export class List<M extends Model> {
    dataKey = "results"
    nextKey = "next"
    prevKey = "previous"
    countKey = "count"

    /**
     * Return a reactive object version.
     */
    static reactive<M extends Model>({value, ...options} : IRListOpts<M>): this {
        const obj = reactive(new this(options)) as IRList<M>
        obj.value = value
        obj.items = computed(() => obj.getItems())
        obj.prev = computed(() => obj.getSibling(obj.value, -1))
        obj.next = computed(() => obj.getSibling(obj.value, 1))
        return obj
    }

    constructor(options: IList<M>) {
        assignNonEmpty(this, options)
        if(!this.filters)
            this.filters = {}
        this.state = State.none()
        this.ids = []
        this.nextUrl = this.nextUrl ?? null
        this.prevUrl = this.prevUrl ?? null
    }

    /**
     * Items' repository
     */
    get repo() { return this.query.repo }

    /**
     * Items' model.
     */
    get model() { return this.repo.use }

    /**
     * Fetch items from API (using self's {@link Query.fetch}).
     */
    async fetch({append=false, ...opts}: IListFetch<M> ={}) {
        this.state.processing()
        opts = this.initOptions(opts)

        const result = await this.query.fetch(opts)
        const ids = [...collectAttr(result.entities, 'id')]
        this.ids = append ? this.ids.concat(ids) : ids

        this.nextUrl = result.response.data[this.nextKey] || null
        this.prevUrl = result.response.data[this.prevKey] || null
        this.count = result.response.data[this.countKey] || this.ids.length

        this.state.none()
        return result
    }

    /**
     * Get siblings of a value for the provided IRList.
     *
     * Arguments are the same as {@link List.getSiblingIndex}.
     *
     * **Note**: this method is only available on the reactive object.
     */
    getSibling<M extends Model>(value: Ref<M>|M, dir: number): M {
        const idx = this.getSiblingIndex(unref(value), dir)
        return idx > -1 ? this.items[idx] : null
    }


    /**
     * Get index of an item's sibling on specified direction.
     *
     * @param value - item to look sibling of.
     * @param dir - direction (next: `1`, previous: `-1`)
     * @return the index of the sibling or `-1` if none found.
     */
    getSiblingIndex(value: M, dir: number=1) : number {
        // TODO: fetch next or prev
        const idx: number = this.ids.indexOf(value.id)
        if(idx == -1)
            return -1

        const idx2 = idx+dir
        return (idx > -1 /*&& idx2 > -1*/ && idx2 < (this.count ?? this.ids.length)) ? idx2 : -1
    }

    /**
     * Return list items (fetched from repository)
     * @return an array of items.
     */
    getItems() : Array<M> {
        let items = this.query.repo.whereId(this.ids)
        if(this.relations)
            for(const relation of this.relations)
                items = items.with(relation)
        return items.get()
    }

    protected initOptions({filters=null, ...opts}) {
        if(!opts.relations && this.relations)
            opts.relations = this.relations
        if(!opts.dataKey && this.dataKey)
            opts.dataKey = this.dataKey
        if(!opts.url && this.url)
            opts.url = this.url

        if(filters)
            Object.assign(this.filters, filters)

        if(this.filters)
            opts.params = {...this.filters, ...(opts.params ?? [])}
        return opts
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

export interface List<M extends Model> extends IList<M> {
    state: State
    nextUrl?: string|null
    prevUrl?: string|null
    count?: number|null
    ids: number[]
}

export type ListOpts<M extends Model> = IRListOpts<M> & {
    query?: Query<M>,
    repos?: Repos,
    repo?: Repository<M>,
    value?: any
}


/**
 * Create a new {@link List} and provide it as `list`.
 *
 * If no `query` if provided, create one using `repo` and `repos`.
 */
export function useList<M extends Model>({repo=null,  repos=null, query=null, ...opts} : ListOpts<M>) : IRList<M>
{
    query ??= new Query(repo, repos)
    const list = List.reactive<M>({query, ...opts})
    provide('list', list)
    return list
}
