<template>
    <template v-if="value">
        <template v-if="tabs && Object.keys(tabs).length">
            <v-tabs v-model="tab">
                <slot name="tab.default" v-bind="bind">
                    <v-tab :text="t(`models.${model.entity}`)" value="model"/>
                </slot>
                <template v-for="(_, name) in tabs">
                    <slot :name="name" v-bind="bind"></slot>
                </template>
            </v-tabs>
            <v-tabs-window v-model="tab">
                <v-tabs-window-item value="model">
                    <slot name="window.default" v-bind="bind"></slot>
                </v-tabs-window-item>
                <template v-for="(value, name) in windows">
                    <v-tabs-window-item :value="value">
                        <slot :name="name" v-bind="bind"></slot>
                    </v-tabs-window-item>
                </template>
            </v-tabs-window>
        </template>
        <template v-else>
            <slot name="window.default" v-bind="bind"></slot>
        </template>
    </template>
    <template v-else>
        Nothing to edit
    </template>
</template>
<script setup>
import { computed, ref, defineProps, defineModel, inject, useSlots, watch } from 'vue'
import { useI18n } from 'ox'

import OxActions from './OxActions.vue'
import OxPanelSheet from './OxPanelSheet.vue'

import {filterSlots} from '../utils/vue'

const { t } = useI18n()
const context = inject('context')

const props = defineProps({
    subtitle: String,
})


// ---- Editors
const value = defineModel('value', {
    type: Object,
    default: () => null
})
const model = computed(() => value.value?.constructor)


// ---- Panel
const panel = inject('panel')
function updatePanel(val) {
    if(panel.value && val)
        panel.value.title = `Edit ${val.$title}`
}
updatePanel(value.value)
watch(value, updatePanel)


// ---- Slots & tabs
const tab = ref(null)
const slots = useSlots()

const tabs = filterSlots(slots, "tab.", {exclude: "tab.default"})
const windows = filterSlots(slots, "window.", {exclude: "window.default"})


const bind = computed(() => {
    return {
        panel,
        value: value.value,
        model: model.value,
    }
})
</script>
