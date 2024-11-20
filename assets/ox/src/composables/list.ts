import {computed, reactive, unref} from 'vue'
import {Repository} from 'pinia-orm'
import type {ComputedRef, Reactive, Ref} from 'vue'

import {Query} from './api'
import {Model} from '../models'
import type {Repos} from '../models'
import {aggregateValues, State} from '../utils'
import type {IObject} from '../utils'


export type FilterValue = number | string
export type Filters = IObject<FilterValue>


export interface IApiList<M extends Model> {
    query: Query<M>
    relations?: string[]|null
    url?: string|null
    filters?: Filters
    keys?: IObject<string>
}


export interface IRApiListOpts<M extends Model> extends  IApiList<M> {
    value?: any
}



export interface IRApiList<M extends Model> extends Reactive<ApiList<M>> {
    items: ComputedRef<M[]>
    prev: ComputedRef<M|null>
    next: ComputedRef<M|null>
}


function sibling<M extends Model>(obj: IRApiList<M>, value: Ref, dir: number): M {
    const idx = obj.getSiblingIdx(unref(value), -1)
    return idx > -1 ? obj.items.value[idx] : null
}


export class ApiList<M extends Model> {
    static reactive<M extends Model>({query, value, ...opts} : IRApiListOpts<M>): IRApiList<M> {
        const obj = reactive(new this({query, ...opts})) as IRApiList<M>
        obj.items = computed(() => obj.getItems())
        obj.prev = computed(() => sibling(obj, value, -1))
        obj.next = computed(() => sibling(obj, value, 1))
        return obj
    }

    constructor({query, ...config}: IApiList<M>) {
        this.query = query
        this.relations = config.relations ?? null
        this.filters = config.filters ?? {}
        this.keys = config.keys ?? null
        this.url = config.url ?? null

        this.state = State.none()
        this.nextUrl = null
        this.prevUrl = null

        this.ids = []
    }

    get repo() { return this.query.repo }

    async fetch({append=false, ...opts}={}) {
        this.state.processing()
        opts = this.initOptions(opts)

        const result = await this.query.request(opts)
        if(this.relations && result.entities) {
            result.relations = await this.query.relations(result.entities, this.relations, {...opts, all: true, params: {}})
        }

        const ids = [...aggregateValues(result.entities, 'id')]
        this.ids = append ? this.ids.concat(ids) : ids

        this.nextUrl = result.response.data[this.keys?.next] || null
        this.prevUrl = result.response.data[this.keys?.prev] || null
        this.count = result.response.data[this.keys?.count] || this.ids.length

        this.state.none()
        return result
    }

    getSiblingIdx(value: M, dir: number=1) : number {
        // TODO: fetch next or prev
        const idx: number = this.ids.indexOf(value.id)
        if(idx == -1)
            return -1

        const idx2 = idx+dir
        return (idx > -1 /*&& idx2 > -1*/ && idx2 < (this.count ?? this.ids.length)) ? idx2 : -1
    }

    getItems() : Array<M> {
        let items = this.query.repo.whereId(this.ids)
        if(this.relations)
            for(const relation of this.relations)
                items = items.with(relation)
        return items.get()
    }

    initOptions({filters=null, ...opts}) {
        if(!opts.dataKey && this.keys?.data)
            opts.dataKey = this.keys.data
        if(!opts.url && this.url)
            opts.url = this.url

        if(filters)
            Object.assign(this.filters, filters)

        if(this.filters)
            opts.params = {...this.filters, ...(opts.params ?? [])}
        return opts
    }

    async fetchNext(opts: IObject) {
        return await this.fetch({...opts, url: this.nextUrl})
    }

    async fetchPrev(opts: IObject) {
        return await this.fetch({...opts, url: this.prevUrl})
    }
}
export interface ApiList<M extends Model> extends IApiList<M> {
    state: State
    nextUrl?: string|null
    prevUrl?: string|null
    count?: number|null
    ids: number[]
}


export type ApiListOpts<M extends Model> = IRApiListOpts<M> & {
    query?: Query<M>,
    repos?: Repos,
    repo?: Repository<M>,
    value?: any
}

export function apiList<M extends Model>({repo=null,  repos=null, query=null, ...opts} : ApiListOpts<M>) : IRApiList<M>
{
    query ??= new Query(repos, repo)
    return ApiList.reactive<M>({query, ...opts})
}


export const apiListProps = {
    repo: Object,
    url: String,
    relations: {type: Array},
    value: {type: Object},
    dataKey: {type: String, default: 'results'},
    prevKey: {type: String, default: 'previous'},
    nextKey: {type: String, default: 'next'},
    countKey: {type: String, default: 'count'},
}

export function useApiListProps() : IObject {
    return apiListProps
}


export function useApiList<M extends Model>(props: typeof apiListProps, opts: IObject) : IRApiList<M> {
    return apiList({
        ...opts,
        repo: props.repo,
        url: props.url,
        relations: props.relations,
        value: props.value,
        keys: {
            data: props.dataKey,
            next: props.nextKey,
            prev: props.prevKey,
            count: props.countKey,
        }
    })
}
