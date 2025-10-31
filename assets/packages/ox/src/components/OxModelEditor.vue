<template>
    <!-- @slot Before v-form. See `default` slot for bindings. -->
    <slot name="prepend" v-bind="bind"/>
    <v-form ref="form" v-model="editor.valid" :disabled="!editable">
        <template #default>
            <!-- @slot Inside v-form.
                 @binding {ModelEditor} editor the editor instance.
                 @binding {boolean} edited whether content has been edited
                 @binding {v-form} form the inner `v-form`
                 @binding {boolean} editable whether content is editable
                 @binding {boolean} disabled whether content is not editable
                 @binding {typeof Model} model current model type
            -->
            <slot name="default" v-bind="bind"/>
        </template>
    </v-form>
    <!-- @slot After v-form. See `default` slot for bindings. -->
    <slot name="append" v-bind="bind"/>
</template>
<script setup lang="ts">
/**
 * @component A wrapper around a `v-form` that uses * {@link ModelEditor} to
 * edit and save data on the server.
 *
 * It checks on user permissions in order to allow edition. If user has no right
 * for it, the form will be disabled.
 *
 * It requires a `repo` to be provided.
 * Properties are defined using {@link IModelEditorProps} interface.
 *
 * Required injections: `user`.
 */
import { computed, defineExpose, inject, watch, ref } from 'vue'
import { t, useModelEditor } from '@oxylus/ox'

import type {IModelEditorProps} from '../controllers/modelEditor'

const form = ref(null)
const user = inject('user')

const props = defineProps<IModelEditorProps>()
const {editor, edited} = useModelEditor({props})

const editable = computed(() => user.can([editor.repo.use, 'change', props.initial]))

const bind = computed(() => ({
    editor,
    edited: edited.value,
    form: form.value,
    editable: editable.value,
    disabled: !editable.value,
    value: editor.value,
    model: editor.repo.use
}))

watch(() => editor.errors && Object.values(editor.errors), () => form.value.validate())

defineExpose({
    /** The {@link ModelEditor} instance. */
    editor,
    /** A computed boolean indicating if content has been edited. */
    edited,
    /** A computed boolean indicating if content can be edited. */
    editable,
    /** Reference to inner `v-form`. */
    form
})
</script>
