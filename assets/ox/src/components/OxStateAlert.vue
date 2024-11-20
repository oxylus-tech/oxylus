<template>
    <v-alert v-if="props.state.isNone && slots.none" type="info" variant="outline" class="mb-3"
            :state="state" :title="noneTitle">
        <slot name="none" :state="state"></slot>
    </v-alert>
    <v-alert v-else-if="displayProcessing" type="info" variant="tonal" class="mb-3" closable
            :state="state" :title="processingTitle">
        <slot name="processing" :state="state">
            Data are being sent to server, please be patient. If this message persist you might wan't to retry.
        </slot>
    </v-alert>
    <v-alert v-else-if="props.state.isError" type="error" variant="tonal" class="mb-3" closable
            :state="state" :title="errorTitle" >
        <slot name="error" :state="state">
            Oups... something wrong happened.
        </slot>
        <slot name="error-detail" :state="state">
        </slot>
    </v-alert>
    <v-alert v-else-if="props.state.isOk" type="success" variant="tonal" class="mb-3" closable
            :state="state" :title="okTitle">
        <slot name="ok" :state="state">
            <p>Congrats! Data have been updated.</p>
        </slot>
        <template v-if="messages">
            <v-divider/>
            <p v-for="message in messages">{{ message }}</p>
        </template>
        <slot name="ok-detail" :state="state"></slot>
    </v-alert>
    <slot :state="props.state"></slot>
</template>
<script setup>
// TODO: expandable detail error
import {defineProps, useSlots, computed, ref, watch} from 'vue'
import {VAlert} from 'vuetify/components/VAlert'
import {States} from '../utils/state'

const slots = useSlots()
const props = defineProps({
    state: Object,
    delay: {type: Boolean, default: false},
    okTitle: {type: String, default: ""},
    noneTitle: {type: String, default: ""},
    errorTitle: {type: String, default: "Oups..."},
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
