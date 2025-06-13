import { cloneDeep, isEqual, pick } from 'lodash'
import type { Attribute, Repository } from 'pinia-orm'
import type { Response } from '@pinia-orm/axios'

import Config from '../config'
import { assignNonEmpty, reset, State } from '../utils'


export interface IEditorProps<T> {
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
     * @property saved - callback to run after object has been saved
     */
    saved?: (item: T, editor: IEditor<T,IEditorProps<T>>) => void
}


/**
 * Editor class interface.
 */
export interface IEditor<T,P extends IEditorProps<T>> extends IEditorProps<T> {
    [index: string]: any

    props: P
    /**
     * @property value - current edited value
     */
    value: T & Record<string, any>
    /** Empty value, if not provided generated */
    empty: T
    /**
    * @property state - current editor state. Set to `State.PROCESSING` when
    * saving instance.
    */
    state: State
}


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
export default class Editor<T extends Record, P extends IEditorProps<T>> {
    state = State.none()
    value: T & Record<string, any> = {} as T

    constructor(options: IEditor<T,P>)
    {
        options && assignNonEmpty(this, options)
        if(!this.state)
            this.state = new State()

        this.value ??= {} as T
        this.empty ??= {} as T
        this.initial ??= this.props.initial || this.empty
        this.valid = true
        this.reset(this.initial)
    }

    get name(): string { return this.props.name }
    get url(): string|null { return this.props.url }

    get errors() : any {
        return this.state.isError && this.state.data || null
    }

    error(field: string): string|string[] {
        const data = this.state.isError && this.state.data?.[field]
        if(data)
            return this.initial[field] != this.value[field] && data.join('\n') || ''
        return ''
    }

    /** Discard changes, resetting to initial value. */
    discard() {
        this.reset(this.initial)
    }

    /**
     * Reset editor data to provided value.
     * When value is provided, reset initial to this value.
     */
    reset(value: T|null = null) {
        reset(this.value, value ?? this.empty)
        this.state.none()
    }

    /** Return wether value has been edited or not */
    isEdited(): boolean {
        return !isEqual(this.value, this.initial)
    }

    /**
     * Save data. It will `serialize()` value then `send()` it.
     *
     * Note: default implementation does not provide `send()` method
     * and thus will raise an error.
     *
     * @param [value] if provided use this instead of `this.value`. When a form is provided, it will get
     * @return state.
     */
    async save(value: T|FormData|null = null, params:Record={}): Promise<State> {
        this.state.processing()

        if(this.valid === false)
            return this.state.error({
                "_": "Some of the input values are invalid"
            })

        value ??= this.value
        if(value instanceof FormData)
            params.headers = {
                ...Config.axiosConfig.headers,
                'Content-Type': 'multipart/form-data',
                ...params.headers,
            }
        else
            value = this.serialize(value)

        const state = await this.send(value, params)
        if(state.isOk) {
            this.reset(state.data as T, true)
            this.initial = cloneDeep(this.value)
            this.saved?.(this.value)
        }
        else
            this.state = state
        return this.state
    }

    /**
     * This method is called when editor successfully saved the
     * edited item to the server.
     *
     * By default, it will call {@link Editor.props.saved} if provided.
     */
    saved(item: T) {
        this.props.saved?.(item, this)
    }

    /** Serialize value before sending. */
    serialize<R>(value: T): any { return value }

    /** Send value (not implemented, MUST BE in subclasses). */
    async send(_: Record|FormData, params: Record): State {
        throw "not implemented"
    }
}
export default interface Editor<T,P extends IEditorProps<T>> extends IEditor<T,P> {
    // Whether edited data are valid. Default to `true`.
    valid: boolean
}
