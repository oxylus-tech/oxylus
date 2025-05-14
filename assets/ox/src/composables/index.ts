import { defineAsyncComponent as $defineAsyncComponent } from 'vue'

export * from './app'
export * from './actions'
export * from './init'
export * from './i18n'
export * from './models'
export * from './controllers'
export * from './rules'


/**
 * Similar to `defineAsyncComponent` allowing to load a component
 * by name from a provided module url.
 */
export function defineAsyncComponent(url: string, name: string) {
    return $defineAsyncComponent(() => {
        return import(url).then(mod => {
            if(!name)
                return mod
            console.log(mod, mod.components, Object.keys(mod))
            const obj = Object.values(mod).filter((y: {[k: string]: any}) => y.__name == name)[0]
            return obj
        })
    })
}


/**
 * This exception is used in order to display the message to user
 * when it is raised.
 */
class UserError extends Error {}
