import { cloneDeep, isEqual, pick } from 'lodash'
import type { Attribute, Repository } from 'pinia-orm'
import type { Response } from '@pinia-orm/axios'

import { assignNonEmpty, reset, State } from '../utils'
import type { IObject } from '../utils'
import type { Model } from '../models'


/**
 * Editor class interface.
 */
export interface IEditor<T> {
    [index: string]: any

    /**
     * @property value - current edited value
     */
    value: T & {[k:string]: any}
    /**
     * @property initial - initial value provided to the editor
     */
    initial: T & {[k: string]: any}
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
export default class Editor<T extends IObject> {
    state = State.none()
    value: T & {[k:string]: any} = {} as T

    constructor(options: IEditor<T>)
    {
        options && assignNonEmpty(this, options)
        if(!this.state)
            this.state = new State()

        this.value = {} as T
        this.reset(this.initial)
    }

    get errors() : any {
        return this.state.isError && this.state.data || null
    }

    /**
    * Reset editor data to provided value.
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

    /** Reset value's data, implemented by editor subclasses */
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
export default interface Editor<T> extends IEditor<T> {
}

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
