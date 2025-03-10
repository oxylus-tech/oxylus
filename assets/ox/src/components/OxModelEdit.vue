<template>
    <ox-state-alert :state="editor.state"/>
    <div class="mb-3">
        <ox-validation-btn v-if="edited"
            @validate="editor.save()" @reset="editor.discard()" :state="editor.state" :validate-disabled="!editor.valid"/>
    </div>
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
<script setup lang="ts">
import { computed, ref, defineProps, inject, toRefs, useSlots, watch } from 'vue'
import { t, tKeys, filterSlots, useModelEditor } from 'ox'

import OxStateAlert from './OxStateAlert.vue'
import OxValidationBtn from './OxValidationBtn.vue'

import type {IModelEditorProps} from '../controllers/modelEditor'

const props = defineProps<IModelEditorProps>()
const editor = useModelEditor({props})
const model = computed(() => editor.repo.use)
const {value, edited} = toRefs(editor)

// ---- Slots & tabs
const tab = ref(null)
const slots = useSlots()

const tabs = filterSlots(slots, "tab.", {exclude: "tab.default"})
const windows = filterSlots(slots, "window.", {exclude: "window.default"})

const bind = computed(() => {
    return {
        value: value.value,
        model: model.value,
    }
})
</script>
