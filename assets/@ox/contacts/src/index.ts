import {init, createPinia} from 'ox'
import App from './app'

const pinia = createPinia()
init({App, plugins: [pinia] })
