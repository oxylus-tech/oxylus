import {models as $models, useModels, query, locales} from '@oxylus/ox'
import type {IUseModelOpts, LocaleLoaders} from '@oxylus/ox'
import type {Model, Repos} from '@oxylus/ox/models'
import {Agent} from './models'

export const authLocales: LocaleLoaders = {
    ...locales,
    ox_auth: import.meta.glob('./locale/*.json', { import: 'default'})
}

/**
 * Use authentication models (wrapper over {@link useModel}).
 *
 * Fetch content types and permissions if not already present.
 */
export function useAuthModels(items: Array<typeof Model> = [], opts: IUseModelOpts = {}) : Repos {
    const repos = useModels([
        $models.User, $models.Group, $models.Permission, $models.ContentType,
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
