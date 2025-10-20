import { useModels } from '@oxylus/ox'
import { Task } from './models'

/** Use @oxylus/tasks models. */
export function useTasksModels() {
    return useModels([Task], {useDefaults: false})
}
