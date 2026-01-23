import type {Constructor, Model as $Model} from 'pinia-orm'
import { inject, provide } from 'vue'
import { getActivePinia } from 'pinia'
import { useRepo as $useRepo } from 'pinia-orm'

import type {ModelType, RefRepos} from '../models'
import { User, RefRepository } from '../models'


export type Models = ModelType[] | Record<string, ModelType>

/**
 * {@link useModels} options.
 */
export interface IUseModelOpts {
    /** Use injected repository if already present. */
    useInject?: boolean
    /** Use default models */
    useDefaults?: boolean
}


/**
 * Use repository for the provided model, returning a {@link RefRepository}.
 */
export function useRepo<MT extends ModelType>(model: MT): RefRepository<MT> {
    $useRepo(model)
    const pinia = getActivePinia()
    RefRepository.useModel = model as unknown as typeof $Model
    return $useRepo(RefRepository<MT>, pinia)
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
export function useModels(models: Models, {useInject=true, useDefaults=true}: IUseModelOpts = {}): RefRepos
{
    var repos : RefRepos = useInject && (inject('repos', null) || {}) as RefRepos
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
