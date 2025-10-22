import { useModels, query } from '@oxylus/ox'
import { Country, Currency } from './models'


/** Use @oxylus/locations models. */
export function useLocationModels() {
    const repos = useModels([Country, Currency], {useDefaults: false})
    //query(repos.countries).allOnce()
    //query(repos.currencies).allOnce()
    return repos
}


/** Return repository of Country and load data if not there yet */
export function useCountries() {
    const { countries } = useModels([Country], {useDefaults: false})
    //query(countries).allOnce()
    return {countries}
}


/** Return repository of Country and load data if not there yet */
export function useCurrencies() {
    const { currencies } = useModels([Currency], {useDefaults: false})
    //query(currencies).allOnce()
    return {currencies}
}
