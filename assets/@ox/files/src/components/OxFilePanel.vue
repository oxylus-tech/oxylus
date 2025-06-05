<template>
    <ox-owned-panel v-bind="props" :repo="repos.files" icon="mdi-file-outline">
        <template v-for="name in forwardSlots" :key="name" #[name]="bind">
            <slot :name="name" v-bind="bind"/>
        </template>

        <template #list.filters="{list,filters}">
            <ox-folder-input v-model="filters.folder__uuid"
                :label="t('fields.folder')"
                density="compact" hide-details/>
            <slot name="list.filters" :list="list" :filters="filters"/>
        </template>

        <template #side="{list, owner}">
            <ox-folder-nav :owner="owner" @selected="list.filters.folder__uuid = $event?.id"/>
        </template>

        <template #item.preview="{item}" v-if="!slots['item.preview']">
            <img :src="item.preview" class="preview"/>
        </template>

        <template #views.detail.edit.default="{value, saved}">
            <ox-file-edit :initial="value" :saved="saved"/>
        </template>
    </ox-owned-panel>
</template>
<style scoped>
.preview {
    max-width: 100%;
    max-height: 100px;
}
</style>
<script setup lang="ts">
import { ref, useSlots, withDefaults } from 'vue'

import { query, t } from 'ox'
import type {IModelPanelProps} from 'ox'
import {OxOwnedPanel} from '@ox/auth/components'

import OxFileEdit from './OxFileEdit'
import OxFolderNav from './OxFolderNav'
import OxFolderInput from './OxFolderInput'
import {useFilesModels} from '../composables'

const slots = useSlots()
const forwardSlots = Object.keys(slots).filter(x => !(['list.filters', 'top'].includes(x)))

const repos = useFilesModels()
const folder = ref(null)
const props = withDefaults(defineProps<IModelPanelProps>(), {
    name: 'files',
    relations: ['$folder'],
    headers: ['preview', 'name', {title: 'fields.folder', key: "$folder.path"}, 'created', 'updated'],
})
</script>
