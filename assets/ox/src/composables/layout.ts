import {provide} from 'vue'
import {Target, ModelPanel} from '../layout'
import type {ITarget, IModelPanel, IRModelPanel} from '../layout'


/**
 * Create a new reactive {@link layout.Targeŧ} and provide it as `panels`.
 *
 * @return the reactive Target.
 */
export function useTarget(options: ITarget = {}) {
    const obj = Target.reactive(options)
    provide('panels', obj)
    return obj
}

/**
 * @return A new reactive {@link layout.ModelPanel}.
 */
export function useModelPanel(options: IModelPanel) : IRModelPanel<M> {
    return ModelPanel.reactive(options)
}
