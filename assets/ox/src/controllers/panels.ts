import {provide} from 'vue'
import {RObject} from '../utils'
import type {Panel} from './panel'


export interface IPanels {
    /** Current panel's name. **/
    panel: string
    /** Current panel's view **/
    view?: string
    /** Current value **/
    value?: any
}


export interface IPanelShow extends IPanels {
    force?: boolean
    href?: string
}

/**
 * This class is used to panels a panel, providing extra information such
 * as value and view. It is shared among panels.
 *
 * Use it as this provides utilities to avoid data loss and allow current
 * panel to have control over leaving it.
 */
export default class Panels extends RObject<IPanels> {
    panel: string = ""
    view: string = ""
    value?: any = null
    current?: Panel = null

    static readPath(path) : IPanels {
        if(!path)
            return {panel: "", view: ""}

        const idx = path.indexOf('.')
        if(idx < 0)
            return {panel: path, view: ''}
        return {panel: path.substring(0, idx), view: path.substring(idx+1)}
    }

    show({force=false, href=null, ...panels}: IPanelShow) {
        const proceed = !this.current || this.current.onLeave({panels, force})
        if(!proceed)
            return

        if(href && window.location.pathname != href) {
            if(!panels.panel)
                throw Error("The attribute `href` requires`panel`.")

            window.location.href = `${href}?panel=${panels.panel}&view=${panels.view}`
            return
        }

        this.reset(panels)
    }

    reset({panel, view=null, value=null}: IPanelsOpts) {
        this.panel = panel || this.panel
        this.view = view || ""
        this.value = value
    }
}
export interface Panels extends IPanels {
    /** Current panel (set by panels) **/
    current: Panel
}
