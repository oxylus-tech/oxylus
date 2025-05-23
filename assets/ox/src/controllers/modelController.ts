import type {Repository, Query as $Query} from 'pinia-orm'
import type {Response} from '@pinia-orm/axios'

import {State, assignNonEmpty} from '../utils'
import type {Model} from '../models'

import Query from './query'
import type {IQueryFetch} from './query'


export interface IModelController<M extends Model> {
    /** Response's key used to return data */
    dataKey: string
    /** {@link Query} used to fetch list items. */
    query: Query<M>
    /** Related fields to get from pinia orm's database and eventually fetch when items are retrieved from API.  */
    relations?: string[]
    /** Use this URL instead of model's defined one. */
    url?: string
    /** Fetch related fields from API when queried */
    fetchRelations: boolean
    /** If true (default value), save items in Pinia repository */
    save: boolean
}

export interface IModelFetch<M extends Model> extends IQueryFetch<M> {
    /** Response's key used to return data */
    dataKey?: string
}


/**
 * Base controller class that handles model fetching from the server in conjunction
 * with ORM framework.
 *
 * This provides:
 * - load items from the server and manage state accordingly (using {@link Query});
 * - items are retrieved from ORM store with specified relations;
 *
 * It does not:
 * - fetch items' related objects.
 *
 * This is used for {@link ModelDetail} and {@link ModelList}.
 */
export default class ModelController<M extends Model, O=IModelController<M>> {
    state = State.none()
    save = true

    /** The repository of contained items. */
    get repo(): Repository<M> { return this.query.repo }

    /** Current model. */
    get model(): typeof Model { return (this.repo.use as typeof Model) }

    constructor(options: IModelController<M>|null = null) {
        options && assignNonEmpty(this, options)
    }

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
    async load(options: IModelFetch<M> = {}): Promise<Response|null> {
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
    async fetch(options: IModelFetch<M> = {}) : Promise<Response> {
        const opts = this.getQueryOptions(options)
        return await this.query.fetch(opts)
    }

    /** Handle response from the {@link ModelContainer.fetch}'s request. */
    async handleResponse(options: IModelFetch<M>, response: Response): Promise<Response> {
        // TODO: handle status code
        return response
    }

    /** Get {@link Query.fetch} options. */
    protected getQueryOptions(options: IModelFetch<M>): IQueryFetch<M> {
        if(!options.relations && this.relations && this.fetchRelations)
            options.relations = this.relations
        // if(!("dataKey" in options))
        //    options.dataKey = this.dataKey
        if(!options.url)
            options.url = this.url
        if(!("save" in options))
            options.save = this.save
        return options
    }
}
export default interface ModelController<M extends Model, O> extends IModelController<M> {
    /** Current request's state. */
    state: State
}
