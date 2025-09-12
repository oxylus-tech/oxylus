import {models as oxModels, useModels, query} from '@oxylus/core'
import type {Repos, IUseModelOpts} from '@oxylus/core'
import {Agent} from './models'

/**
 * Use authentication models (wrapper over {@link useModel}).
 *
 * Fetch content types and permissions if not already present.
 */
export function useAuthModels(models: Array<models.Model> = [], opts: IUseModelOpts = {}) : Repos {
    const repos = useModels([
        oxModels.User, oxModels.Group, oxModels.Permission, oxModels.ContentType,
        ...models
    ], opts)

    query(repos.contentTypes).allOnce()
    query(repos.permissions).allOnce()
    return repos
}

/**
 * Use Agent model, returning repositories.
 */
export function useAgents(): Repos {
    return useModels([Agent])
}
