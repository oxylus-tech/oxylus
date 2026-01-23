<template>
    <ox-state-alert v-if="modelEditor?.editor" :state="modelEditor.editor.state"/>
    <v-container class="ox-model-edit">
        <ox-model-editor ref="modelEditor" v-bind="modelEditorProps">
            <template #prepend="bind">
                <div v-if="!props.hideValidationBtn">
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
 * @component A wrapper around {@link OxModelEditor}, providing a more
 * complete interface to handle object edition.
 *
 * It is used as standard edition component in edit views, and provides buttons
 * for validation ({@link OxValidationBtn}) and an alert.
 *
 * Slots are the same as the inner OxModelEditor, with two extra values: `save` and
 * `reset` which are used to save and reset current edited item.
 */
import { computed, defineExpose, defineEmits, watch, ref, onMounted } from 'vue'
import type { State } from '@oxylus/ox'
import { t, useModelEditor, useGuard } from '@oxylus/ox'

import OxStateAlert from './OxStateAlert.vue'
import OxValidationBtn from './OxValidationBtn.vue'
import OxModelEditor from './OxModelEditor.vue'

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

const emits = defineEmits([
    /** Item was saved `(editor: ModelEditor): void`. */
    'saved'
])
const props = defineProps<IModelEdit>()
const modelEditor = ref(null)
const modelEditorProps = computed(() => {
    const {sendFormData, hideValidationBtn, ...vals} = props
    return vals
})

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


useGuard(() => {
    if(modelEditor.value?.edited)
        if(!confirm("Continue without saving?"))
            return false
    return true
})


// TODO
// watch(() => modelEditor.edited, (val) => panel.setEdition(""))

defineExpose({
    /** Save edited item. */
    save,
    /** Reset edited item to initial value */
    reset,

    /** {@link ModelEditor} controller */
    get editor() { return modelEditor.value.editor },
    /** Item is edited */
    get edited() { return modelEditor.value.edited },
    /** Edition is allowed */
    get editable() { return modelEditor.value.editable },
    /** Inner OxModelEditor's form */
    get form() { return modelEditor.value.form },
})
</script>
