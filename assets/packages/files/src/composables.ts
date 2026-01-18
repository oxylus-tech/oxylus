import {useModels, t, type Model} from '@oxylus/ox'
import {Agent} from '@oxylus/auth/models'
import * as models from './models'

import {useI18n, type LocaleLoaders} from '@oxylus/ox'
import {contentLocales} from '@oxylus/content/composables'


/** The ox content locales loader **/
export const filesLocales: LocaleLoaders = {
    ...contentLocales,
    ox_file: import.meta.glob('./locale/*.json', { import: 'default'})
}


/** Use ox file locales **/
export function useFilesI18n(locales?: LocaleLoaders = {}) {
    return useI18n({...filesLocales, ...locales})
}


/** Use file's models. */
export function useFilesModels(extraModels: Model[] = []) : Object {
    return useModels([
        Agent, models.File, models.Folder,
        ...extraModels
    ])
}

/** Use Folder model (load Folder and Agent) */
export function useFolders() : Object {
    return useModels([
        Agent, models.Folder,
    ])
}

/** Validate file and folder names **/
export function fileNameRule(val: string) {
    if(val.includes('/'))
        return t('fields.file_name.rules.invalid_characters')
}
