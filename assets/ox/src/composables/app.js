import { computed, reactive, provide } from 'vue';
import { User, Model } from '../models';
import { useModels } from './models';
import { State } from '../utils';
/**
 * This class provides context for Oxylus application.
 *
 * Which is:
 * - initial data: this is loaded from `<script>` HTML object.
 * - models: it will create adequate `pinia-orm/axios` repositories for them.
 *
 * The context is provided to Vue components in order to allow them
 * to access global information, such as current user or Panel.
 */
export class AppContext {
    static reactive(opts) {
        const obj = reactive(new this(opts));
        obj.user = computed(() => new User(obj.data?.user || {}));
        return obj;
    }
    constructor(opts = {}) {
        Object.assign(this, opts);
        this.state = State.none();
        this.showState = false;
    }
    /**
     * Load data into AppData. If no `value` is provided, read it from
     * source element.
     */
    load(value = undefined) {
        if (this.dataEl !== undefined) {
            if (value === undefined)
                value = this.readData(this.dataEl);
            value.dataEl = this.dataEl;
            this.data = value;
        }
        if (this.models !== undefined) {
            this.repos = useModels(this.models);
        }
    }
    /**
     * Read data from the context of provided source element.
     * @param {String} el - id of the DOM element.
     * @return {Object} read data
     */
    readData(dataEl) {
        const el = document.getElementById(dataEl);
        if (!el)
            throw `Element {elementId} not found`;
        return el.innerText ? JSON.parse(el.innerText) : {};
    }
}
/**
 * Create a new {@link AppContext} and provide the following values:
 * - `context`: {@link AppContext} object;
 * - `user`: current {@link models.User};
 */
export function useAppContext(opts, load = true) {
    const obj = AppContext.reactive(opts);
    load && obj.dataEl && obj.load();
    provide('context', obj);
    provide('user', obj.user);
    // provide('repos')
    return obj;
}
