import {computed, reactive, provide} from 'vue'
import type {ComputedRef, Reactive} from 'vue'

import {User, Model} from '../models'
import type {Repos} from '../models'
import { useModels } from './models'
import { State } from '../utils'
import type {IObject} from '../utils'


/**
 * Interface describing application data.
 *
 * Application data is initial data passed down to application from
 * Django generated page.
 */
export interface IAppData extends IObject {
    //! User's data.
    user?: IObject
}

/**
 * This provide configuration to {@link AppContext}.
 */
export interface IApp {
    /**
     * Root API url
     */
    apiUrl?: string
    /**
     * Id of `<script>` element containing initial application data.
     */
    dataEl?: string
    /**
     * Models used by application.
     */
    models?: (typeof Model)[]
    /**
     * Extra application data.
     */
    data?: IAppData
}


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
    static reactive(opts: IApp) : IRAppContext {
        const obj = reactive(new this(opts)) as IRAppContext
        obj.user = computed(() => new User(obj.data?.user || {}))
        return obj
    }

    constructor(opts: IApp = {}) {
        Object.assign(this, opts)
        this.state = State.none()
        this.showState = false
    }

    /**
     * Load data into AppData. If no `value` is provided, read it from
     * source element.
     */
    load(value: any = undefined) {
        if(this.dataEl !== undefined) {
            if(value === undefined)
                value = this.readData(this.dataEl)
            value.dataEl = this.dataEl
            this.data = value
        }

        if(this.models !== undefined) {
            this.repos = useModels(this.models)
        }
    }

    /**
     * Read data from the context of provided source element.
     * @param {String} el - id of the DOM element.
     * @return {Object} read data
     */
    readData(dataEl: string): any {
        const el = document.getElementById(dataEl)
        if(!el)
            throw `Element {elementId} not found`;
        return el.innerText ? JSON.parse(el.innerText) : {};
    }
}
export interface AppContext extends IApp {
    /** Models' repositories */
    repos?: Repos
    /**
     * Application level state. This can be displayed to user using
     * {@link AppContext.showState}.
     *
     * This element can display errors to users.
     */
    state: State
    /**
     * Show application state to user.
     */
    showState: boolean
}
export interface IRAppContext extends Reactive<AppContext> {
    user: ComputedRef<User>
}


/**
 * Create a new {@link AppContext} and provide the following values:
 * - `context`: {@link AppContext} object;
 * - `user`: current {@link models.User};
 */
export function useAppContext(opts: IApp, load: boolean = true): AppContext {
    const obj = AppContext.reactive(opts)
    load && obj.dataEl && obj.load()

    provide('context', obj)
    provide('user', obj.user)
    // provide('repos')
    return obj
}
