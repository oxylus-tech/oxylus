import {watch} from 'vue'

import {t} from '../composables'
import {RObject, State} from '../utils'
import type {Target, ITarget} from './target'



export interface IPanel<M> {
    /** Panel name */
    name: string
    /**
    * {@link Target} used to specify current view and value.
    *
    * This element may be shared among multiple panels.
    */
    panels: Target
    /** Index view name **/
    index?: string
    /**
     * Current unsaved changes. This can be updated by component in order
     * to prevent data loss when changing panels.
     */
    editions: Set<string>
    /** Optional state */
    state?: State
}


export interface IPanelInfo {
    /** Panel's name */
    name: string
    /** The view title displayed to user. */
    title?: string
    /** The view's icon displayed to user. */
    icon?: string
}

/** Properties of OxPanel **/
export interface IPanelProps extends IPanelInfo {
    /** Optional state (used with `ox-state-alert`). */
    state?: State
    /** Url to related help page */
    help?: string
}

/** Component properties used by OxPanelNav */
export type IPanelNavProps = IPanelInfo & ITarget & {
    /** Only display the navigation item when panel is active. */
    auto: boolean
}

export interface IRPanel<M> extends Reactive<IPanel<M>> {
}


/**
 * This is the base class used by panels.
 */
export default class Panel<M> extends RObject<IPanel<M>> {
    /**
     * Translation key for message displayed on `confirm()` to leave unsaved
     * changes.
     */
    confirmTKey = "panel.confirm"

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
        const obj = this.constructor.reactive(options)
        obj.watcher = watch(() => obj.panel.panels.panel, (val) => obj.onChange(val))
        return obj
    }

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
        if(panel == this.name && this.panels.current != this)
            this.panels.current = this
    }
}
