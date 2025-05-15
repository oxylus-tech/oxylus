<template>
    <ox-state-alert :state="editor.state"/>
    <div class="mb-3">
        <ox-validation-btn v-if="edited"
            @validate="editor.save()" @reset="editor.discard()" :state="editor.state" :validate-disabled="!editor.valid"/>
    </div>
    <v-container>
        <slot name="default" :editor="editor" :edited="edited" :value="value" :model="editor.repo.use" />
    </v-container>
</template>
<script setup lang="ts">
import { computed, ref, defineProps, defineExpose, inject, toRefs, useSlots, watch } from 'vue'
import { t, tKeys, filterSlots, useModelEditor } from 'ox'

import OxStateAlert from './OxStateAlert.vue'
import OxValidationBtn from './OxValidationBtn.vue'

import type {IModelEditorProps} from '../controllers/modelEditor'


const props = defineProps<IModelEditorProps>()
const {editor, edited} = useModelEditor({props})
const model = computed(() => editor.repo.use)
const {value} = toRefs(editor)

defineExpose({editor, edited, value})
</script>
