<template>
    <ox-state-alert v-if="modelEditor?.editor" :state="modelEditor.editor.state"/>
    <v-container class="ox-model-edit">
        <ox-model-editor ref="modelEditor" v-bind="props">
            <template #prepend="bind">
                <div class="mb-3" v-if="!props.hideValidationBtn">
                    <slot name="prepend" v-bind="bind" :save="save" :reset="reset">
                        <ox-validation-btn v-if="bind.editable && bind.edited"
                            @validate="save()" @reset="reset()" :state="bind.editor.state" :validate-disabled="bind.editor.valid === false"
                            />
                    </slot>
                </div>
            </template>

            <template #default="bind">
                <slot name="default" v-bind="bind" :save="save" :reset="reset"/>
            </template>

            <template #append="bind">
                <slot name="append" v-bind="bind" :save="save" :reset="reset"/>
            </template>
        </ox-model-editor>
    </v-container>
</template>
<script setup lang="ts">
/**
 * This component is a wrapper around {@link OxModelEditor}, providing a more
 * complete interface to handle object edition.
 *
 * It is used as standard edition component in edit views, and provides buttons
 * for validation ({@link OxValidationBtn}) and an alert.
 *
 */
import { defineExpose, defineEmits, watch, ref, onMounted } from 'vue'
import type { State } from 'ox'
import { t, useModelEditor } from 'ox'

import OxStateAlert from './OxStateAlert.vue'
import OxValidationBtn from './OxValidationBtn.vue'
import OxModelEditor from './OxModelEditor'

import type {IModelEditorProps} from '../controllers/modelEditor'

interface IModelEdit extends IModelEditorProps {
    /**
     * Send data using `multipart/form-data` and form's `FormData`.
     * The values will not be serialized into JSON before sending.
     **/
    sendFormData: boolean
    /** If true, hide validation buttons */
    hideValidationBtn: boolean
}

const emits = defineEmits('saved')
const props = defineProps<IModelEdit>()
const modelEditor = ref(null)

/**
 * Reset editor to initial values (provided by component's props).
 */
function reset() {
    modelEditor.value.editor.reset(props.initial)
}

/**
 * Save changes to the server, returning editor state once completed.
 */
async function save(): State {
    const me = modelEditor.value
    const resp = (props.sendFormData) ?
        await me.editor.save(new FormData(me.form.$el)) :
        await me.editor.save()
    emits('saved', modelEditor.value.editor)
    return resp
}

defineExpose({modelEditor, save, reset})
</script>
