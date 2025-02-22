import {RObject} from '../utils'
import type {Panel} from './panel'


export interface ITarget {
    /** Current panel's name. **/
    panel: string
    /** Current panel's view **/
    view?: string
    /** Current value **/
    value?: any
}


export interface IPanelShow extends ITarget {
    force?: boolean
}

/**
 * This class is used to target a panel, providing extra information such
 * as value and view. It is shared among panels.
 *
 * Use it as this provides utilities to avoid data loss and allow current
 * panel to have control over leaving it.
 */
export default class Target extends RObject<ITarget> {
    panel: string = ""
    view: string = ""
    value?: any = null
    current?: Panel = null

    static readPath(path) : ITarget {
        if(!path)
            return {panel: "", view: ""}

        const idx = path.indexOf('.')
        if(idx < 0)
            return {panel: path, view: ''}
        return {panel: path.substring(0, idx), view: path.substring(idx+1)}
    }

    show({force=false, ...target}: IPanelShow) {
        const proceed = !this.current || this.current.onLeave({target, force})
        if(proceed)
            this.reset(target)
    }

    reset(options: ITargetOpts) {
        this.panel = options.panel || this.panel
        this.view = options.view || this.current?.index || ""
        this.value = options.value
    }
}
export interface Target extends ITarget {
    /** Current panel (set by panels) **/
    current: Panel
}

/**
 * Create a new reactive {@link Targeŧ} and provide it as `panels`.
 *
 * @return the reactive Target.
 */
export function useTarget(options: ITarget = {}) {
    const obj = Target.reactive(options)
    provide('panels', obj)
    return obj
}
