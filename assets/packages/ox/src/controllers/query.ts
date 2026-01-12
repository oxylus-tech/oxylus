import {Relation} from 'pinia-orm'
import type {Response} from '@pinia-orm/axios'

import {collectAttr} from '../utils'
import {asRelation, getSourceKey} from '../models'
import type {Repos, ModelId, Model, ModelType, Repository} from '../models'


/** Interface of {@link Query} class. */
export interface IQuery<MT extends ModelType> {
    /** Model repository used to store results. */
    repo: Repository<MT>
    /**
     * Repositories used to store relations.
     *
     * This argument may be ignored if there is no need to fetch
     * relations.
     */
    repos: Repos
    // TODO: rename to fetchOptions
    /** Default options to set to all {@link Query.fetch} calls */
    opts: IQueryFetch<MT>
}


/** {@link Query.fetch} parameters. */
export interface IQueryFetch<MT extends ModelType> extends Partial<object> {
    /**
     * Fetch from this url.
     * Usage of this argument is exclusive from {@link IQueryFetch.id} and {@link IQueryFetch.path}.
     */
    url?: string
    /** Fetch item of this id, or items for those ids */
    id?: ModelId | ModelId[],
    /** Extra path to append on url. */
    path?: string,
    /** Model repository (instead of `Query.repo`'s one). */
    repo?: Repository<MT>
    /** Lookup field for ids (default: `id__in`). */
    lookup?: string
    /** Extra GET parameters. */
    params?: Record<string, any>
    /** Fetch items from thoses relations. */
    relations?: string[]
    /** If true (default value), save items in Pinia repository */
    save?: boolean
    /** Get data under this response's data key **/
    dataKey?: string
}


/**
 * {@link Query.all} parameters.
 */
export interface IQueryAll<MT extends ModelType> extends IQueryFetch<MT> {
    /**
     * Key of object returned by server that provide url to next items.
     */
    nextKey?: string
    /**
     * Provide a limit to the number of request to do consecutivelly.
     * If `-1`, no limit (**use with caution!**).
     */
    limit?: number
}


/**
 * This class allows to fetch objects from api, and their relations.
 *
 * It is a utility class built around ``pinia-orm/axios``, using
 * repositories' ``api().get`` method.
 *
 * It allows:
 *
 * - to fetch a model list or all values (using `next` key);
 * - to fetch relations of objects based on fields names;
 *
 * When fetching relations, please ensure that {@link Query.repos} is provided.
 *
 * @example
 * const query = new Query(repos.users, repos)
 *
 * // this fetch User model objects from API, then the related groups.
 * const result = await query.fetch({url: '/users', relations: ['groups']})
 */
export default class Query<MT extends ModelType> implements Query<MT> {
    /**
    * @param {Repos} [repos] all models repositories
    * @param {Repository<M>} [repo] the main repository
    */
    constructor(repo: Repository<MT>, repos: Repos|null=null, opts: IQueryFetch<MT>={}) {
        this.repo = repo
        this.repos = repos
        this.opts = opts
    }

    /** Fetch items from api. */
    async fetch(options: IQueryFetch<MT> = {}) : Promise<Response> {
        options = {...this.opts, ...options}
        let {url, id, repo, lookup, params, relations, path, ...opts} = options

        lookup ??= "id__in"
        repo ??= this.repo

        let ids = null
        if(Array.isArray(id)) {
            if(id.length == 1)
                id = id[0]
            else {
                ids = id; id = null
            }
        }

        if(!url) {
            const _id = id as ModelId
            url = repo.use?.meta?.getUrl({path, id: _id})
        }

        if(!id) {
            if(!("dataKey" in opts))
                opts.dataKey = repo.use?.config?.axiosApi?.dataKey
        }
        else
            opts.dataKey = null

        // TODO: multiple request for the different ids
        if(ids && lookup !== undefined) {
            if(id)
                throw Error("Both `ids` and `id` are provided while only one of those arguments is accepted.")
            params = {...(params || {})}
            params[lookup] = ids.filter(v=>v).join(',')
        }
        const response = await repo.api().get(url, {...opts, params})
        if(opts.save === false)
            response.entities = this.getEntities(response)

        if(relations)
            response.relations = await this.relations(response.entities, relations, {...opts, params: {}})
        return response
    }

    /** Post data to the server. */
    async post(data: Record<string, any>, {method="post", ...options}: IQueryFetch<MT>={}) : Promise<Response> {
        options = {...this.opts, ...options}
        let {url, id, repo, lookup, path, ...opts} = options
        repo ??= this.repo

        if(!url) {
            const _id = id as ModelId
            url = repo.use?.meta?.getUrl({path, id: _id})
        }

        if(!id) {
            if(!("dataKey" in opts))
                opts.dataKey = repo.use?.config?.axiosApi?.dataKey
        }
        else
            opts.dataKey = null

        const response = await repo.api()[method](url, data, opts)
        if(opts.save == false)
            response.entities = this.getEntities(response)
        return response
    }


    /** Get entities from response **/
    getEntities(response: Response) {
        const data = response.getDataFromResponse()
        if(Array.isArray(data))
            return data.map((dat) => this.repo.make(dat))
        else
            return [this.repo.make(data)]
    }

    /**
     * Fetch all items from api.
     *
     * @param [options.nextKey] response object key to get next url
     * @param [options.limit] max count of consecutive requests
     * @return Response of the first request, whoses ``entities`` has \
     * model instances of all requests.
     */
    async all({nextKey='next', limit=-1, ...opts} : IQueryAll<MT> ={}) : Promise<Response> {
        // FIXME: removed `flush`
        const result = await this.fetch({...opts})

        let url = result.response.data[nextKey]
        while(url) {
            const result2 = await this.fetch({...opts, url})
            if(result2.entities)
                result.entities = result.entities !== null ? result.entities.concat(result2.entities) : result2.entities
            url = result2.response.data[nextKey]
            if(limit>0) limit--
            if(!limit) break
        }
        return result
    }

    /**
     * Fetch all from API if repository is empty (see {@link Query.all}).
     *
     * For arguments see {@link Query.all}.
     *
     * Return null if no request has been made.
     */
    async allOnce(options: IQueryAll<MT> = {}) : Promise<Response|null> {
        const repo = options.repo ?? this.repo
        if(!repo.first())
            return await this.all(options)
        return null
    }

    /**
     * Fetch related objects for the provided list and field names.
     *
     * @param objs - the objects to get related ids from.
     * @param options.fields - list of field names.
     * @param options.opts - options to pass down to {@link Quey.relation}.
     * @return the resulting entities.
     */
    async relations(objs: InstanceType<MT>[], fields: string[], opts: IQueryAll<MT> = {}) : Promise<{[s: string]: Response}>
    {
        this._ensureRepos("relations")
        const entities: {[s: string]: Response} = {}
        const relations = this.repo.use?.fields()
        if(relations)
            for(const field of fields) {
                const relation = relations[field]
                if(relation instanceof Relation)
                    entities[field] = await this.relation(objs, relation, opts)
                else
                    throw Error(`Field ${field} is not a relation`)
            }
        return entities
    }

    protected _ensureRepos(funcName: string) {
        if(!this.repos)
            throw Error(`Query.repos is not provided although it is mandatory to call ${funcName}.`)
    }

    /**
     * Fetch related objects for the provided object list and field name.
     * It uses {@link Query.all} in order to fetch all items.
     *
     * @param objs - the objects to get ids from.
     * @param relation - objects' field or field name.
     * @param options - options to pass down to `all()`.
     */
    async relation(objs: Array<InstanceType<MT>>, relation: string | Relation, options: IQueryAll<MT> ={}) : Promise<Response> {
        this._ensureRepos("relations")

        const rel = asRelation(this.repo, relation)
        if(!rel)
            throw Error(`No Relation found for field ${relation}.`)

        const key = (<typeof Model>rel.related.constructor).entity
        const repo2 = this.repos[key]
        if(!repo2)
            throw Error(`No repository "${key}" found.`)

        const fk = getSourceKey(rel) as string
        if(!fk)
            throw Error(`No source ids attributes for ${relation}.`)
        const id = [... new Set(collectAttr(objs, fk))]
        const query = new Query(repo2, this.repos, {save: this.opts.save})
        return query.all({...options, id, repo: repo2})
    }
}

/** Return a new {@link Query} based on repo's entity. */
export function query<MT extends ModelType>(repo: string|Repository<MT>, repos?: Repos, opts: IQueryFetch<MT>|null=null): Query<MT> {
    if(typeof repo == "string") {
        if(!(repo in repos))
            throw Error(`Repository "${repo}" is not present in provided repositories.`)
        return new Query(repos[repo] as unknown as Repository<MT>, repos, opts)
    }
    return new Query(repo, repos, opts)
}
