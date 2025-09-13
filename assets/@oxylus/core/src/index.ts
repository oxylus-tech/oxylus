import {init, createPinia} from '@oxylus/core'
import {App} from '@oxylus/core/components'


const pinia = createPinia()
init({App, plugins: [pinia] })
