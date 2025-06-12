import { models as oxModels, useModels, query } from 'ox';
import { Agent } from './models';
/**
 * Use authentication models (wrapper over {@link useModel}).
 *
 * Fetch content types and permissions if not already present.
 */
export function useAuthModels(models = [], opts = {}) {
    const repos = useModels([
        oxModels.User, oxModels.Group, oxModels.Permission, oxModels.ContentType,
        ...models
    ], opts);
    query(repos.contentTypes).allOnce();
    query(repos.permissions).allOnce();
    return repos;
}
/**
 * Use Agent model, returning repositories.
 */
export function useAgents() {
    return useModels([Agent]);
}
