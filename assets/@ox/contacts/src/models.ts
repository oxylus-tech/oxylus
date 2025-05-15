import { models } from "ox"
import { Country } from '@ox/locations/models'
import type { IModel } from "ox"

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

    static config = {
        axiosApi: {
            dataKey: 'results'
        }
    }

    static fields() {
        return {
            ...super.fields(),
            user: this.number(),
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
    static entity = "organisationtypes"
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

    static config = {
        axiosApi: {
            dataKey: 'results'
        }
    }

    static fields() {
        return {
            ...super.fields(),
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
            country: this.string(),
            $country: this.belongsTo(Country, 'country_id'),
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
