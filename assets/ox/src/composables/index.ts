import { defineAsyncComponent as $defineAsyncComponent } from 'vue'

export * from './app'
export * from './actions'
export * from './init'
export * from './i18n'
export * from './models'
export * from './controllers'
export {default as rules} from './rules'


/**
 * Similar to `defineAsyncComponent` but using url string to module
 * file.
 *
 * It will try to fetch related css file (based on module file).
 */
export function defineAsyncComponent(url: string, name: string) {
    return $defineAsyncComponent(() => {
        return import(url).then(mod => {
            // try to fetch css
            if(url.endsWith('.js'))
                loadCss(import.meta.resolve(url.replace(/\.js$/, '.css')))
            if(!name)
                return mod

            const obj = Object.values(mod).filter((y: {[k: string]: any}) => y.__name == name)[0]
            return obj
        })
    })
}

/** Load CSS. */
function loadCss(href): Promise {
    return new Promise((resolve, reject) => {
        if (document.querySelector(`link[href="${href}"]`)) {
            resolve()
            return
        }

        const link = document.createElement('link')
        link.rel = 'stylesheet'
        link.href = href
        link.onload = () => resolve()
        link.onerror = (err) => reject(err)

        document.head.appendChild(link)
    })
}


/**
 * This exception is used in order to display the message to user
 * when it is raised.
 */
class UserError extends Error {}
