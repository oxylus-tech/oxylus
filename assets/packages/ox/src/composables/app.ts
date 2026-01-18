import {computed, reactive, provide} from 'vue'
import type {ComputedRef, Reactive} from 'vue'

import {User, Model} from '../models'
import type {ModelType, Repos} from '../models'
import { useModels } from './models'
import { State, readJsonScript } from '../utils'


/**
 * Interface describing application data.
 *
 * Application data is initial data passed down to application from
 * Django generated page.
 */
export interface IAppData extends Record<string, any> {
    /** User's data. */
    user?: Record<string, any>
}

/**
 * This provide configuration to {@link AppContext}.
 */
export interface IAppOpts {
    /**
     * Root API url
     */
    apiUrl?: string
    /**
     * Id of `<script>` element containing initial application data.
     */
    dataEl?: string
    /**
     * Extra application data.
     */
    data?: IAppData
}

export interface IApp {
    /** Application state used to render application wide informations */
    state: State
    /** Data read from `<script>` JSON tag or options. */
    data: Record<string, any>
    /** API endpoint url (from `data`) */
    apiUrl: string
    /** Current user, based on `data.user` object */
    user: ComputedRef<User>,
}


/**
 * Initialize an application.
 *
 * It returns an {@link IApp} interface with:
 * - `data`: data read from provided `<script>` json tag or from options;
 * - `user`: current user model instance (not saved in repository);
 * - `state`: application state, that can be used to transmit general state info;
 *
 * Provides: `app`, `user`
 */
export function useApp(opts: IAppOpts, load: boolean = true): IApp {
    const state = new State()
    const data = opts.dataEl ? readJsonScript(opts.dataEl) : (opts.data || {})
    const user = new User(data?.user || {})

    if(opts.apiUrl)
        data.apiUrl = opts.apiUrl

    const app = {state, data, user, apiUrl: data.apiUrl}
    provide('app', app)
    provide('user', user)
    window.oxylus = {...window.oxylus, app} // FIXME: drop
    return app
}
