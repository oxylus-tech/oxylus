import { defineAsyncComponent as $defineAsyncComponent } from 'vue'

export * from './actions'
export * from './app'
export * from './edit'
export * from './init'
export * from './i18n'
export * from './list'
export * from './models'
export * from './panel'
export * as api from './api'


/**
 * Similar to `defineAsyncComponent` allowing to load a component
 * by name from a provided module url.
 */
export function defineAsyncComponent(url: string, name: string) {
    return $defineAsyncComponent(() => {
        return import(url).then(module => {
            if(!name)
                return module
            const obj = Object.values(module).filter(y => y.__name == name)[0]
            return obj
        })
    })
}
