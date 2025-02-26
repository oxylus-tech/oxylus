import {computed, watch} from 'vue'
import type {WatchHandle} from 'vue'

import {t} from '../composables'
import {RObject, State} from '../utils'
import type {Panels, IPanels} from './panels'


export interface IPanelInfo {
    /** Panel's name */
    name: string
    /** The view title displayed to user. */
    title?: string
    /** The view's icon displayed to user. */
    icon?: string
}


export interface IPanel {
    /** Panel name */
    name: string
    /**
    * {@link Panels} used to specify current view and value.
    *
    * This element may be shared among multiple panels.
    */
    panels: Panels
    /**
     * Current unsaved changes. This can be updated by component in order
     * to prevent data loss when changing panels.
     */
    editions: Set<string>
}


/** Properties of OxPanel **/
export interface IPanelProps extends IPanelInfo {
    /** Index view name **/
    index?: string
    /** Optional state (used with `ox-state-alert`). */
    state?: State
    /** Url to related help page */
    help?: string
}

/** Component properties used by OxPanelNav */
export type IPanelNavProps = IPanelInfo & IPanels & {
    /** Panels page **/
    href?: string
    /** Only display the navigation item when panel is active. */
    auto?: boolean
}

export interface IRPanel<O=IPanel> extends Reactive<Panel<O>> {
    watcher: WatchHandle
    title: ComputedRef<string>,
    icon: ComputedRef<string>,
}


/**
 * This is the base class used by panels.
 */
export default class Panel<O=IPanel> extends RObject<IPanel> {
    /**
     * Translation key for message displayed on `confirm()` to leave unsaved
     * changes.
     */
    confirmTKey = "panel.confirm"

    /** Panel name (based on props) **/
    get name() { return this.props?.name }

    /** Current view. */
    get view() { return this.panels.panel == this.name ? this.panels.view : null }

    /** Current value */
    get value() { return this.panels.panel == this.name ? this.panels.value : null }

    /** Wether there are still edited items on current view. */
    get edited(): boolean { return !!this.editions?.size }

    /**
     * Return reactive version of panel.
     *
     * Add watcher over panels's panel ({@link Panel.onChange})
     */
    static reactive(options: IPanel) {
        const obj = super.reactive(options)
        obj.watcher = watch(() => obj.panels.panel, (val) => obj.onChange(val))
        return obj
    }

    /** Return adequate icon based on props and model **/
    get icon(): string { return this.props?.icon || null }

    /** Return panel's title based on props. */
    get title(): string { return this.props?.title }

    /** Set or remove an edition by name. */
    setEdition(name: string, edited: boolean) {
        if(edited) this.editions.add(name)
        else this.editions.delete(name)
    }

    /**
     * Called when view or panel changes. It returns `true` if view/panel can be changed.
     *
     * Ask user for confirmation if there is unsaved changes (aka editions).
     *
     * @return true if we can proceed to view/panel change.
     */
    onLeave({panels, force=false}) {
        if(force || !this.edited)
            return true

        const msg = t(this.confirmTKey)
        return confirm(msg)
    }

    /** Handle panels' panel change. */
    onChange(panel) {
        if(panel == this.name) {
            if(this.panels.current != this)
                this.panels.current = this
            if(!this.panels.view)
                this.panels.view = this.props?.index
        }
    }
}
