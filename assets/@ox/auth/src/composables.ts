import {models as oxModels, useModels, query} from 'ox'
import type {IUseModelOpts} from 'ox'

/**
 * Use authentication models (wrapper over {@link useModel}).
 *
 * Fetch content types and permissions if not already present.
 */
export function useAuthModels(models: Array<models.Model> = [], opts: IUseModelOpts = {}) : Object {
    const repos = useModels([
        oxModels.User, oxModels.Group, oxModels.Permission, oxModels.ContentType,
        ...models
    ], opts)

    query(repos.contentTypes).allOnce()
    query(repos.permissions).allOnce()
    return repos
}
