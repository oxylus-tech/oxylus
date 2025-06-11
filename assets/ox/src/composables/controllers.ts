import {
    computed, inject, isRef, toRefs, unref, watch,
    onMounted, onUnmounted, provide, reactive, toRaw
} from 'vue'
import { isEqual } from 'lodash'

import type {ComputedRef, Reactive, Ref, WatchHandle} from 'vue'
import type {Repository} from 'pinia-orm'

import {State} from '../utils'
import type {Repos, Model} from '../models'

import {
    Panels, Panel, ModelPanel,
    Query, ModelList,
    Editor, ModelEditor
} from '../controllers'

import type {
    IPanels, IPanel, IPanelProps,
    IModelPanel, IModelPanelProps,
    IModelList,
    IEditor, IEditorProps, IModelEditorProps,
    IQueryFetch
} from '../controllers'


//---- Panels
/**
 * Create a new reactive {@link Panels} and provide it as `panels`.
 *
 * It also creates watchers in order to:
 * - update document title based on current panel's view
 * - keep track of current view's url: when a panels' getUrlParams changes, it will `History.pushState` storing those params;
 *
 * @return the reactive Panels.
 */
export function usePanels(options: IPanels) {
    const panels = reactive(new Panels(options))
    provide('panels', panels)

    onMounted(() => {
        panels.readDocumentLocation()
        panels.panel && panels.show({
            panel: panels.panel, silent: true,
            ...panels.params
        })
    })

    window.addEventListener("popstate", (event) => {
        if(event.state)
            panels.show({...event.state, silent: true})
    })

    // we update title after history state
    const initialTitle = document.title
    watch(() => panels.current?.title, (val) => {
        if(val)
            document.title = `${val} | ${initialTitle}`
        else
            document.title = initialTitle
    })

    return panels
}

/** Create a new {@link Panel}.
*
* - (un)register the panel to object's `panels` on (un)mount.
* - provide `panel`;
* - watch on {@link Panel.view} calling {@link Panel.onViewChange}
*/
export function usePanel<P extends IPanelProps>(options: IPanel<P>, cls: typeof Panel<P>) {
    const panel = reactive(new cls(options))

    provide('panel', panel)
    onMounted(() => panel.panels.register(panel.name, panel))
    onUnmounted(() => panel.panels.unregister(panel.name))

    // watch(() => panel.view, (val, old) => val != old && panel.onViewChange(val))
    return {panel}
}

/** Create a new {@link ModelPanel}. */
// TODO: allow to pass list down
export function useModelPanel<M extends Model, P extends IModelPanelProps<M>>(
    {query, repos, ...options}: IModelPanel<M,P>
)
{
    repos ??= inject('repos')
    query ??= new Query(options.props.repo, repos)
    options.panels ??= inject('panels')

    const {list, items} = useModelList({
        query,
        relations: options.props.relations,
        fetchRelations: options.props.fetchRelations
    })
    const {panel} = usePanel({list, ...options}, ModelPanel)

    const next = computed(() => {
        const index = list.getSiblingIndex(unref(panel.value), 1)
        return items.value[index] ?? null
    })
    const prev = computed(() => {
        const index = list.getSiblingIndex(unref(panel.value), -1)
        return items.value[index] ?? null
    })

    return {panels: panel.panels, panel, list, items, next, prev}
}


//---- Controllers
/** Create a new {@link List} and provide it as `list`. */
export function useModelList<M extends Model>(options : IModelList<M>, cls: typeof ModelList = ModelList)
{
    const list = reactive(new cls(options))
    const listId = list.repo.refs.acquireKey()

    // FIXME:
    // - we have items in order for them to be updated from repo
    // - list stores items as items
    // - we query items from db using list.ids (= maps of list.items)
    // - this adds levels of indirections and extra layers
    const items = computed(() => list.queryset(list.ids).orderBy(id => list.ids.indexOf(id)).get())

    // release - acquire refs
    watch(() => list.ids, (val, old) => {
        if(!isEqual(toRaw(val), toRaw(old)))
            list.repo.refs.releaseAcquire(listId, old, val)
    })
    onUnmounted(() => list.repo.refs.flush(listId))

    provide('list', list)
    provide('items', items)
    return {list, items, listId}
}

/**
 * This composable return a new {@link Query}, {@link State} and a fetch
 * function that combines them.
 */
export function useQuery<M extends Model>(repo: Repository<M>, repos: Repos|null=null, opts: IQueryFetch<M>) {
    const query = new Query(repo, repos, opts)
    const state = State.none()

    async function fetch(opts: IQueryFetch<M>) {
        state.processing()
        let resp = null
        try {
            resp = await query.fetch(opts)
            state.none()
        }
        catch(error) {
            state.error(error)
        }
        return resp
    }
    return {state, query, fetch}
}


/**
 * This composable create an new Editor and returns it as reactive object.
 *
 * - provide `editor`
 * - set default `saved` method if emits is provided
 * - watch on edition to update panel's editions
 */
export function useEditor<
    T extends Record<string,any>,
    P extends IEditorProps<T>,
>(
    options: IEditor<T,P>,
    cls: typeof Editor<T,P>=Editor<T,P>
)
{
    const initial = options.initial || options.props.initial
    const editor = reactive(new cls(options))

    provide('editor', editor)

    const edited = computed(() => editor.isEdited())
    watch(() => editor.props.initial, (val) => {
        editor.initial = val || editor.empty
        editor.reset(val || editor.empty)
    })

    const panel = inject('panel') as Panel
    if(panel)
        watch(() => editor.edited, (val: boolean) => panel.setEdition(editor.name, val))

    return {editor, edited}
}

/** Return a new reactive {@link ModelEditor} */
export function useModelEditor<
    T extends Model,
    P extends IModelEditorProps<T>
>(
    options: IEditor<T,P>,
    cls: typeof ModelEditor<T,P> = ModelEditor<T,P>
)
{
    return useEditor(options, cls)
}
