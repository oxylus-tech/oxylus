<template>
    <ox-model-edit ref="modelEditor" v-bind="attrs" :repo="attrs.repo || repos.mails">
        <template #default="{editor, editable}">
            <ox-field :editor="editor" name="account" required>
                <template #default="{props: props_}">
                    <ox-autocomplete v-bind="props_"
                        :filters="{owner__uuid: props.owner}"
                        :repo="repos.mailAccounts"
                        item-title="name" item-value="id"
                        v-model="editor.value.account"
                        />
                </template>
            </ox-field>
            <!--
                @slot Place the field for recipients list here.
                @binding {ModelEditor} editor the model editor
            -->
            <slot name="recipients" :editor="editor">
                <ox-field :editor="editor" name="recipients" />
            </slot>
            <ox-field :editor="editor" name="subject"/>

            <ox-field :editor="editor" name="content" type="custom">
                <template #default="{props}">
                    <ox-component src="../content/OxRichEditor.js" v-bind="props"
                        :placeholders="props.placeholders"
                        v-model="editor.value.content"/>
                </template>
            </ox-field>

            <v-expansion-panels multiple class="mt-3">
                <v-expansion-panel :title="t('fields.attachments', 2) + ` (${editor.value.attachments?.length || 0})`">
                    <template #text>
                        <ox-file-list :owner="props.owner" v-model="editor.value.attachments"/>
                    </template>
                </v-expansion-panel>
            </v-expansion-panels>

        </template>
    </ox-model-edit>
</template>
<script setup lang="ts">
import { computed, reactive, ref, useAttrs, watch } from 'vue'
import { t, rules } from "@oxylus/ox"
import {OxModelEdit, OxField, OxAutocomplete, OxComponent} from '@oxylus/ox/components'

import {useMailModels} from '../composables'
import OxFileList from './OxFileList.vue'

const repos = useMailModels()
const attrs = useAttrs()
const props = defineProps({
    /** Owner uuid **/
    owner: String,

    placeholders: {type: Array, default: () => []}
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
