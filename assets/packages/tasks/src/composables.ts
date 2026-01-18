import {useModels, locales, useI18n} from '@oxylus/ox'
import type {LocaleLoaders} from '@oxylus/ox'

import { Task } from './models'


/** The ox content locales loader **/
export const tasksLocales: LocaleLoaders = {
    ...locales,
    ox_tasks: import.meta.glob('./locale/*.json', { import: 'default'})
}

/** Use ox tasks locales **/
export function useTasksI18n(locales?: LocaleLoaders = {}) {
    return useI18n({...tasksLocales, ...locales})
}

/** Use @oxylus/tasks models. */
export function useTasksModels() {
    return useModels([Task], {useDefaults: false})
}
