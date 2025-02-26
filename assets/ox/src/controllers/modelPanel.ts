import {computed, reactive, toRefs} from 'vue'
import type {Reactive} from 'vue'

import {Model} from '../models'
import {mapToObject} from '../utils'
import {useList} from '../composables/list'
import {t, tKeys} from '../composables/i18n'

import type {List} from '../composables/list'
import type {Query} from '../composables/api'
import type {IPanel, IPanelProps} from './panel'
import type {Repos} from '../models'

import type {Target} from './target'

import Panel from './panel'

import {OxList} from 'ox/components'


/**
 * Model panel component properties.
 */
export type IModelPanelProps<M extends Model> = IPanelProps & {
    search: string
    view: string
    headers?: string[]
}

/** Model panel interface. */
export interface IModelPanel<M extends Model> {
    panels: Target
    props: IModelPanelProps
    list: List<M>
}

/** Reactive model panel interface. */
export interface IRModelPanel extends Reactive<IModelPanel> {}


/** This class handles model panel (used by {@link OxModelPanel}. */
export default class ModelPanel extends Panel {
    showFilters: boolean = false

    static reactive(options: IModelPanel): Reactive<this> {
        const obj = super.reactive(options)
        obj.item = computed((val) => obj.onValueChange(val))
        return obj
    }

    constructor({query, ...options}: IModelPanel) {
        super(options)
        this.showFilters = this.props?.showFilters || false
    }

    /** Current model's repository. */
    get repo() { return this.props.repo }

    /** Current model. */
    get model() { return this.repo.use }

    /** Return adequate icon based on props and model **/
    getIcon(): string { return super.getIcon() || this.model.meta?.icon }

    /** Return panel's title based on view and current item. */
    getTitle(): string {
        const {props, list, panels} = this
        const model = this.repo.use
        if(model) {
            // many items
            if(this.view?.startsWith('list.'))
                return t(tKeys.model(model), 3)

            if(this.view?.startsWith('detail.') && panels.value) {
                if(panels.value.$title)
                    return panels.value.$title

                const name = t(tKeys.model(model))
                return panels.value.id
                    ? t(`models._.title`, {model: name, id: panels.value.id})
                    : t(`models._.title.new`, {model: name})
            }
        }
        return super.getTitle()
    }

    /** Get instance of list. */
    createList() {
        const {value} = toRefs(this.panels)
        return useList({value, query: this.query})
    }

    /**
     * Edit a new item.
     *
     * @param path - path to edit view.
     */
    create(view: string='.detail.add') {
        this.target.show({panel: this.name, view, value: new this.model()})
    }

    /** Called when an item has been created. By default, show edit view. */
    created(value, view: string=".detail.edit") {
        this.target.show({panel: this.name, view, value, force: true})
        this.list.fetch()
    }

    /** Get item from id. */
    getItem(id) {

    }
}


export interface ModelPanel extends IModelPanel {
    showFilters: boolean
}
