import { State, assignNonEmpty } from '../utils';
import Query from './query';
/**
 * Base controller class that handles model fetching from the server in conjunction
 * with ORM framework.
 *
 * This provides:
 * - load items from the server and manage state accordingly (using {@link Query});
 * - items are retrieved from ORM store with specified relations;
 *
 * It does not:
 * - fetch items' related objects.
 *
 * This is used for {@link ModelDetail} and {@link ModelList}.
 */
export default class ModelController {
    state = State.none();
    save = true;
    /** The repository of contained items. */
    get repo() { return this.query.repo; }
    /** Current model. */
    get model() { return this.repo.use; }
    constructor(options = null) {
        options && assignNonEmpty(this, options);
    }
    /** Return orm's query to object. This will includes declared {@link List.relations}.
     *
     *   @param ids - optional id lookup
     *   @param first - if true, return the first item
     *   @return orm's query
     */
    queryset(ids = null, first = false) {
        let query = this.repo.query();
        if (this.relations)
            for (const relation of this.relations)
                query = query.with(relation);
        if (ids !== null)
            query = query.whereId(ids);
        return first ? query.first() : query;
    }
    /**
     * Fetch model instance from the server and select them.
     *
     * Calling this method updates state to:
     * - `PROCESSING`: request is being made;
     * - `NONE`: request has been done without error;
     * - `ERROR`: if an error happened;
     *
     * Flowchart:
     * - {@link ModelController.fetch}
     * - {@link ModelController.handleResponse}
     */
    async load(options = {}) {
        this.state.processing();
        let response = null;
        try {
            response = await this.fetch(options);
            response = await this.handleResponse(options, response);
        }
        catch (error) {
            console.log(error);
            this.state.error(error);
        }
        if (!this.state.isError)
            this.state.none();
        return response;
    }
    /** Fetch model instance from the server.
     *
     * Flowchart:
     * - {@link ModelController.getQueryParams}
     * - {@link Query.fetch}
     */
    async fetch(options = {}) {
        const opts = this.getQueryOptions(options);
        return await this.query.fetch(opts);
    }
    /** Handle response from the {@link ModelContainer.fetch}'s request. */
    async handleResponse(options, response) {
        // TODO: handle status code
        return response;
    }
    /** Get {@link Query.fetch} options. */
    getQueryOptions(options) {
        if (!options.relations && this.relations && this.fetchRelations)
            options.relations = this.relations;
        // if(!("dataKey" in options))
        //    options.dataKey = this.dataKey
        if (!options.url)
            options.url = this.url;
        if (!("save" in options))
            options.save = this.save;
        return options;
    }
}
