<template>
    <ox-model-edit ref="model-editor" v-bind="attrs" :repo="repos.mailTemplates">
        <template #default="{editor, editable}">
            <ox-field :editor="editor" name="name" type="text" required/>
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
            <ox-field :editor="editor" name="subject" required/>
            <ox-rich-editor v-model="editor.value.content"/>
        </template>
    </ox-model-edit>
</template>
<script setup lang="ts">
import { useAttrs, computed } from 'vue'
import { t, rules } from "ox"
import {OxModelEdit, OxField, OxAutocomplete} from 'ox/components'
import {OxRichEditor} from '@ox/content/components';

import {useMailModels} from '../composables'

const repos = useMailModels()
const attrs = useAttrs()
const props = defineProps({
    /** Owner uuid **/
    owner: String
})
</script>
