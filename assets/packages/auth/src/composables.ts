import {models as oxModels, useModels, query} from '@oxylus/ox'
import type {IUseModelOpts} from '@oxylus/ox'
import type {Model, Repos} from '@oxylus/ox/models'
import {Agent} from './models'

/**
 * Use authentication models (wrapper over {@link useModel}).
 *
 * Fetch content types and permissions if not already present.
 */
export function useAuthModels(items: Array<typeof Model> = [], opts: IUseModelOpts = {}) : Repos {
    const repos = useModels([
        oxModels.User, oxModels.Group, oxModels.Permission, oxModels.ContentType,
        ...items
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
