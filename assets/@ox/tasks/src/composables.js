import { useModels } from 'ox';
import { Task } from './models';
/** Use @ox/tasks models. */
export function useTasksModels() {
    return useModels([Task], { withDefaults: false });
}
