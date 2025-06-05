<template>
    <ox-state-alert :state="editor.state"/>
    <v-container class="ox-model-edit">
        <div class="mb-3" v-if="!props.hideValidationBtn">
            <slot name="prepend" v-bind="bind">
                <ox-validation-btn v-if="editable && edited"
                    @validate="save()" @reset="reset()" :state="editor.state" :validate-disabled="editor.valid === false"
                    />
            </slot>
        </div>
        <v-form ref="form" v-model="editor.valid" :disabled="!editable">
            <template #default>
                <slot name="default" v-bind="bind"/>
            </template>
        </v-form>
        <slot name="append" v-bind="bind"/>
    </v-container>
</template>
<script setup lang="ts">
import { computed, defineExpose, inject, toRefs, watch, ref } from 'vue'
import { t, useModelEditor } from 'ox'

import OxStateAlert from './OxStateAlert.vue'
import OxValidationBtn from './OxValidationBtn.vue'

import type {IModelEditorProps} from '../controllers/modelEditor'

const form = ref(null)
const context = inject('context')

interface IModelEdit extends IModelEditorProps {
    /**
     * Send data using `multipart/form-data` and form's `FormData`.
     * The values will not be serialized into JSON before sending.
     **/
    sendFormData: Boolean
    /**
     * If true, hide validation button
     */
    hideValidationBtn: Boolean
}

const props = defineProps<IModelEdit>()
const {editor, edited} = useModelEditor({props})

const editable = computed(() => context.user.can([editor.repo.use, 'change']))

const bind = computed(() => ({
    editor, edited,
    save, reset,
    form: form.value,
    editable: editable.value,
    disabled: !editable.value,
    value: editor.value,
    model: editor.repo.use
}))


watch(() => editor.errors && Object.values(editor.errors), () => form.value.validate())


function reset() {
    editor.reset()
}

function save() {
    if(props.sendFormData)
        return editor.save(new FormData(form.value.$el))
    else
        return editor.save()
}

defineExpose({editor, edited, save, reset})
</script>
