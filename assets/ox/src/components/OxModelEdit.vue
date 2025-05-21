<template>
    <ox-state-alert :state="editor.state"/>
    <div class="mb-3">
        <ox-validation-btn v-if="editable && edited"
            @validate="editor.save()" @reset="editor.discard()" :state="editor.state" :validate-disabled="!editor.valid"/>
    </div>
    <v-container class="ox-model-edit">
        <v-form v-model="editor.valid" :disabled="!editable">
            <slot name="default" v-bind="bind"/>
        </v-form>
        <slot name="append" v-bind="bind"/>
    </v-container>
</template>
<script setup lang="ts">
import { computed, defineExpose, inject, toRefs, watch } from 'vue'
import { t, useModelEditor } from 'ox'

import OxStateAlert from './OxStateAlert.vue'
import OxValidationBtn from './OxValidationBtn.vue'

import type {IModelEditorProps} from '../controllers/modelEditor'

const context = inject('context')

const props = defineProps<IModelEditorProps>()
const {editor, edited} = useModelEditor({props})

const editable = computed(() => context.user.can([editor.repo.use, 'change']))

const bind = computed(() => ({
    editor, edited,
    editable: editable.value,
    value: editor.value,
    model: editor.repo.use
}))

defineExpose({editor, edited})
</script>
