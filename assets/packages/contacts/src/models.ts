import { models, t } from "@oxylus/ox"
import { Country } from '@oxylus/locations/models'


/** Contact list */
export class ContactList extends models.Model {
    static entity = "contactLists"
    static meta = new models.Meta({
        app: 'ox_contacts',
        model: 'contactlist',
        url: 'ox/contacts/contactlist/',
        title: 'name'
    })

    static fields() {
        return {
            id: this.attr(null),
            name: this.string(""),
            description: this.string(""),
            color: this.string(""),
            group: this.number(null),
            organisation: this.string(""),
            is_subscription: this.boolean(false),
            contacts: this.attr([]),
            contact_count: this.number(0),

            $organisation: this.belongsTo(Organisation, 'organisation'),
            $group: this.belongsTo(models.Group, 'group')
        }
    }
}


/**
 * Base model for contacts.
 */
class BaseContact extends models.Model {
    static fields() {
        return {
            id: this.attr(null),
            name: this.string(""),
            email: this.string(""),

            // Thoses values are nested and we keep them as is
            emails: this.attr([]),
            phones: this.attr([]),
            addresses: this.attr([]),
        }
    }
}


export class Person extends BaseContact {
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
            user: this.number(null),
            first_name: this.string(""),
            last_name: this.string(""),
            organisations: this.attr([]),
            contact_lists: this.attr([]),
            $organisations: this.hasManyBy(Organisation, 'organisations'),
            $contact_lists: this.hasManyBy(ContactList, 'contact_lists'),
        }
    }

    first_name: string
    last_name: string

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
            name: this.string(""),
            country: this.string(""),
            abbreviation: this.string(""),
            language_code: this.string(""),
            code: this.string(""),
            $country: this.belongsTo(Country, 'country'),
        }
    }
}

export class Organisation extends BaseContact {
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
            short_name: this.string(""),
            color: this.string(""),
            reference: this.string(""),
            group: this.number(null),
            vat: this.string(""),
            type: this.string(""),
            country: this.string(""),
            contact_list: this.string(""),
            $type: this.belongsTo(OrganisationType, 'type'),
            $country: this.belongsTo(Country, 'country'),
        }
    }
}


/**
 * Model for Contact. It should never be used to write data as
 * this is a base django concrete model class.
 */
export class Contact extends models.Model {
    static entity = "contacts"
    static meta = new models.Meta({
        app: "ox_contacts",
        model: "contact",
        url: "ox/contacts/contact/",
        title: "name",
    })

    static fields() {
        return  {
            id: this.attr(null),
            name: this.string(""),
            email: this.string(""),
            person: this.attr(null),
            organisation: this.attr(null),
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

    static Kind = models.Enum("kind", {
        MAIN: 0,
        PROFESSIONAL: 1,
        HOME: 2,
        LEGAL: 3,
        OTHER: 16,
    })
}


export class Address extends ContactInfo {
    static meta = new models.Meta({
        app: "ox_contacts",
        model: "address",
    })

    static fields() {
        return {
            ...super.fields(),
            street: this.string(""),
            street_2: this.string(""),
            number: this.number(null),
            box: this.string(""),
            city: this.string(""),
            country: this.string(""),
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
            email: this.string("")
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
            number: this.string("")
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
            name: this.string(""),
            iban: this.string(""),
            bic: this.string(""),
            address: this.string(""),
        }
    }
}
