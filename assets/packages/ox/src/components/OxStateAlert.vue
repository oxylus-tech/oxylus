<template>
    <v-alert v-if="props.state.isNone && slots.none" type="info" variant="tonal" class="mb-3"
            :state="state" :title="noneTitle">
        <!-- @slot When state is `none`.
             @binding {State} state used state. -->
        <slot name="none" :state="state"></slot>
    </v-alert>
    <v-alert v-else-if="displayProcessing" type="info" variant="tonal" class="mb-3" closable
            :state="state" :title="processingTitle">
        <!-- @slot When state is `processing`. -->
        <slot name="processing" :state="state">
            Data are being sent to server, please be patient. If this message persist you might wan't to retry.
        </slot>
    </v-alert>
    <v-alert v-else-if="props.state.isError" type="error" variant="tonal" class="mb-3" closable
            :state="state" :title="errorTitle" >
        <!-- @slot When state is `error`. -->
        <slot name="error" :state="state">
            Oups... something wrong happened.
        </slot>
        <!-- @slot Detail when state is `error`. -->
        <slot name="error-detail" :state="state"></slot>
    </v-alert>
    <v-alert v-else-if="props.state.isOk" type="success" variant="tonal" class="mb-3" closable
            :state="state" :title="okTitle">
        <!-- @slot When state is `ok`. -->
        <slot name="ok" :state="state">
            <p>Congrats! Data have been updated.</p>
        </slot>
        <template v-if="messages">
            <v-divider/>
            <p v-for="message in messages">{{ message }}</p>
        </template>
        <!-- @slot Detail when state is `ok`. -->
        <slot name="ok-detail" :state="state"></slot>
    </v-alert>
    <!-- @slot After the alert. -->
    <slot :state="props.state"></slot>
</template>
<script setup>
/**
 * @component A component displaying alert based on provided {@link State} value,
 * wrapping `v-alert`.
 */
// TODO: expandable detail error
import {defineProps, useSlots, computed, ref, watch} from 'vue'
import {VAlert} from 'vuetify/components/VAlert'
import {States} from '../utils/state'

const slots = useSlots()
const props = defineProps({
    /** The state. */
    state: Object,
    /** Delay PROCESSING state display by 5 seconds. */
    delay: {type: Boolean, default: false},
    /** Alert title on state `ok`. */
    okTitle: {type: String, default: ""},
    /** Alert title on state `none`. */
    noneTitle: {type: String, default: ""},
    /** Alert title on state `error`. */
    errorTitle: {type: String, default: "Oups..."},
    /** Alert title on state `processing`. */
    processingTitle: {type: String, default: "Processing..."},
})


let timeoutId = null
let expired = ref(false)

watch(() => props.state.state, (val) => {
    if(timeoutId !== null)
        window.clearTimeout(timeoutId)

    if(!props.delay)
        return

    if(val == States.PROCESSING) {
        expired.value = false
        window.setTimeout(() => { expired.value = true }, 5000)
    }
})

const displayProcessing = computed(() => props.state?.isProcessing && (!props.delay || expired.value))
const messages = computed(() => props.state?.data?.messages)



</script>
