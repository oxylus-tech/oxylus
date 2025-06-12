import { cloneDeep, isEqual, pick } from 'lodash';
import Config from '../config';
import { assignNonEmpty, reset, State } from '../utils';
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
export default class Editor {
    state = State.none();
    value = {};
    constructor(options) {
        options && assignNonEmpty(this, options);
        if (!this.state)
            this.state = new State();
        this.value ??= {};
        this.empty ??= {};
        this.initial ??= this.props.initial || this.empty;
        this.valid = true;
        this.reset(this.initial);
    }
    get name() { return this.props.name; }
    get url() { return this.props.url; }
    get errors() {
        return this.state.isError && this.state.data || null;
    }
    /** Discard changes, resetting to initial value. */
    discard() {
        this.reset(this.initial);
    }
    /**
     * Reset editor data to provided value.
     * When value is provided, reset initial to this value.
     */
    reset(value = null) {
        reset(this.value, value ?? this.empty);
        this.state.none();
    }
    /** Return wether value has been edited or not */
    isEdited() {
        return !isEqual(this.value, this.initial);
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
    async save(value = null, params = {}) {
        this.state.processing();
        if (this.valid === false)
            return this.state.error({
                "_": "Some of the input values are invalid"
            });
        value ??= this.value;
        if (value instanceof FormData)
            params.headers = {
                ...Config.axiosConfig.headers,
                'Content-Type': 'multipart/form-data',
                ...params.headers,
            };
        else
            value = this.serialize(value);
        const state = await this.send(value, params);
        if (state.isOk) {
            this.reset(state.data, true);
            // this.initial = cloneDeep(this.value)
            this.saved?.(this.value);
        }
        else
            this.state = state;
        return this.state;
    }
    /**
     * This method is called when editor successfully saved the
     * edited item to the server.
     *
     * By default, it will call {@link Editor.props.saved} if provided.
     */
    saved(item) {
        this.props.saved?.(item, this);
    }
    /** Serialize value before sending. */
    serialize(value) { return value; }
    /** Send value (not implemented, MUST BE in subclasses). */
    send(_, params) {
        throw "not implemented";
    }
}
