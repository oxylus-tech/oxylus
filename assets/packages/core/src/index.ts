import {init, createPinia, i18n} from '@oxylus/ox'
import {App} from '@oxylus/ox/components'

const pinia = createPinia()
init({App, plugins: [pinia], locales: i18n.locales})
