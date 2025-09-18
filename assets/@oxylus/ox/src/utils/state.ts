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
}

export type IStateData = {[k: string]: any} | null


/**
 * Colors associated with states
 */
export const StateColors : {[k: symbol]: string} = {}
StateColors[States.NONE] = ''
StateColors[States.PROCESSING] = 'info'
StateColors[States.SENDING] = 'info'
StateColors[States.SENT] = 'success'
StateColors[States.OK] = 'success'
StateColors[States.ERROR] = 'error'


/**
 * This class handle state management with associated data.
 *
 * The different states and methods correspond to {@link States}.
 */
export default class State {
    state: symbol
    data: IStateData

    constructor(state:symbol=States.NONE, data:IStateData=null) {
        this.state = state
        this.data = data
    }

    /** Create new state for `none` */
    static none(data: IStateData = null) : State { return new this(States.NONE, data) }

    /** Create new state for `ok` */
    static ok(data: IStateData = null) : State { return new this(States.OK, data) }

    /** Create new state for `processing` */
    static processing(data: IStateData = null) : State { return new this(States.PROCESSING, data) }

    /** Create new state for `sending` */
    static sending(data: IStateData = null) : State { return new this(States.SENDING, data) }

    /** Create new state for `error` */
    static error(data: IStateData = null) : State { return new this(States.ERROR, data) }

    /** Set state to `none` with optional provided data. */
    none(data: IStateData = null) : State {
        this.state = States.NONE; this.data = data;
        return this
    }

    /** Set state to `ok` with optional provided data. */
    ok(data: IStateData = null) : State {
        this.state = States.OK; this.data = data;
        return this
    }

    /** Set state to `processing` with optional provided data. */
    processing(data: IStateData = null) : State {
        this.state = States.PROCESSING; this.data = data;
        return this
    }

    /** Set state to `sending` with optional provided data. */
    sending(data: IStateData = null) : State {
        this.state = States.SENDING; this.data = data;
        return this
    }

    /** Set state to `error` with optional provided data. */
    error(data: IStateData = null) : State {
        this.state = States.ERROR; this.data = data;
        return this
    }

    /** Color of the current state, based on {@link StateColors}. */
    get color() : string { return StateColors[this.state] }

    /** True if state is `none` */
    get isNone() : boolean { return this.state == States.NONE }
    /** True if state is `ok` */
    get isOk() : boolean { return this.state == States.OK }
    /** True if state is `processing` */
    get isProcessing() : boolean { return this.state == States.PROCESSING }
    /** True if state is `sending` */
    get isSending() : boolean { return this.state == States.SENDING }
    /** True if state is `error` */
    get isError() : boolean { return this.state == States.ERROR }

    /** Return formatted error string if state is `error` */
    toString(): string {
        if(!this.data)
            return ''

        if(typeof this.data == "string")
            return this.data

        let msg = ""
        for(var field in this.data) {
            const errs = this.data[field]
            if(typeof field == 'string')
                msg += errs.map(v => `- ${field}: ${v}\n`)
            else
                msg += errs.map(v => `- ${v}\n`)
        }
        return `${msg}`
    }

}
