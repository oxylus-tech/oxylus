import {provide} from 'vue'
import {assignNonEmpty} from '../utils'
import type Panel from './panel'


export interface IPanels {
    /** Current panel's name. **/
    panel: string
    /** Display/GET parameters for the current panel. */
    params: {}
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
    params: Record<string, any> = {}
    paramsString: string = ''
    children: {[k: string]: Panel} = {}

    get current() : Panel|null {
        return this.children[this.panel] || null
    }

    constructor(options: IPanels|null = null) {
        options && assignNonEmpty(this, options)
        this.readDocumentLocation()
    }

    /**
     * Set {@link Panels.params
     */
    readDocumentLocation() {
        this.paramsString = document.location.search
        const params = new URLSearchParams(this.paramsString)
        this.params = Object.fromEntries(params.entries())
    }

    static readPath(path: string) : IPanels {
        if(!path)
            return {panel: "", view: ""}

        const idx = path.indexOf('.')
        if(idx < 0)
            return {panel: path, view: ''}
        return {panel: path.substring(0, idx), view: path.substring(idx+1)}
    }

    register(name: string, child: Panel) {
        /*if(name in this.children) {
            throw Error(`Child panel is already registered ${name}.`)
        }*/
        this.children[name] = child
    }

    unregister(name: string) {
        delete this.children[name]
    }

    show({force=false, href=null, ...options}: IPanelShow) {
        const proceed = force || !this.current || this.current.onLeave()
        if(!proceed)
            return

        if(href && window.location.pathname != href) {
            if(!options.panel)
                throw Error("The attribute `href` requires`panel`.")

            href = `${href}?panel=${options.panel}`
            if(options.view)
                href = `${href}&view=${options.view || ''}`
            window.location.href = href
            return
        }

        this.reset(options)
    }

    reset({panel, view=null, value=null, id=null}: IPanels) {
        const panelChanged = (panel && panel != this.panel)
        if(panelChanged && this.current) {
            if(!this.current.onLeave())
                return
        }

        this.panel = panel || this.panel
        this.params = {view, value, id}
    }
}
export default interface Panels extends IPanels {
    /** Current panel (set by panels) **/
    current: Panel|null
}
