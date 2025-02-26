import {Repository} from 'pinia-orm'
import {Relation} from 'pinia-orm'
import {Response} from '@pinia-orm/axios'

import {collectAttr} from '../utils'
import {Meta, Model} from '../models'
import type {Repos} from '../models'


/** Interface of {@link Query} class. */
export interface IQuery<M extends Model> {
    /** Model repository used to store results. */
    repo: Repository<M>
    /**
     * Repositories used to store relations.
     *
     * This argument may be ignored if there is no need to fetch
     * relations.
     */
    repos: Repos
}

/** {@link OxQuery} properties */
export interface IQueryProps<M extends Model> {
    /** Model repository */
    repo: Repository<M>
}


/** {@link Query.fetch} parameters. */
export interface IQueryFetch<M extends Model> extends Partial<object> {
    /**
     * Fetch from this url
     */
    url?: string
    /**
     * Fetch items with this id
     */
    ids?: number[] | Set<number>
    /**
     * Model repository (instead of `Query.repo`'s one)
     */
    repo?: Repository<Model>
    /**
     * Lookup field for ids (default: `id__in`)
     */
    lookup?: string
    /**
     * Extra GET parameters.
     */
    params?: object
    /**
     * Fetch items from thoses relations.
     */
    relations?: string[]
}

/**
 * {@link Query.all} parameters.
 */
export interface IQueryAll<M extends Model> extends IQueryFetch<M> {
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
 * This class allows to fetch objects from api, and optionally their
 * relations.
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
export default class Query<M extends Model> {
    /**
    * @param {Repos} [repos] all models repositories
    * @param {Repository<M>} [repo] the main repository
    */
    constructor(repo: string|Repository<M>, repos: Repos|null=null) {
        if(typeof(repo) == "string") {
            if(!repos)
                throw Error(`Repository "${repo}" is provided as string, but no "repos" argument is provided.`)
            if(!(repo in repos))
                throw Error(`Repository "${repo}" is not present in provided repositories.`)
            this.repo = repos[repo]
        }
        else
            this.repo = repo
        this.repos = repos
    }

    /**
     * Fetch items from api.
     *
     * @param [options.ids] select by ids
     * @param {Repository} [options.repo] use this repository instead of \
     * ``Query.repo``.
     * @param [options.url] use this url instead of repository's one.
     * @param [options.lookup] query GET parameters used to get ids.
     * @param [options.params] extra GET parameters
     * @param [options.opts] options passed down to ``repo.api.get``
     */
    async fetch({ids=null, repo=null, url=null, lookup="id__in", params=undefined, relations=null, ...opts}: IQueryFetch<M> = {}) : Promise<Response> {
        repo ??= this.repo
        if(!url)
            url = repo.use?.meta?.url
        if(!url)
            throw Error("URL must be provided or Model must provide a `meta: Meta` with `url`")

        if(ids && lookup !== undefined) {
            params = {...(params || {})}
            params[lookup] = [...ids]
        }
        const response = await repo.api().get(url, {...opts, params})

        if(relations)
            response.relations = await this.relations(response.entities, relations, {...opts, params: {}})
        return response
    }

    /**
     * Fetch all items from api.
     *
     * @param [options.nextKey] response object key to get next url
     * @param [options.limit] max count of consecutive requests
     * @return Response of the first request, whoses ``entities`` has \
     * model instances of all requests.
     */
    async all({nextKey='next', limit=-1, ...opts} : IQueryAll<M> ={}) : Promise<Response> {
        const result = await this.fetch(opts)

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
     * Fetch related objects for the provided list and field names.
     *
     * @param objs - the objects to get related ids from.
     * @param options.fields - list of field names.
     * @param options.opts - options to pass down to 'relation'.
     * @return the resulting entities.
     */
    async relations(objs: M[], fields: string[], opts = {}) : Promise<{[s: string]: Response}>
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
     * @param [options.thin] if True, only fetch objects not already present in repos.
     * @param options.opts - extra options to pass down to `all()`.
     */
    async relation(objs: Array<Model>, relation: string | Relation, {thin=false, ...opts} : {thin?: boolean}={}) : Promise<Response> {
        this._ensureRepos("relations")

        if(typeof relation == "string") {
            const fields = this.repo.use?.fields()
            if(!fields || !(fields[relation]))
                throw Error(`Field ${relation} is not a relation on ${this.repo.use} model`)
            relation = fields[relation] as Relation
        }

        const key = (<typeof Model>relation.related.constructor).entity
        const repo2 = this.repos[key]
        if(!repo2)
            throw Error(`No repository "${key}" found.`)

        let ids = collectAttr(objs, relation.foreignKey)
        let dbIds = null
        if(thin) {
            dbIds = new Set(Object.keys(repo2.pinia.state[key]?.value.data).filter(i => i in ids))
            const missingIds = ids.difference(dbIds)
            if(missingIds)
                ids = missingIds
        }

        const result = await this.all({ids, repo: repo2, ...opts})
        if(thin && dbIds) {
            const dbObjs = repo2.whereId(dbIds).get()
            result.entities = [...(result.entities || []), ...dbObjs]
        }
        return result
    }
}

export interface Query<M extends Model> extends IQuery<M> {}


/**
 * This composable return a new query from provided arguments.
 */
export function useQuery(repo: Repository, repos: Repos|null=null) {
    const query = new Query(repo, repos)
    provide('query', query)
    return query
}
