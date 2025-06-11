import type {Constructor, Model} from 'pinia-orm'
import { inject, provide } from 'vue'
import { getActivePinia } from 'pinia'
import { useRepo as $useRepo } from 'pinia-orm'

import type {Repos} from '../models'
import { Model, User, Repository } from '../models'


export type Models = (typeof Model)[] | {[name: string]: (typeof Model)}

/**
 * {@link useModels} options.
 */
export interface IUseModelOpts {
    /** Use injected repository if already present. */
    useInject?: boolean
    /** Use default models */
    useDefaults?: boolean
    /** Store subkey (see {@link useModel}) **/
}


/**
 * Use repository for the provided model.
 */
export function useRepo<M extends Model>(model: Constructor<M>): Repository<M> {
    $useRepo(model)
    const pinia = getActivePinia()
    Repository.useModel = model as unknown as typeof Model
    return $useRepo(Repository<Model>, pinia)
}

/**
 * Use provided pinia-orm models, returning an object with:
 * - repos: pinia-orm api repositories as dict by entity
 * - models: pinia-orm models
 *
 * It uses injected repos by default if already provided. You
 * can disable it through options.
 *
 * `provide()` those values if not already provided.
 */
export function useModels(models: Models, {useInject=true, useDefaults=true, key=null}: IUseModelOpts = {}): Record<str, Repository<Model>>
{
    var repos : Repos = useInject && (inject('repos') || {}) as Repos
    const injected = (useInject && !!Object.keys(repos).length)

    if(!Array.isArray(models))
       models = Object.values(models)

    if(useDefaults)
       models.push(User)

    for(const model of models)
        if(model && model.entity) {
            if(model.entity in repos)
                continue

            // there might be a bug here, without useRepo, axios is null on repositories
            repos[model.entity] = useRepo(model)
        }

    !injected && provide("repos", repos)
    return repos
}
