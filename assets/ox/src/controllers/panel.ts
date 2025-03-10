import {computed, watch} from 'vue'
import type {WatchHandle, Reactive} from 'vue'

import {t} from '../composables'
import {assignNonEmpty, State} from '../utils'
import type Panels from './panels'


export interface IPanelInfo {
    /** The view title displayed to user. */
    title?: string
    /** The view's icon displayed to user. */
    icon?: string
}


/** Properties of OxPanel **/
export interface IPanelProps extends IPanelInfo {
    /** Panel's name */
    name: string
    /** Index view name **/
    index: string
    /** Panel's view */
    view: string
    /** Current value */
    value?: any
    /** Optional state (used with `ox-state-alert`). */
    state?: State
    /** Url to related help page */
    help?: string
}

/** Component properties used by OxPanelNav */
export type IPanelNavProps = IPanelInfo & {
    /** Panel's name */
    panel: string
    /** Panels page **/
    href?: string
    /** Only display the navigation item when panel is active. */
    auto?: boolean
}

export interface IPanel<P> extends IPanelInfo {
    /** Panel's name */
    readonly name: string
    /** Panel component properties. */
    props: P
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


/**
 * This is the base class used by panels.
 */
export default class Panel<P extends IPanelProps = IPanelProps>
{
    index: string = 'list.table'
    view: string = ''
    value: any = null
    item: any = null
    editions: Set = new Set()

    /**
     * Translation key for message displayed on `confirm()` to leave unsaved
     * changes.
     */
    confirmTKey = "panel.confirm"

    /** Panel name (based on props) **/
    get name(): string { return this.props?.name || '' }

    /** Wether there are still edited items on current view. */
    get edited(): boolean { return !!this.editions?.size }

    /** Return adequate icon based on props and model **/
    get icon(): string { return this.props?.icon || null }

    /** Return panel's title based on props. */
    get title(): string { return this.props?.title }

    constructor(options: IPanel<P>|null = null) {
        options && assignNonEmpty(this, options)
        this.view ??= this.index || ''
    }

    /** Set or remove an edition by name. */
    setEdition(name: string, edited: boolean) {
        if(edited) this.editions.add(name)
        else this.editions.delete(name)
    }

    /** Show a view, providing optional value */
    show({view=null, value=null}) {
        if(this.onLeave()) {
            if(view !== null)
                this.view = view || this.index
            this.value = value
        }
    }

    /**
     * Called when view or panel changes. It returns `true` if view/panel can be changed.
     *
     * Ask user for confirmation if there is unsaved changes (aka editions).
     *
     * @return true if we can proceed to view/panel change.
     */
    onLeave() {
        if(!this.edited)
            return true

        const msg = t(this.confirmTKey)
        return confirm(msg)
    }

    onViewChange(val) {
        if(!val)
            this.view = this.index
    }
    onValueChange(val) {}
}
export default interface Panel<P extends IPanelProps=IPanelProps> extends IPanel<P> {}
