import {useModels, locales, useI18n, type LocaleLoaders} from '@oxylus/ox'
import type {LocaleLoaders} from '@oxylus/ox'

import {Agent} from '@oxylus/auth/models'
import * as models from './models'


/** The ox mails locales loader **/
export const mailsLocales: LocaleLoaders = {
    ...locales,
    ox_mails: import.meta.glob('./locale/*.json', { import: 'default'})
}

/** Use ox mails locales **/
export function useMailsI18n(locales?: LocaleLoaders = {}) {
    return useI18n({...mailsLocales, ...locales})
}

/** Use file's models. */
export function useMailModels() : Object {
    return useModels([
        Agent, models.MailAccount, models.Mail
    ])
}


export function useMailAccounts() : Object {
    return useModels([ Agent, models.MailAccount ])
}
