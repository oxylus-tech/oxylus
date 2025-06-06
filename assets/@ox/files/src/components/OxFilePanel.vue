<template>
    <ox-owned-panel v-bind="props" :repo="repos.files" icon="mdi-file-outline">
        <template v-for="name in forwardSlots" :key="name" #[name]="bind">
            <slot :name="name" v-bind="bind"/>
        </template>

        <template #list.filters="{list,filters, owner}">
            <!-- <ox-folder-input v-model="filters.folder__uuid" v-if="owner?.id"
                :owner="owner?.id"
                :label="t('fields.folder')"
                density="compact" hide-details/> -->
            <slot name="list.filters" :list="list" :filters="filters"/>
        </template>

        <template #prepend="{list, owner, panel}">
            <v-navigation-drawer v-if="panel.view.startsWith('list.')" persistent>
                <ox-folder-nav
                    :owner="owner" :folder="list.filters?.folder__uuid"
                    @selected="list.filters.folder__uuid = $event?.id" v-if="panel.view"/>
            </v-navigation-drawer>
        </template>

        <template #item.preview="{item}" v-if="!slots['item.preview']">
            <v-img :src="item.preview" class="preview"/>
        </template>

        <template #views.detail.edit.default="{value, saved, owner}">
            <ox-file-edit :initial="value" :saved="saved" :owner="owner" />
        </template>
    </ox-owned-panel>
</template>
<style scoped>
.preview {
    max-width: 200px;
    max-height: 400px;
}
</style>
<script setup lang="ts">
import { ref, useSlots, withDefaults, watch } from 'vue'

import { query, t } from 'ox'
import type {IModelPanelProps} from 'ox'
import {OxOwnedPanel} from '@ox/auth/components'

import OxFileEdit from './OxFileEdit'
import OxFolderNav from './OxFolderNav'
// import OxFolderInput from './OxFolderInput'
import {useFilesModels} from '../composables'

const slots = useSlots()
const forwardSlots = Object.keys(slots).filter(x => !(['list.filters', 'top'].includes(x)))

const repos = useFilesModels()
const props = withDefaults(defineProps<IModelPanelProps>(), {
    name: 'files',
    relations: ['$folder'],
    headers: ['preview', 'name', {title: 'fields.folder', key: "$folder.path"}, 'created', 'updated'],
})
</script>
