import {computed, inject, provide, reactive, toRefs, watch} from 'vue'
import type {Reactive, WatchHandle} from 'vue'
import type {Repository} from 'pinia-orm'

import {injectOrProvide} from '../utils'
import type {IObject} from '../utils'
import type {Repos, Model} from '../models'

import {
    Panels, Panel, ModelPanel,
    Query, ModelList, ModelDetail,
    Editor, ModelEditor
} from '../controllers'
import type {
    IPanels, IPanel, IPanelProps,
    IModelPanel, IModelPanelProps,
    IModelList, IModelDetail
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

/** Create a new {@link ModelPanel}. */
export function useModelPanel<M extends Model, P extends IModelPanelProps<M>>(options: IModelPanel<M,P>): Reactive<ModelPanel<M,P>> {
    const obj = reactive(new ModelPanel(options))
    initPanel(obj)
    return obj
}

/** Initialize the reactive {@link Panel}:
*
* - add panels' watcher;
* - provide `panel`;
*/
export function initPanel<P extends IPanelProps>(obj: Reactive<Panel<P>>) {
    provide('panel', obj)
    obj.watcher = watch(() => obj.panels.panel, (val) => obj.onChange(val))
}


//---- Controllers
/** Create a new {@link List} and provide it as `list`. */
export function useModelList<M extends Model>(options : IModelList<M>) : Reactive<ModelList<M>>
{
    const obj = reactive(new ModelList(options))
    provide('list', obj)
    return obj
}

/** Create a new {@link ModelDetail} and provide it as `detail`. */
export function useModelDetail<M extends Model>(options : IModelDetail<M>) : Reactive<ModelDetail<M>>
{
    const obj = reactive(new ModelDetail(options))
    provide('detail', obj)
    return obj
}

/**
 * This composable return a new query from provided arguments.
 */
export function useQuery(repo: Repository, repos: Repos|null=null) {
    const query = new Query(repo, repos)
    provide('query', query)
    return query
}

/**
 * This composable create an new Editor and returns it as reactive object.
 * It register the newly created editor when `editors` and `key` are provided.
 */
export function useEditor({editorClass=Editor, emits=null, panel=null, ...opts}) {
    // default saved method
    if(emits)
        opts.saved ??= ((item: IObject, editor) => emits('saved', item, editor))

    const editor = editorClass.reactive(opts)
    if(panel) {
        watch(() => editor.edited, (val: boolean) => panel.setEdition(editor.name, val))
    }
    return editor
}

/** Return a new reactive ModelEditor */
export function useModelEditor(opts) {
    return useEditor({...opts, editorClass: ModelEditor})
}

// export function arrayEditor(opts) {
//     return editor({...opts, editorClass: ArrayEditor})
// }
//
// export function collectionEditor(opts) {
//     return editor({...opts, editorClass: CollectionEditor})
// }
