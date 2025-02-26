<template>
    <v-tabs-window-item :value="props.name" @group:selected="panels.reset({panel: props.name})">
        <ox-state-alert v-if="props.state" :state="props.state" delay/>
        <v-sheet class="ma-4">
            <Teleport to="#app-bar-sheet-title" :disabled="!mounted || panels.panel != props.name">
                <v-icon v-if="props.icon" :icon="props.icon"/>
                {{ props.title }}
            </Teleport>

            <Teleport to="#app-bar-right" :disabled="!mounted || panels.panel != props.name">
                <slot name="append-title"/>
                <v-btn v-if="props.help" class="ml-3"
                    :href="props.help" target="new"
                    icon="mdi-information-outline" />
            </Teleport>

            <slot name="top"></slot>

            <slot name="default">
                <template v-if="views">
                    <v-window v-model="panels.view">
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
    </v-tabs-window-item>
</template>
<script setup lang="ts">
import { defineProps, inject, onMounted, ref, useSlots, watch } from 'vue'
import {filterSlots} from 'ox'

import type {IPanelProps} from '../layout'

const slots = useSlots()
const props = defineProps<IPanelProps>()
const views = filterSlots(slots, 'views.')
console.log(views)

// ensure teleport will be set after component has been mounted
const mounted = ref(false)
onMounted(() => { mounted.value = true })

const panels = inject('panels')
</script>
