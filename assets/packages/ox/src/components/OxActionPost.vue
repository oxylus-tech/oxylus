<template>
    <ox-action v-bind="attrs" :run="run"/>
</template>
<script setup lang="ts">
/**
 * @component An action button used to make a POST request for the related
 * model item.
 *
 * Required injections: `user`.
 *
 * Attributes bound to inner {@link OxAction}.
 */
/**
 * This action is used to make POST request for a specified model item.
 */
import { useAttrs } from "vue"
import OxAction from "./OxAction"

const attrs = useAttrs()
const props = defineProps({
    /**
     * URL path to append to item's url. Should be provided.
     */
    path: String,
    /**
     * HTTP method to use (upper or lower cased)
     */
    method: {type: String, default: 'post'},
    /** Model repository to use */
    repo: Object,
    /** POST data to send (optional) */
    data: Object,
    /** Pinia-Orm AXIOS options */
    options: Object,
})

async function run(user, item) {
    // For some reason directly call api()[props.method] does not pass down
    // this argument.
    const api = props.repo.api()
    return await api[props.method.toLowerCase()].apply(api, [item.$url(props.path), props.data, props.options])
}
</script>
