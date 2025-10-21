import {computed, watch} from 'vue'
import type {WatchHandle, Reactive} from 'vue'

import {t} from '../composables'
import {assignNonEmpty, State} from '../utils'
import type Panels from './panels'


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


/** Display/GET parameters for displaying a view. */
export interface IPanelParams<V=any> extends Record<string, any> {
    view?: string
    value?: V
}


/** Options passed to {@link Panel.show} */
export interface IPanelShow<V=any> {
    /** Name of the view to display. */
    view?: string
    /** Value to provide to the view. */
    value?: V
    /** Do not update current location using history API. */
    silent?: boolean
    /**
     * Force displaying the view, eg. don't ask for user confirmation
     * when something has been edited.
     */
    force?: boolean
}


export interface IPanel<P> extends IPanelInfo {
    /** Panel component properties. */
    props: P
    /**
    * The {@link Panels} controller used to specify current view and value.
    *
    * This element may be shared among multiple Panel instances.
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
 *
 * Template parameters:
 *
 * - `P`: type of panel properties ({@link IPanelProps});
 * - `V`: type for value;
 *
 */
export default class Panel<V=any, P extends IPanelProps = IPanelProps>
{
    index: string = 'list.table'
    view: string = ''
    value: any = null
    item: any = null
    editions: Set<string> = new Set()

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

    /** Return URL GET parameters for the current view. */
    getUrlParams(): IPanelParams {
        const params : IPanelParams = {panel: this.name}
        if(this.view != this.index)
            params.view = this.view
        if(this.view.startsWith('detail.') && this.value)
            params.value = this.value
        return params
    }


    /** Set or remove an edition by name. */
    setEdition(name: string, edited: boolean) {
        if(edited) this.editions.add(name)
        else this.editions.delete(name)
    }

    /**
     * Show a view, providing optional value.
     * @return - true if view changed
     */
    show({view=null, value=null, silent=false, force=false}: IPanelShow<V>={}): boolean {
        if((view != this.view || value != this.value) && (force || this.canLeave())) {
            this.view = view || this.index
            this.value = value
            !silent && this.updateLocation()
            return true
        }
        return false
    }

    /** Update current location using History api (push state). */
    updateLocation() {
        const params = this.getUrlParams()
        if(params) {
            const url = (new URLSearchParams(params)).toString()
            history.pushState(params, "", `?${url}`)
        }
    }

    /**
     * Called when view or panel changes. It returns `true` if view/panel can be changed.
     *
     * Ask user for confirmation if there is unsaved changes (aka editions).
     *
     * @return true if we can proceed to view/panel change.
     */
    canLeave(): boolean {
        if(!this.edited)
            return true

        const msg = t(this.confirmTKey)
        return confirm(msg)
    }
}
export default interface Panel<V=any, P extends IPanelProps=IPanelProps> extends IPanel<P> {}
