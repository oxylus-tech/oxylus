<template>
    <v-sheet class="ma-4">
        <Teleport to="#app-bar-right" v-if="mounted && panel.name == props.name">
            <slot name="append-title"/>
            <v-btn v-if="props.help" class="ml-3"
                :href="props.help" target="new"
                icon="mdi-information-outline" />
        </Teleport>

        <slot name="default"/>
    </v-sheet>
</template>
<script setup>
import { defineProps, inject, onMounted, ref, watch } from 'vue'
const props = defineProps({
    name: String,
    title: String,
    icon: String,
    help: String,
})

// ensure teleport will be set after component has been mounted
const mounted = ref(false)
onMounted(() => { mounted.value = true })

const panel = inject('panel')

watch(() => props?.title, (val) => {
    if(panel.name == props.name)
        panel.title = val
})

watch(() => props?.icon, (val) => {
    if(panel.name == props.name)
        panel.icon = val
})
</script>
