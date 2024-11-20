<script>
import { h, computed, shallowRef, watch } from 'vue'
import { defineAsyncComponent } from '../composables'

export default {
    props: {
        src: String,
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
