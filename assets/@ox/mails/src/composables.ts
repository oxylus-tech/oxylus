import {useModels} from 'ox'
import {Agent} from '@ox/auth/models'
import {Person, ContactList} from '@ox/contacts/models'
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
