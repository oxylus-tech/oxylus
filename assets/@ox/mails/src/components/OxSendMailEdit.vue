<template>
    <ox-model-edit ref="modelEditor" v-bind="attrs" :repo="repos.sendMails">
        <template #default="{editor, editable}">
            <v-row>
                <v-col>
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
                </v-col>
                <v-col>
                    <ox-field :editor="editor" name="template">
                        <template #default="{props: props_}">
                            <ox-autocomplete ref="templateField" v-bind="props_"
                                :filters="{owner__uuid: props.owner, is_template: true}"
                                :repo="repos.sendMails"
                                item-title="subject" item-value="id"
                                v-model="editor.value.template"
                                />
                        </template>
                    </ox-field>
                </v-col>
                <v-col cols="3">
                    <ox-field :editor="editor" name="is_template" type="checkbox"/>
                </v-col>
            </v-row>
            <v-card v-if="!editor.value.is_template" :subtitle="t('labels.recipients')"
                    class="mb-3">
                <template #text>
                    <ox-field :editor="editor" name="contacts">
                        <template #default="{props: props_}">
                            <ox-contact-input v-bind="props_" multiple
                                v-model="editor.value.contacts" />
                        </template>
                    </ox-field>
                    <ox-field :editor="editor" name="contact_lists" type="autocomplete"
                        :repo="repos.contactLists"
                        item-title="name" item-value="id"
                        multiple />
                </template>
            </v-card>
            <ox-field :editor="editor" name="subject"/>

            <ox-field :editor="editor" name="content" type="custom">
                <template #default="{props}">
                    <ox-component src="../ox_content/OxRichEditor.js" v-bind="props"
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
import { t, rules } from "ox"
import {OxModelEdit, OxField, OxAutocomplete, OxComponent} from 'ox/components'
import {OxContactInput} from '@ox/contacts/components'

import {useMailModels} from '../composables'
import OxFileList from './OxFileList'

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
