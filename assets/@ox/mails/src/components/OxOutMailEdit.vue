<template>
    <ox-model-edit ref="model-editor" v-bind="attrs" :repo="repos.outMails">
        <template #default="{editor, editable}">
            <ox-field :editor="editor" name="template" required>
                <template #default="{props: props_}">
                    <ox-autocomplete v-bind="props_"
                        :filters="{owner__uuid: props.owner}"
                        :repo="repos.mailTemplates"
                        item-title="name" item-value="id"
                        v-model="editor.value.template"
                        />
                </template>
            </ox-field>
            <ox-field :editor="editor" name="contacts" required>
                <template #default="{props: props_}">
                    <ox-person-input v-bind="props_" multiple/>
                </template>
            </ox-field>
            <ox-field :editor="editor" name="subject" required/>
            <ox-rich-editor v-model="editor.value.content"/>
        </template>
    </ox-model-edit>
</template>
<script setup lang="ts">
import { useAttrs, computed } from 'vue'
import { t, rules } from "ox"
import {OxModelEdit, OxField, OxAutocomplete} from 'ox/components'
import {OxPersonInput} from '@ox/contacts/components'
import {OxRichEditor} from '@ox/content/components'

import {useMailModels} from '../composables'

const repos = useMailModels()
const attrs = useAttrs()
const props = defineProps({
    /** Owner uuid **/
    owner: String
})
</script>
