import {ref} from 'vue'
import {State} from 'ox'

import * as components from 'ox/components'
// import * as vuetify from './components/vuetify'

// export const vuetifyComponents = vuetify

export default {
    el: "#app",
    delimiters: ['[[', ']]'],
    components: {...components},
}
