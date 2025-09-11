import {useModels, t} from 'ox'
import {Agent} from '@ox/auth/models'
import * as models from './models'

/** Use file's models. */
export function useFilesModels() : Object {
    return useModels([
        Agent, models.File, models.Folder,
    ])
}

/** Use Folder model (load Folder and Agent) */
export function useFolders() : Object {
    return useModels([
        Agent, models.Folder,
    ])
}

/** Validate file and folder names **/
export function fileNameRule(val) {
    if(val.includes('/'))
        return t('fields.file_name.rules.invalid_characters')
}
