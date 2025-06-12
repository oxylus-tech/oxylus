import * as ox from './ox';
import { components as vendor } from 'ox/vendor';
export * from './ox';
/**
 * This is the base app config used for Oxylus' Vue based applicationns.
 *
 * It includes Oxylus components and some Vuetify's ones.
 *
 *
 * @example
 * // Example app.ts for another application.
 *
 * import {App} from 'ox/components'
 * import * as components from './components'
 *
 * export default {
 *     extends: App,
 *     components,
 * }
 */
export const App = {
    el: "#app",
    delimiters: ['[[', ']]'],
    components: { ...ox, ...vendor },
};
