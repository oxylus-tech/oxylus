import {provide} from 'vue'
import {assignNonEmpty} from '../utils'
import type Panel from './panel'


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
export default class Panels {
    panel: string = ""
    view: string = ""
    value?: any = null
    children: {[k: string]: Panel} = {}

    get current() : Panel|null { return this.children[this.panel] || null }
    constructor(options: IPanels|null = null) {
        options && assignNonEmpty(this, options)
    }

    static readPath(path: string) : IPanels {
        if(!path)
            return {panel: "", view: ""}

        const idx = path.indexOf('.')
        if(idx < 0)
            return {panel: path, view: ''}
        return {panel: path.substring(0, idx), view: path.substring(idx+1)}
    }

    register(name, child) {
        if(name in this.children)
            throw Error(`Child panel is already registered ${name}.`)
        this.children[name] = child
    }

    unregister(name) {
        delete this.children[name]
    }

    show({force=false, href=null, ...panels}: IPanelShow) {
        const proceed = force || !this.current || this.current.onLeave()
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

    reset({panel, view=null, value=null}: IPanels) {
        const panelChanged = (panel && panel != this.panel)
        if(panelChanged && this.current) {
            if(!this.current.onLeave())
                return
        }

        this.panel = panel || this.panel
        if(this.current) {
            this.current.view = view || this.current.view.index || ''
            this.current.value = value
        }
    }
}
export default interface Panels extends IPanels {
    /** Current panel (set by panels) **/
    current?: Panel
}
