import {computed, reactive, provide} from 'vue'
import type {ComputedRef, Reactive} from 'vue'

import {User, Model} from '../models'
import type {Repos} from '../models'
import { Panel } from './panel'
import { useModels } from './models'
import type {IObject} from '../utils'


export interface IAppData extends IObject {
    panel: string
    user: IObject
}

export interface IApp {
    apiUrl?: string
    dataEl?: string
    models?: (typeof Model)[]
    data?: IAppData
}


/**
 * Provide initial application data.
 */
export class AppContext {
    static reactive(opts: IApp) : IRAppContext {
        const obj = reactive(new this(opts)) as IRAppContext
        obj.user = computed(() => new User(obj.data?.user || {}))
        return obj
    }

    constructor({apiUrl=undefined, dataEl=undefined, models=undefined, data=undefined}: IApp = {}) {
        this.apiUrl = apiUrl
        this.dataEl = dataEl
        this.models = models
        this.data = data
        this.panel = new Panel()
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
            if(this.panel && this.data.panel)
                this.panel.value = value
        }

        if(this.models !== undefined) {
            this.repos = useModels(this.models).repos
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
    repos?: Repos
    panel: Panel
}
export interface IRAppContext extends Reactive<AppContext> {
    user: ComputedRef<User>
}


export function useAppContext(opts: IApp, load: boolean = true): IRAppContext {
    const obj = AppContext.reactive(opts)
    load && obj.dataEl && obj.load()

    provide('context', obj)
    provide('user', obj.user)
    provide('panel', obj.panel)
    // provide('repos')
    return obj
}
