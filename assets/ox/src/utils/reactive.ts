import {reactive} from 'vue'
import type {Reactive} from 'vue'

import {assignNonEmpty} from './functional'


/**
 * Provide a base class for object that are designed to be reactive.
 *
 * `<O>` is the options provided to constructor.
 */
export default class RObject<O> {
    /**
     * Create a new reactive instance of the object.
     * This where you can add watchers and computed properties.
     */
    static reactive<O>(options: O): Reactive<any> {
        return reactive(new this(options))
    }

    constructor(options: O|null = null) {
        options && assignNonEmpty(this, options)
    }
}
