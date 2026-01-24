import {type ComputedRef, computed, provide, ref, unref} from 'vue'

import type {Model, ModelType, Repository, Repos} from '../models'
import {t} from './i18n'
import {type UsePanel, type PanelDefinition, usePanel} from './router'
import {useModelList} from './controllers'
import {ModelList, Query} from '../controllers'


export interface ModelPanelDefinition<M extends Model> extends PanelDefinition {
    /** Model repository **/
    repo: Repository<ModelType<M>>
    /** All model repositories **/
    repos?: Repos
    /** List table headers **/
    headers?: string[]
    /** Related fields to get from pinia orm's database and eventually fetch when items are retrieved from API.  */
    relations?: string[]
    /** Fetch related fields from API when queried */
    fetchRelations: boolean
    /** Search filter lookup */
    search: string
    /** Display this warning on the top of the panel. */
    warning?: string
}


export interface UseModelPanel<M extends Model> extends UsePanel {
    query: Query<ModelType<MT>>
    model: MT
    item: ComputedRef<M|null>

    list: ModelList<ModelType<M>>
    items: ComputedRef<M[]>
    next: ComputedRef<MT|null>
    prev: ComputedRef<MT|null>

    title: ComputedRef<string>
}


export const ModelPanelSymbol = Symbol('OxModelPanel')


export function useModelPanel(def: ModelPanelDefinition) {
    def = {...def}

    const defTitle = def.title
    def.title = computed(() => {
        const view = infos.activeView.value
        if(model)
            switch(view?.category) {
                case 'list':
                    return t(model, 3)
                case 'detail':
                    const obj = unref(item)
                    if(obj?.$title)
                        return obj.$title
                    if(obj?.id)
                        return t('models._.title', {model: t(model), id: obj.id})
                case 'create':
                    return t('models._.title.new', {model: t(model)})
            }
        return view?.title || defTitle
    })

    const {router, ...infos} = usePanel(def)


    // ---- general info
    const model = def.repo.use as typeof Model
    const showFilters = ref(false)

    // ---- list
    const query = new Query(def.repo, def.repos)
    const {list, items} = useModelList({
        query,
        relations: def.relations,
        fetchRelations: def.fetchRelations
    })

    const loading = ref(false)
    const itemId = ref(null)
    const item = computed({
        get() {
            if(infos.active.value && router.location.value) {
                const id = unref(router.location.value)
                let q = def.repo
                if(def.relations?.length)
                    def.relations.forEach(v => (q = q.with(v)))

                const obj = q.find(id)
                if(!obj && !loading.value) {
                    loading.value = true
                    query.fetch({id}).then(() => loading.value = false)
                }
                return obj
            }
            return null
        },

        set(v) {
            router.location.value = v
        }
    })
    const next = computed(() => items.value[list.getSiblingIndex(router.location.value, 1)])
    const prev = computed(() => items.value[list.getSiblingIndex(router.location.value, -1)])

    const modelPanel = {
        ...infos, router,
        model, showFilters,
        list, items, item, next, prev,
    }
    provide(ModelPanelSymbol, modelPanel)
    return modelPanel
}
