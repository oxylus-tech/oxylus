import { useModels, query } from 'ox'
import { Country } from './models'


/** Return repository to Country and load data if not there yet */
export function useCountries() {
    const { countries } = useModels([Country], {withDefaults: false})
    query(countries).allOnce()
    return countries
}
