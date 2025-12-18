import {
    computed, inject, isRef, toRefs, unref, watch,
    onMounted, onUnmounted, provide, reactive
} from 'vue'

import type {ComputedRef, Reactive, Ref, WatchHandle, UnwrapRef} from 'vue'

import {State, ifNotEqualFn} from '../utils'
import type {Repos, Model, ModelType, Repository} from '../models'

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
export function usePanel<V, P extends IPanelProps>(options: IPanel<P>, cls: typeof Panel<V,P>) {
    const panel = reactive(new cls(options))

    provide('panel', panel)
    onMounted(() => panel.panels.register(panel.name, panel))
    onUnmounted(() => panel.panels.unregister(panel.name))

    // watch(() => panel.view, (val, old) => val != old && panel.onViewChange(val))
    return {panel}
}


export interface IUseModelPanel<MT extends ModelType, P extends IModelPanelProps<MT>> extends IModelPanel<MT,P> {
    /** Provide this query for the {@link ModelList}. **/
    query?: Query<MT>
    /** Provide this repositories to create a {@link Query} used by {@link ModelList}. */
    repos?: Repos
}

/**
 * Create a new {@link ModelPanel}.
 * Return `{panels, panel, list, items, next, prev}` (next and prev are items related to the current selected one by `panel.value`).
 */
// TODO: allow to pass list down
export function useModelPanel<MT extends ModelType, P extends IModelPanelProps<MT>>(
    {query, repos, ...options}: IUseModelPanel<MT,P>
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
    const {panel} = usePanel({list, ...options}, ModelPanel<MT, P>)

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
/**
 * Create a new {@link ModelList} and provide it as `list`.
 *
 * A ModelList only stores the ids of the items, though loading will add them to the
 * repo. In order to keep memory usage low, we use an acquire-release mechanism which
 * will release items from repos that are no longer use by any list.
 *
 * The returned object will have:
 * - `list`: the ModelList instance;
 * - `items`: a computed values based on list's ids;
 * - `listId`: the list id used to track items acquisition and release;
 *
 */
export function useModelList<MT extends ModelType>(options : IModelList<MT>, cls: typeof ModelList = ModelList)
{
    const list = reactive(new cls(options))
    const listId = list.repo.refs.acquireKey()

    // FIXME:
    // - we have items in order for them to be updated from repo
    // - list stores items as items
    // - we query items from db using list.ids (= maps of list.items)
    // - this adds levels of indirections and extra layers
    const items = computed(() => list.length ? list.queryset(list.ids).orderBy(id => list.ids.indexOf(id)).get() : [])

    // release - acquire refs
    watch(
        () => list.ids,
        ifNotEqualFn((val, old) => list.repo.refs.releaseAcquire(listId, old, val))
    )
    onUnmounted(() => list.repo.refs.flush(listId))

    provide('list', list)
    provide('items', items)
    return {list, items, listId}
}

/**
 * This composable return a new {@link Query}, {@link State} and a fetch
 * function that combines them.
 */
export function useQuery<MT extends ModelType>(repo: Repository<MT>, repos: Repos|null=null, opts: IQueryFetch<MT>) {
    const query = new Query(repo, repos, opts)
    const state = State.none()

    async function fetch(opts: IQueryFetch<MT>) {
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
 * - provide: {@link Editor} `editor`, computed value `edited`.
 * - set default `saved` method if emits is provided
 * - watch on edition to update panel's editions
 *
 * @param {IEditor} options - editor options;
 * @param cls - class to instanciate the editor;
 */
export function useEditor<
    T extends Record<string, any>,
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
    watch(() => editor.props.initial, (val: UnwrapRef<T>) => {
        const value : UnwrapRef<T> = val || editor.empty
        editor.initial = value
        editor.reset(value as T)
    })

    const panel = inject('panel') as Panel
    if(panel)
        watch(() => editor.edited, (val: boolean) => panel.setEdition(editor.name, val))

    return {editor, edited}
}

/**
 * Return a new reactive {@link ModelEditor}.
 * Wrapper around {@link useEditor}.
 */
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
