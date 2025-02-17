import {computed, reactive, toRefs} from 'vue'
import type {Reactive} from 'vue'

import {Model} from '../models'
import {mapToObject} from '../utils'
import {useList} from './list'
import {t, tKeys} from './i18n'

import type {IList, IListProps} from './list'
import type {IPanel, IPanelProps} from './panel'
import type {Repos} from '../models'

import {OxList} from 'ox/components'


/**
 * Model panel component properties.
 */
export type IModelPanelProps = IListProps & IPanelProps & {
    search: string
    view: string
    headers?: string[]
}

/**
 * Model panel interface.
 */
export interface IModelPanel {
    panel: IPanel
    repos: Repos
    props: IModelPanelProps
    list: IList
}

/**
 * Reactive model panel interface.
 */
export interface IRModelPanel extends Reactive<IModelPanel> {
    title: ComputedRef<string>,
    icon: ComputedRef<string>,
}


/**
 * This class handles model panel (used by {@link OxModelPanel}.
 *
 * It is connected to the current {@link Panel}.
 *
 */
class ModelPanel {
    showFilters: boolean = false

    /**
     * Instanciate and return a reactive model panel.
     */
    static reactive<M extends Model>(options: IModelPanel): IRModelPanel<M> {
        console.log(options)
        const obj = reactive(new this(options))
        obj.title = computed(() => obj.getTitle())
        obj.icon = computed(() => obj.getIcon())
        return obj
    }

    constructor(options: IModelPanel) {
        Object.assign(this, options)
        if(!this.list)
            this.list = this.getList()
        this.showFilters = this.props?.showFilters || false
    }

    /**
     * Current model's repository.
     */
    get repo() { return this.props.repo }

    /**
     * Current model.
     */
    get model() { return this.repo.use }
    /**
     * Current panel's view.
     */
    get view() { return this.panel.view }

    getIcon(): string { return this.props?.icon || this.model.meta?.icon || null }

    /**
     * Return panel's title based on view and current item.
     */
    getTitle(): string {
        const {props, list, panel} = this
        if(this.props.title)
            return this.props.title

        const model = this.repo.use
        if(model) {
            // many items
            if(this.view?.startsWith('list.'))
                return t(tKeys.model(model), 3)

            if(panel.value) {
                if(panel.value.$title)
                    return panel.value.$title

                const name = t(tKeys.model(model))
                return panel.value.id
                    ? t(`models._.title`, {model: name, id: panel.value.id})
                    : t(`models._.title.new`, {model: name})
            }
        }
        return ''
    }

    /**
     * Get instance of list.
     */
    getList() {
        const listProps = mapToObject(OxList.props, this.props)
        const {value} = toRefs(this.panel)
        return useList({...listProps, value, repos: this.repos})
    }

    /**
     * Edit a new item.
     *
     * @param path - path to edit view.
     */
    create(path:string='.detail.add') {
        this.panel.show({path, value: new this.model()})
    }

    /**
     * Called when an item has been created. By default, show edit view.
     */
    created(item, path: string=".detail.edit") {
        this.panel.show({path, value: item, force: true})
        this.list.fetch()
    }
}

export interface ModelPanel extends IModelPanel {
    showFilters: boolean
}


export function useModelPanel(options: IModelPanel) : IRModelPanel<M> {
    return ModelPanel.reactive(options)
}
