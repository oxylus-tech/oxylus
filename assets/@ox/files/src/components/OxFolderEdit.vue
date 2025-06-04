<template>
    <ox-model-edit ref="model-editor" v-bind="props" :repo="repos.folders">
        <template #default="{editor, editable}">
            <v-text-field :label="t('fields.name')"
                :rules="[rules.errors(editor.errors?.name), rules.required]"
                v-model="editor.value.name" />
            <ox-folder-input v-model="editor.value.parent"
                :rules="[rules.errors(editor.errors?.parent)]"
                :label="t('fields.folder')" />
            <v-text-field disabled
                :label="t('fields.path')"
                v-model="editor.value.path"/>
        </template>
    </ox-model-edit>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { t, rules } from "ox"
import type {IModelEditorProps} from 'ox'
import {OxModelEdit} from 'ox/components'
import {OxAgentSelect} from '@ox/auth/components'

import OxFolderInput from './OxFolderInput'
import {useFilesModels} from '../composables'

interface IFolderEditProps extends IModelEditorProps {
    owner: string
}

const repos = useFilesModels()
const props = defineProps<IFolderEditProps>()
</script>
