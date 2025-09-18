import {init, createPinia} from '@oxylus/ox'
import App from './app'

const pinia = createPinia()
init({App, plugins: [pinia] })
