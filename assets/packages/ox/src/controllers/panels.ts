import {provide} from 'vue'
import {assignNonEmpty} from '../utils'
import type {default as Panel, IPanelShow, IPanelParams} from './panel'


export interface IPanels {
    /** Current panel's name. **/
    panel: string
    /** Current panel's view name **/
    view?: string
    /** Display/GET parameters for the current panel. */
    params?: IPanelParams
}

/** Options passed to {@link Panels.show} */
export interface IPanelsShow extends IPanelShow {
    /** Panel's name to display */
    panel: string
    /**
     * Optional url name. This allows to provide actual app location to
     * go to if the current page is not the specified one.
     */
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
    current: Panel|null

    constructor(options: IPanels|null = null) {
        options && assignNonEmpty(this, options)
    }

    /**
     * Set {@link Panels.params based on current document location.
     */
    readDocumentLocation() {
        this.paramsString = document.location.search.substring(1)
        const search = new URLSearchParams(this.paramsString)
        const {panel, ...params} = Object.fromEntries(search.entries())
        this.panel = panel
        this.params = params || {}
    }

    /** Read provided path and return current panel and view */
    static readPath(path: string) : IPanels {
        if(!path)
            return {panel: "", view: ""}

        const idx = path.indexOf('.')
        if(idx < 0)
            return {panel: path, view: ''}
        return {panel: path.substring(0, idx), view: path.substring(idx+1)}
    }

    /** Register a panel */
    register(name: string, child: Panel) {
        if(!this.children[name]) {
            this.children[name] = child

            // Set current to child if required
            if(this.panel == child.name) {
                this.current = child
                child.show(this.params)
            }
        }
    }

    /** Unregister a panel */
    unregister(name: string) {
        delete this.children[name]
    }

    /**
     * Show a panel, loading page provided by href if required.
     * When there is already a panel displayed, it will call {@link Panel.onLeave} in order to eventually prevent
     * unwanted page change.
     */
    show({force=false, href=null, ...options}: IPanelsShow) {
        const proceed = force || this.canLeave()
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

    /** Return whether we can change page/panel. */
    canLeave(): boolean {
        return this.current ? this.current.canLeave() : true
    }

    reset({panel, silent=false, ...params}: IPanelsShow) {
        const panelChanged = (panel && panel != this.panel)
        if(panelChanged && !this.canLeave())
            return

        this.panel = panel || this.panel
        this.params = params

        // Set current and if yet registered, show it.
        this.current = this.children[this.panel]
        this.current?.show({...this.params, silent})
    }
}
export default interface Panels extends IPanels {
    /** Current panel (set by panels) **/
    current: Panel|null
}
