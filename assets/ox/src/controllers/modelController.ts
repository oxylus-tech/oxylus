import type {Response} from '@pinia-orm/axios'

import {RObject, State} from '../utils'
import type {Model} from '../models'
import type {IObject} from '../utils'

import Query from './query'
import type {IQueryFetch} from './query'


export type FilterValue = number | string
export type Filters = IObject<FilterValue>


export interface IModelController<M extends Model,O> {
    /** {@link Query} used to fetch list items. */
    query: Query<M>
    /** Query's GET parameters used to filter the list. */
    filters?: Filters
    /** Related fields to fetch when items are queried.  */
    relations?: string[]
    /** Use this URL instead of model's defined one. */
    url?: string
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
export default class ModelController<M extends Model, O> extends RObject<O> {
    state = State.none()
    filters: IObject = {}

    /** The repository of contained items. */
    get repo(): Repository { return this.query.repo }

    /** The model of contained items. */
    get model(): typeof Model  { return this.repo.use }

    /** Return orm's query to object. This will includes declared {@link List.relations}.
     *
     *   @param ids - optional id lookup
     *   @param first - if true, return the first item
     *   @return orm's query
     */
    queryset(ids: number|number[]|null=null, first=false) {
        let query = this.query.repo
        if(this.relations)
            for(const relation of this.relations)
                query = query.with(relation)

        query = ids ? query.whereId(ids) : query
        return first ? query.get().pop() : query
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
    async load(options: IQueryFetch<M>): Promise<Response> {
        this.state.processing()
        try {
            if(!options.url && this.url)
                options.url = this.url

            let response = await fetch(options)
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
    async fetch(options: IQueryFetch<M>) : Promise<Response> {
        options = this.getQueryParams(options)
        return await this.query.fetch(opts)
    }

    /** Handle response from the {@link ModelContainer.fetch}'s request. */
    async handleResponse(options: IQueryFetch, response: Response): Promise<Response> {
        // TODO: handle status code
        return response
    }

    /** Get {@link Query.fetch} options. */
    protected getQueryParams({filters=null, ...opts}: IModelFetch<M>): IQueryFetch<M> {
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
}
export default interface ModelController<M extends Model, O> extends IModelController<M> {
    /** Current request's state. */
    state: State
}
