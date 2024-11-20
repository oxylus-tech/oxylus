import {Repository} from 'pinia-orm'
import {Relation} from 'pinia-orm'
import {Response} from '@pinia-orm/axios'

import {aggregateValues} from '../utils'
import {Meta, Model} from '../models'
import type {Repos} from '../models'


interface IQuery<M extends Model> {
    repos: Repos
    repo: Repository<M>
}

interface IQueryFetch<M extends Model> extends Partial<object> {
    ids?: number[] | Set<number>
    repo?: Repository<Model>
    url?: string
    lookup?: string
    params?: object
}

interface IQueryAll<M extends Model> extends IQueryFetch<M> {
    nextKey?: string
    limit?: number
}

interface IQueryRequest<M extends Model> extends IQueryAll<M> {
    all?: boolean
}

type IRelations = { [s: string]: Relation }



export class Query<M extends Model> {
    constructor(repos: Repos, repo: Repository<M>) {
        this.repos = repos
        this.repo = repo
    }

    async request({all=false, ...opts} : IQueryRequest<M> ={}) : Promise<Response> {
        const func = all ? this.all : this.fetch
        return await func.apply(this, [opts])
    }

    async fetch({ids=null, repo=null, url=null, lookup="id__in", params=undefined, ...opts}: IQueryFetch<M> = {}) : Promise<Response> {
        repo ??= this.repo
        if(!url)
            url = repo.use?.meta?.url
        if(!url)
            throw Error("URL must be provided or Model must provide a `meta: Meta` with `url`")

        if(ids && lookup !== undefined) {
            params = {...(params || {})}
            params[lookup] = [...ids]
        }
        return await repo.api().get(url, {...opts, params})
    }

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

    async relations(objs: M[], fields: string[], opts = {}) : Promise<{[s: string]: Response}>
    {
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

    async relation(objs: Array<Model>, relation: string | Relation, {thin=false, ...opts} : {thin?: boolean}={}) : Promise<Response> {
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

        let ids = aggregateValues(objs, relation.foreignKey)
        let dbIds = null
        if(thin) {
            dbIds = new Set(Object.keys(repo2.pinia.state[key]?.value.data).filter(i => i in ids))
            const missingIds = ids.difference(dbIds)
            if(missingIds)
                ids = missingIds
        }

        const result = await this.request({ids, repo: repo2, ...opts})
        if(thin && dbIds) {
            const dbObjs = repo2.whereId(dbIds).get()
            result.entities = [...(result.entities || []), ...dbObjs]
        }
        return result
    }

    getRelations(fields: Array<string> | null): IRelations {
        const fields_ = this.repo.use?.fields()
        if(!fields)
            return {}
        let relations = Object.entries(fields_)
            .filter(([_, f]) => f instanceof Relation && f.related instanceof Model && f.related.meta)

        if(fields)
            relations = relations.filter(([k, f]) => fields.includes(k) && f.related?.meta)

        return relations.reduce((dst, [k, f]) => { dst[k] = f; return dst}, {} as IRelations)
    }
}

export interface Query<M extends Model> extends IQuery<M> {}


export function query(repos: Repos) {
    return <M extends Model>(repo: Repository<M>|string) => {
        if(typeof repo == "string")
            repo = repos[repo]
        return new Query(repos, repo)
    }
}


export function useQuery() {
    return { query, Query }
}
