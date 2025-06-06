<template>
    <ox-state-alert v-if="props.state" :state="props.state" delay/>

    <template v-if="slots.prepend && panels.panel == panel.name">
        <slot name="prepend"/>
    </template>

    <v-sheet class="ma-4">
        <Teleport to="#app-bar-sheet-title" :disabled="!mounted || panels.panel != props.name">
            <v-icon v-if="props.icon" :icon="props.icon"/>
            {{ props.title }}
            <slot name="append-title"/>
        </Teleport>

        <Teleport to="#app-bar-right" :disabled="!mounted || panels.panel != props.name">
            <slot name="app-bar-right"/>
            <v-btn v-if="props.help" class="ml-3"
                :href="props.help" panels="new"
                icon="mdi-information-outline" />
        </Teleport>

        <slot name="top"/>

        <slot name="default">
            <template v-if="views">
                <v-window v-model="panel.view">
                    <template v-for="(name, slot) in views" :key="name">
                        <v-window-item :value="name">
                            <slot :name="slot"></slot>
                        </v-window-item>
                    </template>
                </v-window>
            </template>
        </slot>

        <slot name="bottom"></slot>
    </v-sheet>

    <template v-if="slots.append && panels.panel == panel.name">
        <slot name="append"/>
    </template>
</template>
<script setup lang="ts">
/**
 * Base component for displaying a panel.
 *
 *
 * Slots:
 * - side: if provided create a navigation drawer in which slot is put.
 * - top: at the top of all views
 * - bottom: at the bottom of all views
 * - views.[name]: a slot for each view
 */


import { defineProps, inject, onMounted, onUnmounted, ref, useSlots, watch } from 'vue'
import {filterSlots} from 'ox'

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
