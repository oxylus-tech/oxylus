import {init, createPinia} from 'ox/composables'
import App from './app'

const pinia = createPinia()
init({App, plugins: [pinia] })
