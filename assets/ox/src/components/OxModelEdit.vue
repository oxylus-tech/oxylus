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
import { defineExpose, watch, ref, onMounted } from 'vue'
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
    /**
     * If true, hide validation button
     */
    hideValidationBtn: boolean
}

const props = defineProps<IModelEdit>()
const modelEditor = ref(null)

function reset() {
    modelEditor.value.editor.reset(props.initial)
}

function save() {
    const me = modelEditor.value
    if(props.sendFormData)
        return me.editor.save(new FormData(me.form.value.$el))
    else
        return me.editor.save()
}

defineExpose({modelEditor, save, reset})
</script>
