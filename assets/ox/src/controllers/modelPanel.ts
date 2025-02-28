import {computed, reactive, toRefs} from 'vue'
import type {Reactive} from 'vue'
import type {Repository} from 'pinia-orm'

import {Model} from '../models'
import {mapToObject} from '../utils'
import {t, tKeys} from '../composables/i18n'

import type List from './list'
import type Query from './query'
import type {Repos} from '../models'

import type {IPanel, IPanelProps} from './panel'
import type Panels from './panels'

import Panel from './panel'


/** Model panel component properties. */
export interface IModelPanelProps<M extends Model> extends IPanelProps {
    repo: Repository<M>
    search: string
    view: string
    headers?: string[]
    showFilters?: boolean
}

/** Model panel interface. */
export interface IModelPanel<M extends Model,P extends IModelPanelProps<M>=IModelPanelProps<M>> extends IPanel<P> {
    list: List<M>
}

/** Reactive model panel interface. */
export interface IRModelPanel extends Reactive<IModelPanel> {}


/** This class handles model panel (used by {@link OxModelPanel}. */
export default class ModelPanel<M extends Model,P extends IModelPanelProps<M>=IModelPanelProps<M>,O=IModelPanel<M>> extends Panel<P,O> {
    showFilters: boolean = false

    constructor(options: IModelPanel<M>) {
        super(options)
        this.showFilters = this.props?.showFilters || false
    }

    /** Current model's repository. */
    get repo() { return this.props.repo }

    /** Current model. */
    get model() { return this.repo.use }

    /** Query (shortcut to `this.list.query`). **/
    get query() { return this.list.query }

    /** Return icon based on props and model **/
    get icon(): string { return super.icon || this.model.meta?.icon }

    /** Return panel's title based on view and current item. */
    get title(): string {
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
        return super.title
    }

    /**
     * Edit a new item.
     *
     * @param view - edit view.
     */
    create(view: string='.detail.add') {
        this.panels.show({panel: this.name, view, value: new this.model()})
    }

    /** Called when an item has been created. By default, show edit view. */
    created(value: M, view: string=".detail.edit") {
        this.panels.show({panel: this.name, view, value, force: true})
        this.list.fetch()
    }
}


export default interface ModelPanel<M extends Model,P extends IModelPanelProps<M>=IModelPanelProps<M>,O=IModelPanel<M>> extends IModelPanel<M,P> {
    showFilters: boolean
}
