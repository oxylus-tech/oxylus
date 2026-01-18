import {init, createPinia, locales} from '@oxylus/ox'
import {App} from '@oxylus/ox/components'

const pinia = createPinia()
init({App, plugins: [pinia], locales})
