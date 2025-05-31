import { models, t } from "ox"
import { Country } from '@ox/locations/models'
import type { IModel } from "ox"


/**
 * Base model for contacts.
 */
class Contact extends models.Model {
    static fields() {
        return {
            id: this.attr(null),
            name: this.string(),
            description: this.string(),

            // Thoses values are nested and we keep them as is
            emails: this.attr([]),
            phones: this.attr([]),
            addresses: this.attr([]),
        }
    }

    /*
    static create(val, old) {
        val.emails = val.emails.map(v => new Email(v))
        val.phones = val.phones.map(v => new Phone(v))
        val.addresses = val.addresses.map(v => new Address(v))
    }
    */
}


export class Person extends Contact {
    static entity = "persons"
    static meta = new models.Meta({
        app: "ox_contacts",
        model: "person",
        url: "ox/contacts/person/",
        title: "full_name",
    })

    static fields() {
        return {
            ...super.fields(),
            user: this.number(),
            email: this.string(),
            first_name: this.string(),
            last_name: this.string(),
            organisations: this.attr([]),
            $organisations: this.hasManyBy(Organisation, 'organisations')
        }
    }

    get full_name() {
        return `${this.last_name} ${this.first_name}`
    }
}


export class OrganisationType extends models.Model {
    static entity = "organisationTypes"
    static meta = new models.Meta({
        app: "ox_contacts",
        model: "organisationtype",
        url: "ox/contacts/organisationtype/",
        title: "name",
    })

    static fields() {
        return {
            id: this.attr(null),
            name: this.string(),
            country: this.string(),
            abbreviation: this.string(),
            language_code: this.string(),
            code: this.string(),
            $country: this.belongsTo(Country, 'country'),
        }
    }
}

export class Organisation extends Contact {
    static entity = "organisations"
    static meta = new models.Meta({
        app: "ox_contacts",
        model: "organisation",
        url: "ox/contacts/organisation/",
        title: "name",
    })

    static fields() {
        return {
            ...super.fields(),
            short_name: this.string(),
            color: this.string(),
            group: this.number(),
            vat: this.string(),
            type: this.string(),
            country: this.string(),
            $type: this.belongsTo(OrganisationType, 'type'),
            $country: this.belongsTo(Country, 'country'),
        }
    }
}


export class ContactInfo extends models.Model {
    static fields() {
        return {
            id: this.attr(null),
            contact: this.attr(null),
            kind: this.attr(null),
        }
    }

    static Kind = {
        MAIN: 0,
        PROFESSIONAL: 1,
        HOME: 2,
        LEGAL: 3,
        OTHER: 16,

        display(value) {
            return t(`enums.contactinfo_kind.${value}`)
        }
    }

    static get kindItems() {
        // we need to delay because title needs to be translated.
        if(!this._kindItems) {
            this._kindItems = Object.values(ContactInfo.Kind).filter(v => (typeof v == "number"))
            this._kindItems.sort((a, b) => a.value - b.value)
        }
        return this._kindItems
    }

    /*
    /** Get this' kind as human readable string /
    get kindDisplay() {
        return t(`enums.contactinfo_kind.${item[1]}`)
    }*/
}


/** As items to be rendered in a v-select */



export class Address extends ContactInfo {
    static meta = new models.Meta({
        app: "ox_contacts",
        model: "address",
    })

    static fields() {
        return {
            ...super.fields(),
            street: this.string(),
            street_2: this.string(),
            number: this.number(),
            box: this.string(),
            city: this.string(),
            country: this.string(),
            $country: this.belongsTo(Country, 'country'),
        }
    }
}


export class Email extends ContactInfo {
    static meta = new models.Meta({
        app: "ox_contacts",
        model: "email",
    })

    static fields() {
        return {
            ...super.fields(),
            email: this.string()
        }
    }
}

export class Phone extends ContactInfo {
    static meta = new models.Meta({
        app: "ox_contacts",
        model: "phone",
    })

    static fields() {
        return {
            ...super.fields(),
            number: this.string()
        }
    }
}

export class BankAccount extends ContactInfo {
    static meta = new models.Meta({
        app: "ox_contacts",
        model: "bankaccount",
    })

    static fields() {
        return {
            ...super.fields(),
            name: this.string(),
            iban: this.string(),
            bic: this.string(),
            address: this.string(),
        }
    }
}
