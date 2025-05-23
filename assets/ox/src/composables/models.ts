import { inject, provide, computed, unref } from 'vue'
import { getActivePinia } from 'pinia'
import { useRepo } from 'pinia-orm'
import { useAxiosRepo } from '@pinia-orm/axios'
import type {Ref} from 'vue'
import type {Repository} from 'pinia-orm'

import { Model, User, Permissions } from '../models'
import type {Repos, IPermissionItem} from '../models'


export type Models = (typeof Model)[] | {[name: string]: (typeof Model)}

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
 * Use provided pinia-orm models, returning an object with:
 * - repos: pinia-orm api repositories as dict by entity
 * - models: pinia-orm models
 *
 * It uses injected repos by default if already provided. You
 * can disable it through options.
 *
 * `provide()` those values if not already provided.
 */
export function useModels(models: Models, {useInject=true, useDefaults=true}: IUseModelOpts = {}) {
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

            // there might be a bug here, without useRepo, axios is
            // null on repositories
            useRepo(model)
            repos[model.entity] = useAxiosRepo(model) as Repository<Model>
        }

    !injected && provide("repos", repos)
    return repos
}


export function usePermissionsProps() {
    return {
        permissions: [String, Function, Object, Array],
    }
}


export function usePermissions(user: User|Ref<User>, perms: IPermissionItem[], value: Model) {
    const permissions = perms instanceof Permissions ? perms : new Permissions(perms)
    const allowed = computed(() => permissions.can(unref(user), unref(value)))
    return { permissions, allowed }
}
