import {reactive} from 'vue'
import type {Reactive} from 'vue'

import {assignNonEmpty} from './functional'


/**
 * Provide a base class for object that are designed to be reactive.
 */
export default class RObject<O> {
    /**
     * Create a new reactive instance of the object.
     * This where you can add watchers and computed properties.
     */
    static reactive(options: O): Reactive<this> {
        return reactive(new this(options))
    }

    constructor(options: O = {}) {
        options && assignNonEmpty(this, options)
    }
}
