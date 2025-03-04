import { cloneDeep, isEqual, pick } from 'lodash'
import { computed, isRef, ref, reactive, toRaw, watch, unref } from 'vue'
import type { ComputedRef, Reactive } from 'vue'
import type { Attribute, Repository } from 'pinia-orm'
import type { Response } from '@pinia-orm/axios'

import { reset, State, RObject } from '../utils'
import type { IObject } from '../utils'
import type { Model } from '../models'


/**
 * Editor class interface.
 */
export interface IEditor<T> {
    [index: string]: any

    /**
     * @property initial - initial value provided to the editor
     */
    initial: T
    /**
     * @property value - current edited value
     */
    value: T
    /**
     * @property name - editor name
     */
    name?: string
    /**
     * @property url - url to send value to
     */
    url?: string
    /**
    * @property state - current editor state. Set to `State.PROCESSING` when
    * saving instance.
    */
    state: State,

    /**
     * @property saved - callback to run after object has been saved
     */
    saved?: (item: T, editor: IEditor<T>) => void
}


/**
 * Reactive Editor class interface.
 */
export interface IREditor<T> extends Reactive<Editor<T>> {
    /**
     * Value has been edited.
     */
    edited: ComputedRef<boolean>
    /**
     * Input data are valid.
     */
    valid: ComputedRef<boolean>
}

export interface IEditorSend extends IObject {}

/**
 * An Editor handles data edition without changing original value.
 * It provides utilities in order to:
 * - detect if changes have been made;
 * - reset edited values to initial state;
 * - save data to server;
 *
 * Default implementation handles raw Object edition, but not saving data to the server.
 * Note: this might lead to errors due to reactivity when returned from composable.
 */
export default class Editor<T extends IObject> extends RObject<IREditor<T>> {
    state = State.none()
    value: T = {} as T

    static reactive<T extends IObject>({initial, ...opts}: IREditor<T>) : Reactive<Editor<T>> {
        const obj = super.reactive({initial: unref(initial), ...opts})
        //if(isRef(initial))
        //    obj.watch(initial, (v: T) => obj.reset(v))
        return obj
    }

    constructor(attrs: IEditor<T>, _attrs: IObject={})
    {
        super(attrs)
        if(!this.state)
            this.state = new State()

        this.value = {} as T
        this.reset(this.initial)
    }

    get errors() : any {
        return this.state.isError && this.state.data || null
    }

    /**
    * Reset editor editor data to initial.
    * When value is provided, reset initial to this value.
    */
    reset(initial: T|null = null): void {
        if(initial === null)
            initial = this.initial
        else
            this.initial = initial
        this._reset(initial)
        this.state.none()
    }

    _reset(value: T) {
        reset(this.value, value)
    }

    isValid(): boolean {
        return this._isValid()
    }

    _isValid(): boolean { return true }


    get edited(): boolean {
        return !isEqual(this.value, this.initial)
    }

    /**
     * Save data. It will `serialize()` value then `send()` it.
     *
     * Note: default implementation does not provide `send()` method
     * and thus will raise an error.
     *
     * @param [value] if provided use this instead of `this.value`.
     * @return state.
     */
    async save(value: T|null = null): Promise<State> {
        this.state.processing()

        if(!this.isValid())
            return this.state.error({
                "_": "Some of the input values are invalid"
            })
        value = this.serialize(value ?? this.value)

        const state = await this.send(value)
        if(state.isOk) {
            this.reset(state.data as T)
            this.saved?.(this.value, this)
        }
        else
            this.state = state
        return this.state
    }

    /** Serialize value before sending. */
    serialize<R>(value: T): any { return value }

    /** Send value (not implemented, MUST BE in subclasses). */
    send(_: IEditorSend): Promise<State> {
        throw "not implemented"
    }
}
export default interface Editor<T> extends IEditor<T> {}


/**
 * ModelEditor interface.
 */
interface IModelEditor<T extends Model> extends IEditor<T> {
    repo: Repository
    initial: T & {[k: string]: any}
    value: T & {[k:string]: any}
}

interface IModelEditorSend extends IEditorSend {
    id: number
}


/**
 * Editor sub-class used to edit model instances.
 */
export class ModelEditor<T extends Model> extends Editor<T> {
    fields: string[] = []

    constructor({repo, url, ...opts} : IModelEditor<T>) {
        if(url || "meta" in repo.use)
            url = url || repo.use.meta.url
        else
            throw Error("No url specified as parameter or in Model.meta.")
        super({url, repo, ...opts})
        this.fields = Object.keys((this.repo.use as typeof Model).fields())
    }

    _reset(val: T): void {
        const cls = this.initial.constructor as new(p: IObject) => T
        const params = cloneDeep(pick(val, this.fields))
        this.value = new cls(params)
    }

    get edited(): boolean {
        return !isEqual(pick(this.value, this.fields), pick(this.initial, this.fields))
    }

    serialize(value: T): {[k: string]: any} {
        return value.$toJson(null, {relations: false})
    }

    send(value: IModelEditorSend) : Promise<State> {
        let [func, url] = ["post", this.url]
        if(value.id) {
            url = `${url}${value.id}/`
            func = "put"
        }
        return this.repo.api()[func](url, value).then(
            (result: Response) => State.ok(result.entities[0]),
            (error: Response) => State.error(error.response.data)
        )
    }
}
export interface ModelEditor<T extends Model> extends IModelEditor<T> {}

// /**
//  * Editor subclass used to edit ordered arrays.
//  */
// export class ArrayEditor extends Editor {
//     _reset(val) { this.value = this.bind ? val : [...val] }
//     isEdited() { this.value != this.initial }
// }
//
//
// /**
//  * Editor subclass used to edit unordered arrays.
//  */
// export class CollectionEditor extends ArrayEditor {
//     isEdited() {
//         return this.value.length != this.initial.length ||
//             this.value.some(v => this.initial.indexOf(v) == -1)
//     }
// }
