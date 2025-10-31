<template>
    <ox-state-alert v-if="props.state" :state="props.state" delay/>

    <template v-if="slots.prepend && panels.panel == panel.name">
        <!-- @slot At the top of the panel, between the OxStateAlert and the sheet. -->
        <slot name="prepend"/>
    </template>

    <v-sheet class="ma-4">
        <Teleport to="#app-bar-sheet-title" :disabled="!mounted || panels.panel != props.name">
            <v-icon v-if="props.icon" :icon="props.icon"/>
            {{ props.title }}

            <!-- @slot After the panel title -->
            <slot name="append-title"/>
        </Teleport>

        <Teleport to="#app-bar-right" :disabled="!mounted || panels.panel != props.name">
            <!-- @slot At the right of the app bar, before all other buttons. -->
            <slot name="app-bar-right"/>
            <v-btn v-if="props.help" class="ml-3"
                :href="props.help" panels="new"
                icon="mdi-information-outline" />
        </Teleport>

        <!-- @slot At the top of the panel, inside the sheet -->
        <slot name="top"/>

        <slot name="default">
            <template v-if="views">
                <v-window v-model="panel.view">
                    <template v-for="(name, slot) in views" :key="name">
                        <v-window-item :value="name">
                            <!-- @slot Views are nested under a `v-window-item`. -->
                            <slot :name="slot"></slot>
                        </v-window-item>
                    </template>
                </v-window>
            </template>
        </slot>

        <!-- @slot At the bottom of the panel, inside the sheet. -->
        <slot name="bottom"></slot>
    </v-sheet>

    <template v-if="slots.append && panels.panel == panel.name">
        <!-- @slot At the end of the panel, after the sheet. -->
        <slot name="append"/>
    </template>
</template>
<script setup lang="ts">
/**
 * @component Base component for displaying a panel.
 *
 * Required injections: `panels`, `panel`.
 */


import { defineProps, inject, onMounted, onUnmounted, ref, useSlots, watch } from 'vue'
import {filterSlots} from '@oxylus/ox'

import OxStateAlert from './OxStateAlert.vue'
import type {IPanelProps} from '../controllers'

const slots = useSlots()
const props = defineProps<IPanelProps>()
const views = filterSlots(slots, 'views.')

// ensure teleport will be set after component has been mounted
const mounted = ref(false)
onMounted(() => { mounted.value = true })
onUnmounted(() => { mounted.value = false })

const panels = inject('panels')
const panel = inject('panel')
</script>
