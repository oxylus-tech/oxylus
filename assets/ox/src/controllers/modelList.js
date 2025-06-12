import { union, map } from 'lodash';
import ModelController from './modelController';
/**
 * Handle a list of model instances fetched using Rest Api. It is
 * used in model's panels.
 *
 * It uses {@link Query} object in order to fetch items and relations.
 *
 * Items references are tracked using repo's {@link RefCounter}.
 *
 *
 * @example
 * const value = ref(null)
 * const list = new ModelList.reactive({
 *     query: new Query(repos.users, repos),
 *     relations: ['groups'],
 *     value,
 * })
 *
 * await list.load({url: '/users'})
 */
export default class ModelList extends ModelController {
    // /** Reference counter key **/
    // $id: number
    ids = [];
    filters = {};
    nextUrl = null;
    prevUrl = null;
    count = null;
    page_size = null;
    dataKey = "results";
    nextKey = "next";
    prevKey = "previous";
    countKey = "count";
    get length() { return this.ids.length; }
    constructor(...args) {
        super(...args);
        // this.$id = this.refs.acquireKey()
    }
    /** Return index for id */
    indexOf(id) { return this.ids.indexOf(id); }
    /** Destroy list, ensuring cleaning behind the scenes */
    drop() {
        // this.refs.flush(this.$id)
        this.ids = [];
    }
    /** Reset list */
    reset(ids = []) {
        // this.refs.releaseAcquire(this.$id, this.ids, ids)
        this.ids = ids;
        this.nextUrl = null;
        this.prevUrl = null;
        this.count = this.ids.length;
    }
    /** Get item index by id */
    //findIndex(id: number): number { return this.items.findIndex((v) => v.id == id) }
    /** Add item if not present in list.
    *
    * @param id - item id to insert
    * @param index - if provided insert at this position
    * @return item index if already in the list, else insertion one
    */
    add(id, index = null) {
        const idx = this.ids.indexOf(id);
        if (idx != -1)
            return idx;
        // this.refs.acquire(this.$id, id)
        if (index !== null) {
            this.ids.splice(index, 0, id);
            return index;
        }
        this.ids.push(id);
        return this.ids.length - 1;
    }
    /** Remove item by id from list if present. */
    remove(id) {
        const idx = this.ids.indexOf(id);
        if (idx != -1) {
            this.ids.splice(index, 1);
            // this.refs.release(this.$id, id)
        }
    }
    /**
     * Get item id next to provided one at the specified direction.
     *
     * @param item - reference item
     * @param step - increment or decrement item index by this value.
     * @return the target item id or null if not found.
     */
    getSiblingIndex(item, step) {
        if (item === null)
            return -1;
        const index = this.ids.indexOf(item.id);
        const sibling = index >= 0 ? index + step : -1;
        return sibling >= 0 && sibling < this.ids.length ? sibling : -1;
    }
    /**
     * Fetch next items from API, override `url` using {@link ModelList.nextUrl}.
     */
    async loadNext(options) {
        return await this.load({ ...options, url: this.nextUrl });
    }
    /**
     * Fetch previous items from API, override `url` using {@link ModelList.prevUrl}.
     */
    async loadPrev(options) {
        return await this.load({ ...options, url: this.prevUrl });
    }
    getQueryOptions(options) {
        if (!("filters" in options) && this.filters)
            options.params = { ...this.filters, ...(options.params ?? []) };
        if (this.page_size)
            options.params = { ...options.params, page_size: this.page_size };
        return super.getQueryOptions(options);
    }
    /**
     * Handle response from API: update owned items list and related information (next/prev url, total count).
     *
     * Theses informations will not be set if `options.save == false`. You
     * can however call this method later if you need to defer persistence.
     */
    async handleResponse({ append = false, ...options }, response) {
        response = await super.handleResponse(options, response);
        if (!this.state.isError && options.save !== false) {
            const ids = map(response.entities, 'id');
            this.setIds(ids, append);
            this.nextUrl = response.response.data[this.nextKey] || null;
            this.prevUrl = response.response.data[this.prevKey] || null;
            this.count = response.response.data[this.countKey] || this.ids.length;
        }
        return response;
    }
    /**
     * Update ids with the provided ones.
     */
    setIds(ids, append = false) {
        if (typeof append == "number")
            this.ids.splice(append, 0, ...ids);
        else if (append && this.ids.length)
            this.ids = union(this.ids, ids);
        else
            this.ids = ids;
    }
}
