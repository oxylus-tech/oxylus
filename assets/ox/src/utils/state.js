/**
 * Common state values as an enum
 */
export const States = {
    NONE: Symbol("none"),
    PROCESSING: Symbol("processing"),
    SENDING: Symbol("sending"),
    SENT: Symbol("sent"),
    OK: Symbol("ok"),
    ERROR: Symbol("error"),
};
/**
 * Colors associated with states
 */
export const StateColors = {};
StateColors[States.NONE] = '';
StateColors[States.PROCESSING] = 'info';
StateColors[States.SENDING] = 'info';
StateColors[States.SENT] = 'success';
StateColors[States.OK] = 'success';
StateColors[States.ERROR] = 'error';
/**
 * This class handle state management with associated data.
 *
 * The different states and methods correspond to {@link States}.
 */
export default class State {
    state;
    data;
    constructor(state = States.NONE, data = null) {
        this.state = state;
        this.data = data;
    }
    static none(data = null) { return new this(States.NONE, data); }
    static ok(data = null) { return new this(States.OK, data); }
    static processing(data = null) { return new this(States.PROCESSING, data); }
    static sending(data = null) { return new this(States.SENDING, data); }
    static error(data = null) { return new this(States.ERROR, data); }
    none(data = null) {
        this.state = States.NONE;
        this.data = data;
        return this;
    }
    ok(data = null) {
        this.state = States.OK;
        this.data = data;
        return this;
    }
    processing(data = null) {
        this.state = States.PROCESSING;
        this.data = data;
        return this;
    }
    sending(data = null) {
        this.state = States.SENDING;
        this.data = data;
        return this;
    }
    error(data = null) {
        this.state = States.ERROR;
        this.data = data;
        return this;
    }
    get color() { return StateColors[this.state]; }
    get isNone() { return this.state == States.NONE; }
    get isOk() { return this.state == States.OK; }
    get isProcessing() { return this.state == States.PROCESSING; }
    get isSending() { return this.state == States.SENDING; }
    get isError() { return this.state == States.ERROR; }
}
