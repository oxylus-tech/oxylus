import {init, createPinia} from '@oxylus/core'
import App from './app'

const pinia = createPinia()
init({App, plugins: [pinia] })
