import { provide, computed, unref } from 'vue'
import { getActivePinia } from 'pinia'
import { useRepo } from 'pinia-orm'
import { useAxiosRepo } from '@pinia-orm/axios'
import type {Ref} from 'vue'
import type {Repository} from 'pinia-orm'

import { Model, User, Permissions } from '../models'
import type {Repos, IPermissionItem} from '../models'


export type Models = (typeof Model)[] | {[name: string]: (typeof Model)}

/**
 * Use provided pinia-orm models, returning an object with:
 * - repos: pinia-orm api repositories as dict by entity
 * - models: pinia-orm models
 *
 * `provide()` those values
 */
export function useModels(models: Models, defaults: boolean = true) {
    const repos: Repos = {}

    if(!Array.isArray(models))
       models = Object.values(models)

    if(defaults && !(models as (typeof Model)[]).includes(User))
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

    provide("models", models)
    provide("repos", repos)
    return { models, repos, }
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
