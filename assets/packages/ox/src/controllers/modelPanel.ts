import {computed, reactive, toRefs} from 'vue'
import type {Reactive} from 'vue'

import {Model} from '../models'
import {mapToObject} from '../utils'
import {t, tKeys} from '../composables/i18n'

import type ModelList from './modelList'
import type Query from './query'
import type {ModelType, Repository, Repos} from '../models'

import type {default as IPanel, IPanelProps, IPanelParams, IPanelShow} from './panel'
import type Panels from './panels'

import Panel from './panel'
import {query} from './query'


/** Model panel component properties. */
export interface IModelPanelProps<MT extends ModelType> extends IPanelProps {
    /** Current repository */
    repo: Repository<MT>
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

/** Display/GET parameters for displaying a view on {@link ModelPanel} */
export interface IModelPanelParams extends IPanelParams {
    id?: number|string
}

/** Options for {@link ModelPanel.show} */
export interface IModelPanelShow<MT extends ModelType> extends IPanelShow<InstanceType<MT>> {
    id?: number|string
}

/** Model panel interface. */
export interface IModelPanel<
    MT extends ModelType,
    P extends IModelPanelProps<MT> = IModelPanelProps<MT>
> extends IPanel<InstanceType<MT>, P>
{
    /** List controller used to load and handle multiple items from the server. */
    list: ModelList<MT>
    /** Detail controller used to load and handle a single item from the server. */
    //detail: ModelListDetail<M>
}

/** This class handles model panel (used by {@link OxModelPanel}. */
export default class ModelPanel<
    MT extends ModelType,
    P extends IModelPanelProps<MT> = IModelPanelProps<MT>,
> extends Panel<InstanceType<MT>, P>
{
    showFilters: boolean = false

    constructor(options: ModelPanel<MT,P>) {
        super(options)
        this.showFilters = this.props?.showFilters || false
    }

    /** Current model's repository. */
    get repo(): Repository<MT> { return this.props.repo }

    /** Current model. */
    get model(): MT { return this.repo.use }

    /** Query (shortcut to `this.list.query`). **/
    get query(): Query<MT> { return this.list.query }

    /** Return icon based on props and model **/
    get icon(): string { return super.icon || this.model.meta?.icon }

    /** Return panel's title based on view and current item. */
    get title(): string {
        const {props, list} = this
        const model = this.repo.use as typeof Model
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

    getUrlParams(): IModelPanelParams {
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
    created(value: InstanceType<MT>, view: string="detail.edit") {
        // this.list.load()
        this.show({view, value})
    }

    show({id=null, ...params}: IModelPanelShow<MT>): boolean {
        if(id) {
            // FIXME: this.relations or this.props.relations
            query(this.repo).fetch({id, relations: this.props.relations}).then(r => {
                super.show({...params, value: r.entities[0] as InstanceType<MT>})
                return r
            })
        }
        else
            return super.show(params)
    }
}


export default interface ModelPanel<MT extends ModelType, P extends IModelPanelProps<MT>=IModelPanelProps<MT>>
    extends IModelPanel<MT,P>
{
    //detail: ModelListDetail<M>
    showFilters: boolean
}
