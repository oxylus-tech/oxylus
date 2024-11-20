import {init, createPinia} from 'ox'
import App from 'ox/app'

const pinia = createPinia()
init({App, plugins: [pinia] })
