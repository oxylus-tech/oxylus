import {computed, reactive, toRefs} from 'vue'
import type {Reactive} from 'vue'
import type {Repository} from 'pinia-orm'

import {Model} from '../models'
import {mapToObject} from '../utils'
import {t, tKeys} from '../composables/i18n'

import type ModelList from './modelList'
import type Query from './query'
import type {Repos} from '../models'

import type {IPanel, IPanelProps} from './panel'
import type Panels from './panels'

import Panel from './panel'
import {query} from './query'


/** Model panel component properties. */
export interface IModelPanelProps<M extends Model> extends IPanelProps {
    /** Current repository */
    repo: Repository<M>
    // search: string
    /** Current view */
    view: string
    /** List table headers */
    headers?: string[]
    /** Related fields to get from pinia orm's database and eventually fetch when items are retrieved from API.  */
    relations?: string[]
    /** Show filters */
    showFilters?: boolean
    /** Fetch related fields from API when queried */
    fetchRelations: boolean
    /** Search filter lookup */
    search: string

    /**
     * Display this warning on the top of the panel.
     */
    warning?: string
}

/** Model panel interface. */
export interface IModelPanel<
    M extends Model,
    P extends IModelPanelProps<M> = IModelPanelProps<M>
> extends IPanel<P>
{
    /** List controller used to load and handle multiple items from the server. */
    list: ModelList<M>
    /** Detail controller used to load and handle a single item from the server. */
    //detail: ModelListDetail<M>
}


/** This class handles model panel (used by {@link OxModelPanel}. */
export default class ModelPanel<
    M extends Model,
    P extends IModelPanelProps<M> = IModelPanelProps<M>,
> extends Panel<P>
{
    showFilters: boolean = false

    constructor(options: IModelPanel<M,P>) {
        super(options)
        this.showFilters = this.props?.showFilters || false
    }

    /** Current model's repository. */
    get repo(): Repository<M> { return this.props.repo }

    /** Current model. */
    get model(): typeof Model { return (this.repo.use as typeof Model) }

    /** Query (shortcut to `this.list.query`). **/
    get query(): Query<M> { return this.list.query }

    /** Return icon based on props and model **/
    get icon(): string { return super.icon || this.model.meta?.icon }

    /** Return panel's title based on view and current item. */
    get title(): string {
        const {props, list} = this
        const model = this.repo.use
        if(model) {
            // many items
            if(this.view?.startsWith('list.'))
                return t(tKeys.model(model), 3)

            if(this.view?.startsWith('detail.')) {
                if(this.value?.$title)
                    return this.value.$title

                const name = t(tKeys.model(model))
                return this.value?.id
                    ? t(`models._.title`, {model: name, id: this.value.id})
                    : t(`models._.title.new`, {model: name})
            }
        }
        return super.title
    }

    getUrlParams() {
        const {value=null, ...params} = super.getUrlParams()
        if(value?.id)
            params.id = value.id
        return params
    }

    /**
     * Edit a new item.
     *
     * @param view - edit view.
     */
    create(view: string='detail.edit') {
        this.show({view, value: null})
    }

    /** Called when an item has been created. By default, show edit view. */
    created(value: M, view: string="detail.edit") {
        // this.list.load()
        this.show({view, value})
    }

    show({id=null, ...params}: {view?: string, value?: M, id: number}) {
        if(id) {
            query(this.repo).fetch({id, relations: this.relations}).then(r => {
                super.show({...params, value: r.entities[0]})
                return r
            })
        }
        else
            return super.show(params)
    }
}


export default interface ModelPanel<M extends Model,P extends IModelPanelProps<M>=IModelPanelProps<M>,O=IModelPanel<M>> extends IModelPanel<M,P> {
    showFilters: boolean
}
