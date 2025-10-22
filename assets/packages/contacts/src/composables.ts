import {models as oxModels, useModels, t} from '@oxylus/ox'
import {Country} from '@oxylus/locations/models'
import * as models from './models'
import type {IUseModelOpts} from '@oxylus/ox'
import type {Model, Repos} from '@oxylus/ox/models'


/**
 * Use contact models (wrapper over {@link useModel}).
 */
export function useContactModels(items: Array<typeof Model> =[], opts: IUseModelOpts = {}) : Repos {
    return useModels([
        oxModels.User, oxModels.Group,

        Country, models.Person,
        models.Organisation, models.OrganisationType,
        ...items
    ], opts)
}


export function useContactList() : Repos {
    return useModels([
        oxModels.Group, models.Organisation, models.Person, models.Contact, models.ContactList
    ])
}



/** Rule validating VAT number */
const vatReg = new RegExp(
    "ATU[0-9]{8}|" + // Austria
    "BE[0-1][0-9]{9}|" + // Belgium
    "BG[0-9]{9,10}|" + // Bulgaria
    "HR[0-9]{11}|" + // Croatia
    "CY[0-9]{8}[A-Z]|" + // Cyprus
    "CZ[0-9]{8,10}|" + // Czech Republic
    "DE[0-9]{9}|" + // Germany
    "DK[0-9]{8}|" + // Denmark
    "EE[0-9]{9}|" + // Estonia
    "EL[0-9]{9}|" + // Greece
    "ES[A-Z][0-9]{7}(?:[0-9]|[A-Z]) |" + // Spain
    "FI[0-9]{8}|" + // Finland
    "FR[0-9A-Z]{2}[0-9]{9}|" + // France
    "GB([0-9]{9}([0-9]{3})?|[A-Z]{2}[0-9]{3})|" + // United Kingdom
    "HU[0-9]{8}|" + // Hungary
    "IE[0-9]{7}[A-Z]{1,2}  |" + // Ireland
    "IE[0-9][A-Z][0-9]{5}[A-Z]|" + // Ireland (2)
    "IT[0-9]{11}|" + // Italy
    "LT([0-9]{9}|[0-9]{12}) |" + // Lithuania
    "LU[0-9]{8}|" + // Luxembourg
    "LV[0-9]{11}|" + // Latvia
    "MT[0-9]{8}|" + // Malta
    "NL[0-9]{9}B[0-9]{2}|" + // Netherlands
    "PL[0-9]{10}|" + // Poland
    "PT[0-9]{9}|" + // Portugal
    "RO[0-9]{2,10}|" + // Romania
    "SE[0-9]{12}|" + // Sweden
    "SI[0-9]{8}|" + // Slovenia
    "SK[0-9]{10}" // Slovakia
)

/** Rule validating VAT number for European countries. */
export function vatRule(value: string) {
    return vatReg.test(value) || t(`fields.vat.rule`)
}
