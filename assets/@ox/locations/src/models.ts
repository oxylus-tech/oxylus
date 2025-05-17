import { models } from "ox"
import type { IModel } from "ox"


export class Currency extends models.Model {
    static entity = "currencies"
    static meta = new models.Meta({
        app: "ox_locations",
        model: "currency",
        url: "ox/locations/currency/",
        title: "name"
    })

    static fields() {
        return {
            id: this.attr(null),
            name: this.string(),
            code: this.string(),
            numeric: this.string(),
            decimals: this.number(),
            is_iso: this.boolean(),
            valid_to: this.string(null)
        }
    }
}


export class Country extends models.Model {
    static entity = "countries"
    static meta = new models.Meta({
        app: "ox_locations",
        model: "country",
        url: "ox/locations/country/",
        title: "name"
    })

    static fields() {
        return {
            id: this.attr(null),
            name: this.string(),
            flag: this.string(),
            code: this.string(),
            code_3: this.string(),
            phone: this.number(),
            currency_code: this.string(),
            currency: this.string(),

            iban_sample: this.string(),
            iban_length: this.string(),

            $currency: this.belongsTo(Currency, 'currency')
        }
    }
}
