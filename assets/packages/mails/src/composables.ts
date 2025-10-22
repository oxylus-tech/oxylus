import {useModels} from '@oxylus/ox'
import {Agent} from '@oxylus/auth/models'
import {Person, ContactList} from '@oxylus/contacts/models'
import * as models from './models'

/** Use file's models. */
export function useMailModels() : Object {
    return useModels([
        Agent, Person, ContactList, models.MailAccount, models.SendMail
    ])
}


export function useMailAccounts() : Object {
    return useModels([ Agent, models.MailAccount ])
}
