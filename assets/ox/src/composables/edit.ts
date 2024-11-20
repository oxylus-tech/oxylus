import { computed, isRef, ref, reactive, toRaw, watch, unref } from 'vue'
import type { ComputedRef, Reactive } from 'vue'
import type { Field } from 'pinia-orm'
import type { Repository } from '@pinia-orm/axios'

import { reset, State } from '../utils'
import type { Model } from '../models'


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


export interface IREditor<T> extends Editor<T> {
    edited: ComputedRef<boolean>
    valid: ComputedRef<boolean>
}

/**
 * An Editor handle data edition without changing original value.
 * It provides utilities in order to:
 * - detect if changes have been made;
 * - reset edited values to initial state;
 * - save data to server;
 *
 * Default implementation handles raw Object edition, but not saving data to the server.
 * Note: this might lead to errors due to reactivity when returned from composable.
 */
export class Editor<T> {
    static reactive<T>({initial, ...opts}: IEditor<T>) : Reactive<IREditor<T>> {
        const obj = reactive(new this({initial: unref(initial), ...opts})) as Reactive<IREditor<T>>
        obj.edited = computed(() => obj.isEdited())
        // obj.valid = computed(() => obj.isValid())
        isRef(initial) && watch(initial, (v: T) => obj.reset(v))
        return obj
    }

    constructor({initial, name=null, saved=null, url=null, state=new State()}: IEditor<T>,
                _attrs: {[k: string]: any}={})
    {
        this.initial = initial
        this.name = name
        this.saved = saved
        this.url = url
        this.state = state

        for(const key in _attrs)
            this[key] = _attrs[key]

        this.value = {} as T
        this.reset(initial)
    }

    get errors() : any {
        return this.state.isError && this.state.data || null
    }

    /**
    * Reset editor editor data to initial.
    * When value is provided, reset initial to this value.
    */
    reset(initial: T|null = null): void {
        if(initial !== null)
            this.initial = initial
        else
            initial = this.initial
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


    isEdited(): boolean {
        return Object.keys(this.value).some(k => this.value[k] != this.initial[k])
    }

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

    serialize<R>(value: T): any { return value }

    send<D>(_: D): Promise<State> {
        throw "not implemented"
    }
}
export interface Editor<T> extends IEditor<T> {}


interface IModelEditor<T extends Model> extends IEditor<T> {
    repo: Repository
    initial: T & {[k: string]: any}
    value: T & {[k:string]: any}
}


/**
 * Editor sub-class used to edit model instances.
 */
export class ModelEditor<T extends Model> extends Editor<T> {

    constructor({repo, url, ...opts} : IModelEditor<T>) {
        url = url || repo.use?.meta?.url
        super({url, ...opts}, {repo})
    }

    get fields() : {[k: string]: Field} {
        // we need to use a getter since we can't initialize this.fields
        // before calling super.constructor (which imply this.reset)
        if(!this._fields)
            this._fields = Object.keys((this.repo.use as typeof Model).fields())
        return this._fields
    }

    _reset(val: T): void {
        this.value = reactive(new this.initial.constructor())
        this.fields.reduce((dst, k) => { dst[k] = val[k]; return dst}, this.value)
    }

    isEdited(): boolean {
        return this.fields.some((k:string) => this.value[k] != this.initial[k])
    }

    serialize(value: T): {[k: string]: any} {
        return value.$toJson(null, {relations: false})
    }

    send<D>(value: D) : Promise<State> {
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


/**
 * This composable create an new Editor and returns it as reactive object.
 * It register the newly created editor when `editors` and `key` are provided.
 */
export function editor({editorClass=Editor, emits=null, panel=null, ...opts}) {
    // provide default saved method
    if(emits)
        opts.saved ??= ((item, editor) => emits('saved', item, editor))

    const editor = editorClass.reactive(opts)
    if(panel)
        watch(() => editor.edited, (val) => panel.setEdition(editor.name, val))
    return editor
}

export function modelEditor(opts) {
    return editor({...opts, editorClass: ModelEditor})
}

// export function arrayEditor(opts) {
//     return editor({...opts, editorClass: ArrayEditor})
// }
//
// export function collectionEditor(opts) {
//     return editor({...opts, editorClass: CollectionEditor})
// }
