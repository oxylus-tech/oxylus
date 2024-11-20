import * as components from './components'
import * as vuetify from './components/vuetify'

export const vuetifyComponents = vuetify

export default {
    el: "#app",
    delimiters: ['[[', ']]'],
    components: {...components, ...vuetify},
}
