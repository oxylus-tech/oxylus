import {
    computed, inject, isRef, toRefs, unref, watch,
    onMounted, onUnmounted, provide, reactive,
} from 'vue'

import type {Reactive, Ref, WatchHandle} from 'vue'
import type {Repository} from 'pinia-orm'

import {injectOrProvide} from '../utils'
import type {IObject} from '../utils'
import type {Repos, Model} from '../models'

import {
    Panels, Panel, ModelPanel,
    Query, ModelList,
    Editor, ModelEditor
} from '../controllers'

import type {
    IPanels, IPanel, IPanelProps,
    IModelPanel, IModelPanelProps,
    IModelList, IEditor, IModelEditor,
} from '../controllers'


//---- Panels
/**
 * Create a new reactive {@link Panels} and provide it as `panels`.
 *
 * @return the reactive Panels.
 */
export function usePanels(options: IPanels) {
    const obj = reactive(new Panels(options))
    provide('panels', obj)
    return obj
}


/** Create a new {@link Panel}. */
export function usePanel<P extends IPanelProps>(options: IPanel<P>): Reactive<Panel<P>> {
    const obj = reactive(new Panel(options))
    initPanel(obj)
    return obj
}

export interface IUseModelPanel<M extends Model> {
    query?: Query<M>
    repos?: Repos
}

/** Create a new {@link ModelPanel}. */
export function useModelPanel<M extends Model, P extends IModelPanelProps<M>>(
    {query, repos, props, ...options}: IModelPanel<M,P>
): Reactive<ModelPanel<M,P>>
{
    repos ??= inject('repos')
    query ??= useQuery(props.repo, inject('repos'))
    options.panels ??= inject('panels')

    options.list ??= useModelList({query, relations: props.relations})
    const obj = reactive(new ModelPanel({props, ...options}))
    initPanel(obj)

    // obj.item = computed(() => obj.value ? obj.list.queryset(obj.value).first() : null)
    obj.next = computed(() => obj.value ? obj.list.getSibling(unref(obj.value), 1) : null)
    obj.prev = computed(() => obj.value ? obj.list.getSibling(unref(obj.value), -1) : null)
    return obj
}

/** Initialize the reactive {@link Panel}:
*
* - add panels' watcher;
* - provide `panel`;
*/
export function initPanel<P extends IPanelProps>(obj: Reactive<Panel<P>>) {
    provide('panel', obj)
    onMounted(() => obj.panels.register(obj.name, obj))
    onUnmounted(() => obj.panels.unregister(obj.name))

    if(obj.onViewChange)
        watch(() => obj.view, (val) => obj.onViewChange(val))
    //if(obj.onValueChange)
    //    watch(() => obj.value, (val) => obj.onValueChange(val))
}


//---- Controllers
/** Create a new {@link List} and provide it as `list`. */
export function useModelList<M extends Model>(options : IModelList<M>, cls: typeof ModelList = ModelList) : Reactive<ModelList<M>>
{
    const obj = reactive(new cls(options))
    provide('list', obj)
    obj.items = computed(() => obj.ids ? obj.queryset(obj.ids).get() : [])
    return obj
}

/** This composable return a new query from provided arguments. */
export function useQuery(repo: Repository, repos: Repos|null=null) {
    const query = new Query(repo, repos)
    provide('query', query)
    return query
}


export interface IUseEditor<T extends IObject> {
    emits?: (k: string, ...args: any) => void
    panel: Panel
}

/**
 * This composable create an new Editor and returns it as reactive object.
 * It register the newly created editor when `editors` and `key` are provided.
 */
export function useEditor<T extends IObject>({emits=null, panel=null, ...options}: IEditor<T> & IUseEditor<T>): Reactive<Editor<T>> {
    const initial = options.initial || unref
    const obj = reactive(new Editor(options))
    initEditor(obj, {emits, panel})
    return obj
}

/** Return a new reactive {@link ModelEditor} */
export function useModelEditor<T extends Model>({emits=null, panel=null, ...options}: IModelEditor<T> & IUseEditor<T>): Reactive<ModelEditor<T>> {
    const obj = reactive(new ModelEditor(options))
    initEditor(obj, {emits, panel})
    return obj
}

/**
 * Initialize reactive {@link Editor}:
 *
 * - provide `editor`
 * - set default `saved` method if emits is provided
 * - watch on edition to update panel's editions
 */
export function initEditor<T extends IObject>(obj: Reactive<Editor<T>>) {
    provide('editor', obj)

    obj.edited = computed(() => obj.isEdited())
    watch(() => obj.initial, (val) => obj.reset(val || {}))

    const panel = inject('panel')
    if(panel)
        watch(() => obj.edited, (val: boolean) => panel.setEdition(obj.name, val))
}
