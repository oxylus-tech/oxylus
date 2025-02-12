import {computed, reactive} from 'vue'
import type {Reactive} from 'vue'

import {Model} from '../models'
import {mapToObject} from '../utils'
import {useList} from './list'
import {t, tKeys} from './i18n'

import type {IList, IListProps} from './list'
import type {IPanel, IPanelProps} from './panel'
import type {Repos} from '../models'

import {OxList} from 'ox/components'


export type IModelPanelProps = IListProps & IPanelProps & {
    search: string
    view: string
    headers?: string[]
}

export interface IModelPanel {
    panel: IPanel
    repos: Repos
    props: IModelPanelProps
    list: IList
}

export interface IRModelPanel extends Reactive<IModelPanel> {
    title: ComputedRef<string>,
    icon: ComputedRef<string>,
}

class ModelPanel {
    showFilters: boolean = false

    static reactive<M extends Model>(options: IModelPanel): IRModelPanel<M> {
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

    get repo() { return this.props.repo }
    get model() { return this.repo.use }
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
                if(panel.value.title)
                    return panel.value.title

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
        const {value} = this.panel
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
