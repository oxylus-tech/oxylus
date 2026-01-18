import {init, createPinia} from '@oxylus/ox'
import {App} from '@oxylus/ox/components'

import * as components from './components'
import {contentLocales} from './composables.ts'

const pinia = createPinia()
init({
    App: { extends: App, components },
    plugins: [pinia],
    locales: contentLocales
})
