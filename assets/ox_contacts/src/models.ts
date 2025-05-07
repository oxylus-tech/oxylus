import { models } from "ox"
import type { IModel } from "ox"


export class Country extends models.Model {
    static entity = "countries"
    static meta = new models.Meta({
        app: "ox_contacts",
        model: "country",
        url: "ox/contacts/country",
        title: "name"
    })

    static fields() {
        return {
            id: this.attr(null),
            name: this.string(),
            flag: this.string(),
            code: this.string(),
            code_3: this.string(),
            phone: this.number()
        }
    }
}


class Contact extends models.Model {
    static fields() {
        return {
            id: this.attr(null),
            book: this.number(),
            name: this.string(),
            description: this.string(),

            // Thoses values are nested and we keep them as is
            emails: this.attr([]),
            phones: this.attr([]),
            addresses: this.attr([]),
        }
    }
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
            first_name: this.string(),
            last_name: this.string(),
            organisation_ids: this.attr([]),
            organisations: this.hasManyBy(Organisation, 'organisation_ids')
        }
    }

    get full_name() {
        return `${this.last_name} ${this.first_name}`
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
            group: this.number(),
            company_form: this.string(),
            vat: this.string(),
            color: this.string(),
            country_id: this.number(),
            country: this.belongsTo(Country, 'country_id'),
        }
    }
}


class ContactInfo extends models.Model {
    static fields() {
        return {
            id: this.attr(null),
            contact: this.attr(null),
            kind: this.attr(null),
        }
    }
}


class Address extends ContactInfo {
    static fields() {
        return {
            ...super.fields(),
            street: this.string(),
            street_2: this.string(),
            number: this.number(),
            box: this.string(),
            city: this.string(),
            country_id: this.number(),
            country: this.belongsTo(Country, 'country_id'),
        }
    }
}


class Email extends ContactInfo {
    static fields() {
        return {
            ...super.fields(),
            email: this.string()
        }
    }
}

class Phone extends ContactInfo {
    static fields() {
        return {
            ...super.fields(),
            number: this.string()
        }
    }
}
