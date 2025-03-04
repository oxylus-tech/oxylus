import type {Repository, Query as $Query} from 'pinia-orm'
import type {Response} from '@pinia-orm/axios'

import {RObject, State} from '../utils'
import type {Model} from '../models'
import type {IObject} from '../utils'

import Query from './query'
import type {IQueryFetch} from './query'


export type FilterValue = number | string
export type Filters = IObject<FilterValue>


export interface IModelController<M extends Model> {
    /** Response's key used to return data */
    dataKey: string
    /** {@link Query} used to fetch list items. */
    query: Query<M>
    /** Query's GET parameters used to filter the list. */
    filters?: Filters
    /** Related fields to fetch when items are queried.  */
    relations?: string[]
    /** Use this URL instead of model's defined one. */
    url?: string
}

export interface IModelFetch<M extends Model> extends IQueryFetch<M> {
    /** Provide extra GET parameters. */
    filters?: Filters
    /** Response's key used to return data */
    dataKey: string
}


/**
 * Base controller class that handles model fetching from the server in conjunction
 * with ORM framework.
 *
 * This provides:
 * - load items from the server and manage state accordingly (using {@link Query});
 * - fetch filters;
 * - items are retrieved from ORM store with specified relations;
 *
 * It does not:
 * - fetch items' related objects.
 *
 * This is used for {@link ModelDetail} and {@link ModelList}.
 */
export default class ModelController<M extends Model, O=IModelController<M>> extends RObject<O> {
    state = State.none()
    filters?: Filters = null

    /** The repository of contained items. */
    get repo(): Repository<M> { return this.query.repo }

    /** The model of contained items. */
    get model(): typeof Model  { return this.repo.use }

    /** Return orm's query to object. This will includes declared {@link List.relations}.
     *
     *   @param ids - optional id lookup
     *   @param first - if true, return the first item
     *   @return orm's query
     */
    queryset(ids: number|number[]|null=null, first=false) : $Query<M> {
        let query = this.repo.query()
        if(this.relations)
            for(const relation of this.relations)
                query = query.with(relation)

        return ids ? query.whereId(ids) : query
    }

    /**
     * Fetch model instance from the server and select them.
     *
     * Calling this method updates state to:
     * - `PROCESSING`: request is being made;
     * - `NONE`: request has been done without error;
     * - `ERROR`: if an error happened;
     *
     * Flowchart:
     * - {@link ModelController.fetch}
     * - {@link ModelController.handleResponse}
     */
    async load(options: IModelFetch<M>): Promise<Response|null> {
        this.state.processing()
        let response = null
        try {
            response = await this.fetch(options)
            response = await this.handleResponse(options, response)
        }
        catch(error) {
            this.state.error(error)
        }
        if(!this.state.isError)
            this.state.none()
        return response
    }

    /** Fetch model instance from the server.
     *
     * Flowchart:
     * - {@link ModelController.getQueryParams}
     * - {@link Query.fetch}
     */
    async fetch(options: IModelFetch<M>) : Promise<Response> {
        const opts = this.getQueryOptions(options)
        return await this.query.fetch(opts)
    }

    /** Handle response from the {@link ModelContainer.fetch}'s request. */
    async handleResponse(options: IModelFetch<M>, response: Response): Promise<Response> {
        // TODO: handle status code
        return response
    }

    /** Get {@link Query.fetch} options. */
    protected getQueryOptions({filters=null, ...options}: IModelFetch<M>): IQueryFetch<M> {
        if(!options.relations && this.relations)
            options.relations = this.relations
        if(!options.dataKey && this.dataKey)
            options.dataKey = this.dataKey
        if(!options.url && this.url)
            options.url = this.url || this.model.meta?.url

        if(filters)
            Object.assign(this.filters, filters)

        if(this.filters)
            options.params = {...this.filters, ...(options.params ?? [])}
        return options
    }
}
export default interface ModelController<M extends Model, O> extends IModelController<M> {
    /** Current request's state. */
    state: State
}
