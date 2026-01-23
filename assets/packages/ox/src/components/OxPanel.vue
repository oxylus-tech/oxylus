<template>
    <ox-state-alert v-if="props.state" :state="props.state" delay/>

    <!-- @slot At the top of the panel, between the OxStateAlert and the sheet. -->
    <slot name="prepend" v-if="slots.prepend && active"/>

    <v-sheet class="ma-4">
        <Teleport to="#app-bar-actions" v-if="mounted" :disabled="!mounted || !active">
            <!-- @slot At the right of the app bar, before all other buttons. -->
            <slot name="app-actions"/>
        </Teleport>

        <!-- @slot At the top of the panel, inside the sheet -->
        <slot name="top"/>

        <v-window v-model="router.location.view">
            <slot name="default"/>
        </v-window>

        <!-- @slot At the bottom of the panel, inside the sheet. -->
        <slot name="bottom"></slot>
    </v-sheet>

    <!-- @slot At the end of the panel, after the sheet. -->
    <slot name="append"/>
</template>
<script setup lang="ts">
/**
 * @component Base component for displaying a panel.
 *
 * Required injections: `panels`, `panel`.
 */
import { computed, onMounted, onUnmounted, ref, useSlots, watch } from 'vue'
import { usePanel, viewCategories, type PanelDefinition } from '../composables/router'

import {filterSlots} from '@oxylus/ox'

import OxStateAlert from './OxStateAlert.vue'

const props = defineProps<PanelDefinition>()
const {router, panel, views, active} = usePanel(props)

const byCategories = computed(() => {
    const cats = {}
    for(var view of views.values()) {
        cats[view.category] ??= []
        cats[view.category].push(view)
    }
    return viewCategories.filter(k => cats[k])
                         .map((k) => [k, cats[k]])
})

const slots = useSlots()

// ensure teleport will be set after component has been mounted
const mounted = ref(false)
onMounted(() => { mounted.value = true })
onUnmounted(() => { mounted.value = false })
</script>
