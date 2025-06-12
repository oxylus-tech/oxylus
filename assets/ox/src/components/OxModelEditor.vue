<template>
    <!-- @slot Before v-form. -->
    <slot name="prepend" v-bind="bind"/>
    <v-form ref="form" v-model="editor.valid" :disabled="!editable">
        <template #default>
            <!-- @slot Inside v-form. -->
            <slot name="default" v-bind="bind"/>
        </template>
    </v-form>
    <!-- @slot After v-form. -->
    <slot name="append" v-bind="bind"/>
</template>
<script setup lang="ts">
/**
 * This component provides a wrapper around a `v-form` that uses
 * {@link ModelEditor} in order to edit and save data to the server.
 *
 * It requires a `repo` to be provided.
 * Properties are defined using {@link IModelEditorProps} interface.
 *
 * Exposed:
 * - `editor`: the {@link ModelEditor} instance
 * - `editable`: a boolean computed value defining if user can edit the component.
 */
import { computed, defineExpose, inject, watch, ref } from 'vue'
import { t, useModelEditor } from 'ox'

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

defineExpose({editor, edited, form, editable})
</script>
