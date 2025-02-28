import {inject, provide, toRefs} from 'vue'

import {injectOrProvide} from '../utils'
import type {Repository} from 'pinia-orm'
import type {Repos} from '../models'

import {Panels, ModelPanel, Query, List, Editor, ModelEditor} from '../controllers'
import type {IPanels, IModelPanel, IRModelPanel} from '../controllers'


/**
 * Create a new reactive {@link Panels} and provide it as `panels`.
 *
 * @return the reactive Panels.
 */
export function usePanels(options: IPanels = {}) {
    const obj = Panels.reactive(options)
    provide('panels', obj)
    return obj
}

/**
 * Create a new {@link List} and provide it as `list`.
 *
 * If no `query` if provided, create one using `repo` and `repos`.
 */
export function useList<M extends Model>(options : ListOpts<M>) : IRList<M>
{
    const list = List.reactive<M>(options)
    provide('list', list)
    return list
}


export interface IUseModelPanel extends IModelPanel {
    repos: Repos
}

/**
 * Create a new reactive {@link ModelPanel} and provide it as `panel`.
 *
 * @return the reactive panel.
 */
export function useModelPanel({panels, query, list, repos, ...options}: IUseModelPanel = {}) : IRModelPanel<M> {
    panels = panels ?? inject('panels')
    repos = repos ?? inject('repos')
    query = query ?? injectOrProvide('query', () => new Query(options.props.repo, repos))
    list = list ?? injectOrProvide('list', () => {
        const {value} = toRefs(panels)
        return SelectList.reactive({index: value, query})
    }, true)

    const panel = ModelPanel.reactive({panels, list, ...options})
    provide('panel', panel)
    provide('item', computed(() => panel.list.item))
    return panel
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
    // provide default saved method
    if(emits)
        opts.saved ??= ((item: IObject, editor) => emits('saved', item, editor))

    const editor = editorClass.reactive(opts)
    if(panel) {
        watch(() => editor.edited, (val) => panel.setEdition(editor.name, val))
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
