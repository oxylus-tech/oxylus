import {init, createPinia} from 'ox'
import App from 'ox/components'

const pinia = createPinia()
init({App, plugins: [pinia] })
