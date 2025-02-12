<template>
    <v-sheet class="ma-4">
        <Teleport to="#app-bar-sheet-title" :disabled="!mounted || panel.name != props.name">
            <v-icon v-if="props.icon" :icon="props.icon"/>
            {{ props.title }}
        </Teleport>
        <Teleport to="#app-bar-right" :disabled="!mounted || panel.name != props.name">
            <slot name="append-title"/>
            <v-btn v-if="props.help" class="ml-3"
                :href="props.help" target="new"
                icon="mdi-information-outline" />
        </Teleport>

        <slot name="default"/>
    </v-sheet>
</template>
<script setup lang="ts">
import { defineProps, inject, onMounted, ref, watch } from 'vue'
import type {IPanelSheetProps} from '../composables/panel'
const props = defineProps<IPanelSheetProps>()

// ensure teleport will be set after component has been mounted
const mounted = ref(false)
onMounted(() => { mounted.value = true })

const panel = inject('panel')
</script>
