<template>
    <ox-state-alert v-if="props.state" :state="props.state" delay/>
    <template v-if="props.tabbed">
        <v-tabs-window-item :value="props.name">
            <slot name="sheet" :context="context" :panel="panel">
                <ox-panel-sheet :name="props.name" :title="props.title" :icon="props.icon">
                    <template v-for="(_, name) in slots" v-slot:[name] :key="name">
                        <slot :name="name" :context="context" :panel="panel"></slot>
                    </template>
                </ox-panel-sheet>
            </slot>
        </v-tabs-window-item>
    </template>
    <template v-else>
        <slot name="sheet" :context="context" :panel="panel">
            <ox-panel-sheet :name="props.name" :title="props.title" :icon="props.icon">
                <template v-for="(_, name) in slots" v-slot:[name] :key="name">
                    <slot :name="name" :context="context" :panel="panel"></slot>
                </template>
            </ox-panel-sheet>
        </slot>
    </template>
</template>
<script setup>
import { computed, defineProps, defineExpose, inject, toRefs, useSlots } from 'vue'

import {panelProps} from '../composables'
import OxPanelSheet from './OxPanelSheet.vue'
import OxStateAlert from './OxStateAlert.vue'

const slots = useSlots()
const props = defineProps({
    ...panelProps,
    state: {type: Object, default: null},
})

const context = inject('context')
const panel = inject('panel')
</script>
