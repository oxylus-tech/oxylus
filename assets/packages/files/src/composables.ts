import {useModels, t, type Model} from '@oxylus/ox'
import {Agent} from '@oxylus/auth/models'
import * as models from './models'


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
