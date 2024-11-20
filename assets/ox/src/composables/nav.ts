import { reactive } from 'vue'

// We use chained list for simplicity whilst it does actually handle things
// how we wan't them.

export class HistoryItem {
    constructor(panel, data, {prev=null, location=null}) {
        this.panel = panel
        this.data = data
        this.location = location

        if(prev)
            prev.next = this
    }
}


export class History {
    constructor({panel=null, data=null}={}) {
        this.item = null
        this.items = []
        if(panel)
            this.select(panel, data)
    }

    select(item, nested=false) {
        if(nested)
            this.items.push(item)
        else
            this.items = [item]
        this.item = item
        return this.item
    }

    goto(item) {
        this.item = item
    }

    push(panel, data, {nested=false, ...opts}={}) {
        return this.select(
            new HistoryItem(panel, data, {
                ...opts,
            }), nested
        )
    }
}


export function useHistory(opts={}) {
    return {
        history: reactive(new History(opts)),
    }
}
