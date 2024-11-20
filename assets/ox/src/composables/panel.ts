import { computed, provide, reactive, watch } from 'vue'
import type { ComputedRef, Reactive } from 'vue'
import type {IObject} from '../utils/index.ts'


export interface IPanel {
    name: string
    view?: string
    value?: any
    editions: Set<string>
    title: string
    icon: string
    allowed: boolean
}

export type IPanelResetOpts = {
    title?: string
    icon?: string
    allowed?: boolean
    force?: boolean
    href?: string
}


export interface IRPanel extends Reactive<Panel> {
    edited: ComputedRef<boolean>
}


export class Panel {
    // TODO
    /*static reactive(path: string, value: any, options: IObject): IRPanel {
        const panel = reactive(new this(path, value, options)) as IRPanel
        panel.edited = computed(() => panel.isEdited())
        return panel
    }*/

    constructor(path: string, value: any, options: IObject) {
        this.reset(path, value, options)
    }

    isEdited(): boolean { return !!this.editions?.size }

    setEdition(name: string, edited: boolean) {
        if(edited) this.editions.add(name)
        else this.editions.delete(name)
    }

    reset(path: string = "", value: any=null, {title="", icon="", allowed=false, force=false, href=""}: IPanelResetOpts ={}) {
        if(!force && this.isEdited() && !confirm("There are unsaved change. Do you still wan't to proceed?"))
            return

        if(href && window.location.pathname != href) {
            window.location.href = `${href}?panel=${path}`
            return
        }

        const [name, view] = this.splitPath(path)
        if(icon || (name && this.name != name))
            this.icon = icon

        if(name)
            this.name = name
        this.view = view
        this.value = value
        this.editions = new Set()
        this.title = title
        this.allowed = allowed
    }

    protected splitPath(path: string): string[] {
        if(!path)
            return ["", ""]
        const idx = path.indexOf('.')
        if(idx < 0)
            return [path, '']
        return [path.substring(0, idx), path.substring(idx+1)]
    }
}
export interface Panel extends IPanel {}


/**
 * Component properties used by panel navigation component
 */
export const panelNavProps = {
    name: String,
    title: {type: String, default: ''},
    icon: {type: String, default: ''},
    href: {type: String, default: ''},
    /**
     * Only display when panel is active.
     */
    auto: {type: Boolean, default: false},
}


/**
 * Component properties used by panel component
 */
export const panelProps = {
    name: String,
    title: {type: String, default: ''},
    icon: {type: String, default: ''},
    tabbed: {type: Boolean, default: false},
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
