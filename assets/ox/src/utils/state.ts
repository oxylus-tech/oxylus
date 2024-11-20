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
 * This class handle state management with associated data.
 */
export default class State {
    state: symbol
    data: IStateData

    constructor(state:symbol=States.NONE, data:IStateData=null) {
        this.state = state
        this.data = data
    }

    static none(data: IStateData = null) : State { return new this(States.NONE, data) }
    static ok(data: IStateData = null) : State { return new this(States.OK, data) }
    static processing(data: IStateData = null) : State { return new this(States.PROCESSING, data) }
    static sending(data: IStateData = null) : State { return new this(States.SENDING, data) }
    static error(data: IStateData = null) : State { return new this(States.ERROR, data) }

    none(data: IStateData = null) : State {
        this.state = States.NONE; this.data = data;
        return this
    }

    ok(data: IStateData = null) : State {
        this.state = States.OK; this.data = data;
        return this
    }

    processing(data: IStateData = null) : State {
        this.state = States.PROCESSING; this.data = data;
        return this
    }

    sending(data: IStateData = null) : State {
        this.state = States.SENDING; this.data = data;
        return this
    }

    error(data: IStateData = null) : State {
        this.state = States.ERROR; this.data = data;
        return this
    }


    get isNone() : boolean { return this.state == States.NONE }
    get isOk() : boolean { return this.state == States.OK }
    get isProcessing() : boolean { return this.state == States.PROCESSING }
    get isSending() : boolean { return this.state == States.SENDING }
    get isError() : boolean { return this.state == States.ERROR }
}
