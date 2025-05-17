import { useModels, query } from 'ox'
import { Country, Currency } from './models'


/** Use @ox/locations models. */
export function useLocationModels() {
    const repos = useModels([Country, Currency], {withDefaults: false})
    query(repos.countries).allOnce()
    query(repos.currencies).allOnce()
    return repos
}


/** Return repository of Country and load data if not there yet */
export function useCountries() {
    const { countries } = useModels([Country], {withDefaults: false})
    query(countries).allOnce()
    return {countries}
}


/** Return repository of Country and load data if not there yet */
export function useCurrencies() {
    const { currencies } = useModels([Currency], {withDefaults: false})
    query(currencies).allOnce()
    return {currencies}
}
