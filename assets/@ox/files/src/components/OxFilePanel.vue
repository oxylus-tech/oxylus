<template>
    <ox-owned-panel v-bind="props" :repo="repos.files" icon="mdi-file-outline">
        <template v-for="name in forwardSlots" :key="name" #[name]="bind">
            <slot :name="name" v-bind="bind"/>
        </template>

        <template #list.filters="{list,filters}">
            <ox-folder-input v-model="filters.parent__uuid"
                :label="t('fields.folder')"
                density="compact" hide-details/>
            <slot name="list.filters" :list="list" :filters="filters"/>
        </template>

        <template #item.preview="{item}" v-if="!slots['item.preview']">
            <img :src="item.preview"/>
        </template>

        <template #views.detail.edit.default="{value, saved}">
            <ox-file-edit :initial="value" :saved="saved"/>
        </template>
    </ox-owned-panel>
</template>
<script setup lang="ts">
import { useSlots, withDefaults } from 'vue'

import { query, t } from 'ox'
import type {IModelPanelProps} from 'ox'
import {OxOwnedPanel} from '@ox/auth/components'

import OxFileEdit from './OxFileEdit'
import OxFolderInput from './OxFolderInput'
import {useFilesModels} from '../composables'

const slots = useSlots()
const forwardSlots = Object.keys(slots).filter(x => !(['list.filters', 'top'].includes(x)))

const repos = useFilesModels()
const props = withDefaults(defineProps<IModelPanelProps>(), {
    name: 'files',
    relations: ['$folder'],
    headers: ['preview', 'name', "folder", 'created', 'updated'],
})
</script>
