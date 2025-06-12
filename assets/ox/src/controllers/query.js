import { Repository, Relation } from 'pinia-orm';
import { collectAttr } from '../utils';
import { asRelation, getSourceKey } from '../models';
/**
 * This class allows to fetch objects from api, and their relations.
 *
 * It is a utility class built around ``pinia-orm/axios``, using
 * repositories' ``api().get`` method.
 *
 * It allows:
 *
 * - to fetch a model list or all values (using `next` key);
 * - to fetch relations of objects based on fields names;
 *
 * When fetching relations, please ensure that {@link Query.repos} is provided.
 *
 * @example
 * const query = new Query(repos.users, repos)
 *
 * // this fetch User model objects from API, then the related groups.
 * const result = await query.fetch({url: '/users', relations: ['groups']})
 */
export default class Query {
    /**
    * @param {Repos} [repos] all models repositories
    * @param {Repository<M>} [repo] the main repository
    */
    constructor(repo, repos = null, opts) {
        this.repo = repo;
        this.repos = repos;
        this.opts = opts;
    }
    /**
     * Fetch items from api.
     *
     * @param [options.ids] select by ids
     * @param {Repository} [options.repo] use this repository instead of \
     * ``Query.repo``.
     * @param [options.url] use this url instead of repository's one.
     * @param [options.id] fetch element with this id.
     * @param [options.ids] fetch elements with those ids
     * @param [options.lookup] query GET parameters used to get ids.
     * @param [options.params] extra GET parameters
     * @param [options.opts] options passed down to ``repo.api.get``
     */
    async fetch(options = {}) {
        options = { ...this.opts, ...options };
        let { url, id, ids, repo, lookup, params, relations, path, ...opts } = options;
        lookup ??= "id__in";
        repo ??= this.repo;
        if (ids?.length === 1) {
            id = ids[0];
            ids = null;
        }
        if (!url)
            url = repo.use?.meta?.getUrl({ path, id });
        if (!id) {
            if (!("dataKey" in opts))
                opts.dataKey = repo.use?.config?.axiosApi?.dataKey;
        }
        else
            opts.dataKey = null;
        if (ids && lookup !== undefined) {
            if (id)
                throw Error("Both `ids` and `id` are provided while only one of those arguments is accepted.");
            params = { ...(params || {}) };
            params[lookup] = [...ids];
        }
        const response = await repo.api().get(url, { ...opts, params });
        if (opts.save === false)
            response.entities = this.getEntities(response);
        if (relations)
            response.relations = await this.relations(response.entities, relations, { ...opts, params: {} });
        return response;
    }
    /** Get entities from response **/
    getEntities(response) {
        const data = response.getDataFromResponse();
        if (Array.isArray(data))
            return data.map((dat) => this.repo.make(dat));
        else
            return [this.repo.make(data)];
    }
    /**
     * Fetch all items from api.
     *
     * @param [options.nextKey] response object key to get next url
     * @param [options.limit] max count of consecutive requests
     * @return Response of the first request, whoses ``entities`` has \
     * model instances of all requests.
     */
    async all({ nextKey = 'next', limit = -1, flush = false, ...opts } = {}) {
        const result = await this.fetch({ flush, ...opts });
        let url = result.response.data[nextKey];
        while (url) {
            const result2 = await this.fetch({ ...opts, url });
            if (result2.entities)
                result.entities = result.entities !== null ? result.entities.concat(result2.entities) : result2.entities;
            url = result2.response.data[nextKey];
            if (limit > 0)
                limit--;
            if (!limit)
                break;
        }
        return result;
    }
    /**
     * Fetch all from API if repository is empty (see {@link Query.all}).
     *
     * For arguments see {@link Query.all}.
     *
     * Return null if no request has been made.
     */
    async allOnce(options = {}) {
        const repo = options.repo ?? this.repo;
        if (!repo.first())
            return await this.all(options);
        return null;
    }
    /**
     * Fetch related objects for the provided list and field names.
     *
     * @param objs - the objects to get related ids from.
     * @param options.fields - list of field names.
     * @param options.opts - options to pass down to {@link Quey.relation}.
     * @return the resulting entities.
     */
    async relations(objs, fields, opts = {}) {
        this._ensureRepos("relations");
        const entities = {};
        const relations = this.repo.use?.fields();
        if (relations)
            for (const field of fields) {
                const relation = relations[field];
                if (relation instanceof Relation)
                    entities[field] = await this.relation(objs, relation, opts);
                else
                    throw Error(`Field ${field} is not a relation`);
            }
        return entities;
    }
    _ensureRepos(funcName) {
        if (!this.repos)
            throw Error(`Query.repos is not provided although it is mandatory to call ${funcName}.`);
    }
    /**
     * Fetch related objects for the provided object list and field name.
     * It uses {@link Query.all} in order to fetch all items.
     *
     * @param objs - the objects to get ids from.
     * @param relation - objects' field or field name.
     * @param options - options to pass down to `all()`.
     */
    async relation(objs, relation, options = {}) {
        this._ensureRepos("relations");
        const rel = asRelation(this.repo, relation);
        if (!rel)
            throw Error(`No Relation found for field ${relation}.`);
        const key = rel.related.constructor.entity;
        const repo2 = this.repos[key];
        if (!repo2)
            throw Error(`No repository "${key}" found.`);
        const fk = getSourceKey(rel);
        if (!fk)
            throw Error(`No source ids attributes for ${relation}.`);
        const ids = [...new Set(collectAttr(objs, fk))];
        const query = new Query(repo2, this.repos);
        return query.all({ ...options, ids, repo: repo2 });
    }
}
/** Return a new {@link Query} based on repo's entity. */
export function query(repo, repos, opts = null) {
    if (typeof repo == "string") {
        if (!(repo in repos))
            throw Error(`Repository "${repo}" is not present in provided repositories.`);
        return new Query(repos[repo], repos, opts);
    }
    return new Query(repo, repos, opts);
}
