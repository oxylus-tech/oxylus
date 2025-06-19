<template>
    <ox-model-edit ref="model-editor" v-bind="attrs" :repo="repos.folders">
        <template #default="{editor, editable}">
            <ox-field :editor="editor" name="name" required />
            <ox-field :editor="editor" name="parent">
                <template #default="{props}">
                    <ox-folder-input v-bind="props"
                        v-model="editor.value.parent"
                        :owner="props.owner" />
                </template>
            </ox-field>
            <ox-field :editor="editor" name="path" disabled/>
        </template>
    </ox-model-edit>
</template>
<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { t, rules } from "ox"
import {OxModelEdit, OxField} from 'ox/components'
import {OxAgentSelect} from '@ox/auth/components'

import OxFolderInput from './OxFolderInput'
import {useFilesModels} from '../composables'

const repos = useFilesModels()
const props = defineProps({
    owner: String
})
const attrs = useAttrs()
</script>
