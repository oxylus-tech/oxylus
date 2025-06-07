import {useModels} from 'ox'
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


/** Update list filters based on {@link OxFolderNav} `selected` event. */
export function onFolderNav(list, event) {
    list.filters.folder__uuid = event.folder
    list.filters.owner__uuid = event.owner
}
