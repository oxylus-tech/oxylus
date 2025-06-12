import { inject, provide } from 'vue';
import { getActivePinia } from 'pinia';
import { useRepo as $useRepo } from 'pinia-orm';
import { Model, User, Repository } from '../models';
/**
 * Use repository for the provided model.
 */
export function useRepo(model) {
    $useRepo(model);
    const pinia = getActivePinia();
    Repository.useModel = model;
    return $useRepo((Repository), pinia);
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
export function useModels(models, { useInject = true, useDefaults = true, key = null } = {}) {
    var repos = useInject && (inject('repos') || {});
    const injected = (useInject && !!Object.keys(repos).length);
    if (!Array.isArray(models))
        models = Object.values(models);
    if (useDefaults)
        models.push(User);
    for (const model of models)
        if (model && model.entity) {
            if (model.entity in repos)
                continue;
            // there might be a bug here, without useRepo, axios is null on repositories
            repos[model.entity] = useRepo(model);
        }
    !injected && provide("repos", repos);
    return repos;
}
