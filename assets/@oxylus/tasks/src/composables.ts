import { useModels } from '@oxylus/core'
import { Task } from './models'

/** Use @oxylus/tasks models. */
export function useTasksModels() {
    return useModels([Task], {withDefaults: false})
}
