import {useModels} from 'ox'
import {Agent} from '@ox/auth/models'
import {Person} from '@ox/contacts/models'
import * as models from './models'

/** Use file's models. */
export function useMailModels() : Object {
    return useModels([
        Agent, Person, models.MailTemplate, models.MailAccount, models.OutMail
    ])
}


export function useMailAccounts() : Object {
    return useModels([ Agent, models.MailAccount ])
}
