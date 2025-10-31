<script>
import { h, computed, shallowRef, watch } from 'vue'
import { defineAsyncComponent } from '@oxylus/ox'

/**
 * A component fetched from remote server.
 *
 * The component to fetch shall be compiled as a separate javascript module.
 * It kinda similar to Vue's `defineAsyncComponent`, but using an url string to
 * the module file instead. It will also try to fetch css based on the file name.
 *
 * All attributes will be forwarded to loaded component.
 *
 * Example usage:
 *
 * ```xml
 * <!-- Url can be relative to the generated module file. -->
 * <ox-component src="../content/OxRichEditor.js" v-bind="props"
 *     height="150px"
 *     v-model="editor.value.mail_subscription_footer"/>
 * ```
 */
export default {
    props: {
        /** Component url. */
        src: String,
        /** Component name. If not provided, use file name. */
        is: String,
    },

    setup(props) {
        const component = shallowRef(null)

        const is = computed(() => {
            if(props.is)
                return props.is

            let name = props.src.substring(props.src.lastIndexOf('/')+1)
            if(name)
                name = name.substring(0, name.indexOf('.'))
            if(!name)
                throw Error(
                    "`is` not provided and could not be deducted from `src`."
                )
            return name
        })

        function reset() {
            component.value = defineAsyncComponent(props.src, is.value)
        }

        watch(() => props.src, reset)

        reset()
        return () => h(component.value, props)
    },
}
</script>
