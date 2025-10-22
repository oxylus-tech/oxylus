import type {Query as $Query} from 'pinia-orm'
import type {Response} from '@pinia-orm/axios'

import {State, assignNonEmpty} from '../utils'
import type {ModelType, ModelId, Repository} from '../models'

import Query from './query'
import type {IQueryFetch} from './query'


export interface IModelController<MT extends ModelType> {
    /** Response's key used to return data */
    dataKey?: string
    /** {@link Query} used to fetch list items. */
    query: Query<MT>
    /** Related fields to get from pinia orm's database and eventually fetch when items are retrieved from API.  */
    relations?: string[]
    /** Use this URL instead of model's defined one. */
    url?: string
    /** Fetch related fields from API when queried */
    fetchRelations: boolean
    /** If true (default value), save items in Pinia repository */
    save?: boolean
}

export interface IModelFetch<MT extends ModelType> extends IQueryFetch<MT> {
    /** Response's key used to return data */
    dataKey?: string
    /** If true, force loading all items */
    all: boolean
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
export default class ModelController<MT extends ModelType, O=IModelController<MT>> {
    state = State.none()
    save?: boolean = true

    /** The repository of contained items. */
    get repo(): Repository<MT> { return this.query.repo }

    /** Current model. */
    get model(): MT { return (this.repo.use as MT) }

    constructor(options: IModelController<MT>|null = null) {
        options && assignNonEmpty(this, options)
    }

    /** Return orm's query to object. This will includes declared {@link List.relations}.
     *
     *   @param ids - optional id lookup
     *   @return orm's query
     */
    queryset(ids: ModelId|ModelId[]|null=null) : $Query<InstanceType<MT>> {
        let query = this.repo.query()
        if(this.relations)
            for(const relation of this.relations)
                query = query.with(relation)

        if(ids !== null)
            query = query.whereId(ids)
        return query
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
    async load(options: IModelFetch<MT> = {all: false}): Promise<Response|null> {
        this.state.processing()
        let response = null
        try {
            response = await this.fetch(options)
            response = await this.handleResponse(options, response)
        }
        catch(error) {
            console.log(error)
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
    async fetch(options: IModelFetch<MT> = {all: false}) : Promise<Response> {
        const opts = this.getQueryOptions(options)
        const func = options.all ? this.query.fetch : this.query.all
        return await this.query.fetch(opts)
    }

    /** Handle response from the {@link ModelContainer.fetch}'s request. */
    async handleResponse(options: IModelFetch<MT>, response: Response): Promise<Response> {
        // TODO: handle status code
        return response
    }

    /** Get {@link Query.fetch} options. */
    protected getQueryOptions(options: IModelFetch<MT>): IQueryFetch<MT> {
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
export default interface ModelController<MT extends ModelType, O> extends IModelController<MT> {
    /** Current request's state. */
    state: State
}
