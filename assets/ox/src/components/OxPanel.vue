<template>
    <ox-state-alert v-if="props.state" :state="props.state" delay/>
    <v-tabs-window-item :value="props.name"
            @group:selected="panel.reset(props, props.name)">
        <ox-panel-sheet :name="props.name" :title="props.title" :icon="props.icon">
            <template #append-title>
                <slot name="append-title"></slot>
            </template>

            <template #default>
                <slot name="views.before"></slot>

                <v-window v-model="panel.view">
                    <template v-for="(name, slot) in viewsSlots" :key="name">
                        <v-window-item :value="name">
                            <slot :name="slot"></slot>
                        </v-window-item>
                    </template>
                </v-window>

                <slot name="views.after"></slot>
            </template>
        </ox-panel-sheet>
    </v-tabs-window-item>
</template>
<script setup lang="ts">
import { computed, defineProps, defineExpose, inject, toRefs, useSlots } from 'vue'
import type {IPanelProps} from '../composables/panel'

import OxPanelSheet from './OxPanelSheet.vue'
import OxStateAlert from './OxStateAlert.vue'

import {filterSlots} from 'ox'

const slots = useSlots()
const viewsSlots = filterSlots(slots, 'views.', {
    exclude: ['views.before', 'views.after']
})
const props = defineProps<IPanelProps>()

const context = inject('context')
const panel = inject('panel')
</script>
