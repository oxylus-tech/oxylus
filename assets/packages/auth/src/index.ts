import {init, createPinia} from '@oxylus/ox'
import {App} from '@oxylus/ox/components'

import * as components from './components'
import {authLocales} from './composables.ts'

const pinia = createPinia()
init({
    App: { extends: App, components },
    plugins: [pinia],
    locales: authLocales
})
