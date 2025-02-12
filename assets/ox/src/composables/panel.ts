import { computed, provide, reactive, watch } from 'vue'
import { assignNonEmpty } from '../utils'
import type { ComputedRef, Reactive } from 'vue'
import type { Composer } from 'vue-i18n'
import type {IObject} from '../utils/index.ts'
import {t, tKeys} from '../composables'


export interface IPanelInfo {
    /**
     * Panel's name
     */
    name: string
    /**
     * The view title displayed to user.
     */
    title?: string
    /**
     * The view's icon displayed to user.
     */
    icon?: string
}

/**
 * {@link Panel} base interface.
 */
export interface IPanel extends IPanelInfo {
    /**
     * Current view's name.
     */
    view?: string
    /**
     * Current value or model instance displayed by the view.
     */
    value?: any
    /**
     * Default view. It is set when panel name changes to the
     * provided view.
     */
    index?: string
}

/**
 * Target a panel and its views.
 *
 * A path can take the following formats:
 * - `panel_name.view_name`: an absolute path.
 * - `panel_name`: default view of this panel.
 * - `.view_name`: a view in the current panel.
 * - ``: an empty string -> default app view
 *
 * Note: panel names CAN NOT contains dots, but view names can. This is in
 * order to allow namespacing views, such as `detail.edit`, or `list.kanban`.
 */
export interface IPanelTarget {
    /**
     * Path to target panel and view
     */
    path: string
    /**
     * Page location. If it is different from the current page,
     * page will be reloaded on {@link Panel.show}.
     */
    href?: string
    /**
     * Value attached to the view.
     */
    value?: any
    /**
     * If true, don't check and ask for user confirmation when there
     * are element edited and not saved.
     */
    force?: boolean
}

/**
 * Component properties used by OxPanel
 */
export interface IPanelProps extends IPanelInfo {
    /**
     * When provided, will display an alert whenever state is not none,
     * using `OxStateAlert`.
     */
    state?: state,
}

/**
 * Component properties used by OxPanelSheet
 */
export interface IPanelSheetProps extends IPanelInfo {
    /**
     * Url to help (user manual)
     */
    help?: string
}

/**
 * Component properties used by OxPanelNav
 */
export type IPanelNavProps = IPanelInfo & IPanelTarget & {
    /**
     * Only display the navigation item when panel is active.
     */
    auto: boolean
}

/**
 * Reactive {@link Panel}.
 */
export interface IRPanel extends Reactive<Panel> {}


/**
 * This class is used to manage application's panels and views displayed to user.
 *
 * This class only contains information related to the current view
 * shown to the user. It is owned by an {@link AppContext} and provided
 * to panel components in order to handle:
 *
 * - the current view being displayed, including title, icons, permissions
 * - the views being edited.
 * - changing views and pages and prevent user to accidentaly loose edition being made on current value.
 *
 * @example
 *
 * panel = inject('panel')
 * // this change current view using relative path. View is named: `detail.view`.
 * panel.reset('.detail.edit', item)
 */
export class Panel {
    view: string = 'list.table'
    index: string = 'list.table'
    confirm: string = "There are unsaved changes on the current page. Are you sure to proceed?"

    static reactive(options: IPanel): IRPanel {
        return reactive(new this(options)) as IRPanel
    }

    constructor(options: Panel) {
        assignNonEmpty(this, options)
    }

    /**
     * Wether there are still edited items on current view.
     */
    get edited(): boolean { return !!this.editions?.size }

    /**
     * Set or remove an edition by name.
     */
    setEdition(name: string, edited: boolean) {
        if(edited) this.editions.add(name)
        else this.editions.delete(name)
    }

    /**
     * Change the current panel and view.
     *
     * @param path - view's path.
     * @param value - value or model instance associated with the view
     * @param options - view's informations.
     * @param reset - if provided, {@link Panel.reset} with these options
     */
    show({path="", value=null, force=false, href=""}: IPanelTarget ={}, reset: IPanel|null = null) {
        if(!this.askConfirmation(force))
            return

        if(href && window.location.pathname != href) {
            window.location.href = `${href}?panel=${path}`
            return
        }

        if(reset)
            this.reset(reset)

        const [name, view] = this.splitPath(path)
        if(name)
            this.name = name
        this.view = view || this.index
        this.value = value
        this.editions = new Set()
    }

    /**
     * Reset current panel informations.
     *
     * @param options - update those informations;
     * @param name - if provided, only update information if current panel name is this one.
     */
    reset(options: IPanel, name: string|null=null) {
        if(!name || name == this.name)
            Object.assign(this, options)
    }

    /**
     * Ask user for confirmation if there is unsaved changes (aka editions).
     * @return true if we can discard changes.
     */
    askConfirmation(force: boolean = false) {
        if(force || !this.edited)
            return true

        return confirm(this.confirm)
    }

    protected splitPath(path: string): string[] {
        if(!path)
            return ["", ""]
        const idx = path.indexOf('.')
        if(idx < 0)
            return [path, '']
        return [path.substring(0, idx), path.substring(idx+1)]
    }

    /**
     * Return panel's title based on current view and value.
     *
     * @param t - vue-i18n composer.
     * @return a string with the title or empty if none is suitable.
     */
    getTitle(): string {
        const model = this.value?.constructor
        if(model instanceof Model) {
            // many items
            if(this.view?.startsWith('list.'))
                return t(tKeys(model), 3)

            if(this.value) {
                if(this.value.title)
                    return this.value.title

                const name = t(tKeys(model))
                return this.value.id
                    ? t(`models._.title`, {model: name, id: this.value.id})
                    : t(`models._.title.new`, {model: name})
            }
        }
        return ''
    }
}
export interface Panel extends IPanel {
    /**
     * Set of editions being made in current view. It is reset
     * on view change.
     */
    editions?: Set<string>
    /**
     * User confirmation message displayed when {@link Panel.show} is
     * called there are still changes in the current view.
     */
    confirm?: string
}


// TODO
/*
export function usePanel(path, value, props: IObject): IRPanel {
    const panel = Panel.reactive(props)
    provide('panel', panel)
    return { panel }
}*/


export function useModelPanelProps({name="", relations=[], headers=[]}={}) : IObject {
    return {
        name: {type: String, default: name},
        tabbed: {type: Boolean, default: false},
        relations: {type: Array, default: () => relations},
        headers: {type: Array, default: () => [
            ...headers, {key: 'actions', title: 'Actions'}
        ]},
    }
}
