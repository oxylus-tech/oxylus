import { models } from "ox"
import type { IModel } from "ox"


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
            phone: this.number()
        }
    }
}
