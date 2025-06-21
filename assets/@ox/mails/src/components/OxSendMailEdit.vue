<template>
    <ox-model-edit ref="modelEditor" v-bind="attrs" :repo="repos.sendMails">
        <template #default="{editor, editable}">
            <ox-field :editor="editor" name="template" required>
                <template #default="{props: props_}">
                    <ox-autocomplete ref="templateField" v-bind="props_"
                        :filters="{owner__uuid: props.owner}"
                        :repo="repos.mailTemplates"
                        item-title="name" item-value="id"
                        v-model="editor.value.template"
                        />
                </template>
            </ox-field>
            <ox-field :editor="editor" name="contacts" required>
                <template #default="{props: props_}">
                    <ox-person-input v-bind="props_" multiple
                        v-model="editor.value.contacts" />
                </template>
            </ox-field>
            <ox-field :editor="editor" name="subject"/>
            <ox-rich-editor v-model="editor.value.content"/>

            <v-btn @click="files.show = true">files</v-btn>

            <v-dialog v-model="files.show" height="80%" scrollable>
                <ox-file-select :owner="props.owner" />
            </v-dialog>
        </template>
    </ox-model-edit>
</template>
<script setup lang="ts">
import { useAttrs, computed, reactive, ref, watch } from 'vue'
import { t, rules } from "ox"
import {OxModelEdit, OxField, OxAutocomplete, OxComponent} from 'ox/components'
import {OxPersonInput} from '@ox/contacts/components'
import {OxRichEditor} from '@ox/content/components'
import {OxFileSelect} from '@ox/files/components'

import {useMailModels} from '../composables'

const repos = useMailModels()
const attrs = useAttrs()
const props = defineProps({
    /** Owner uuid **/
    owner: String
})

const templateField = ref(null)
const modelEditor = ref(null)

const files = reactive({
    selected: [],
    show: false,
})

watch(() => templateField.value?.selected, (selected) => {
    if(!selected || !selected.length)
        return

    selected = selected[0]
    const editor = modelEditor.value.editor
    editor.value.subject = editor.value.subject || selected.subject
    editor.value.content = editor.value.content || selected.content
})

</script>
