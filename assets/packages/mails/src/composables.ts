import {useModels} from '@oxylus/ox'
import {Agent} from '@oxylus/auth/models'
import * as models from './models'

/** Use file's models. */
export function useMailModels() : Object {
    return useModels([
        Agent, models.MailAccount, models.Mail
    ])
}


export function useMailAccounts() : Object {
    return useModels([ Agent, models.MailAccount ])
}
