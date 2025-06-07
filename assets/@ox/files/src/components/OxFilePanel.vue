<template>
    <ox-model-panel v-bind="props" :repo="repos.files" icon="mdi-file-outline">
        <template v-for="name in forwardSlots" :key="name" #[name]="bind">
            <slot :name="name" v-bind="bind"/>
        </template>

        <template #list.filters="{list,filters, owner}">
            <slot name="list.filters" :list="list" :filters="filters"/>
        </template>

        <template #prepend="{list, panel}">
            <v-navigation-drawer v-if="panel.view.startsWith('list.')" persistent>
                <ox-folder-nav
                    v-model="list.filters.folder__uuid"
                    v-model:owner="list.filters.owner__uuid"
                    />

                <template #append>
                    <ox-folder-nav-edit
                        :folder="list.filters.folder__uuid"
                        :owner="list.filters.owner__uuid"/>
                </template>
            </v-navigation-drawer>
        </template>

        <template #item.preview="{item}" v-if="!slots['item.preview']">
            <v-img :src="item.preview" class="preview"/>
        </template>

        <template #views.detail.edit.default="{value, saved, list}">
            <ox-file-edit :initial="value" :saved="saved"
                :owner="list?.filters?.owner__uuid"
                :folder="list?.filters.folder__uuid" />
        </template>
    </ox-model-panel>
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
import {OxModelPanel} from 'ox/components'

import OxFileEdit from './OxFileEdit'
import OxFolderNav from './OxFolderNav'
import OxFolderNavEdit from './OxFolderNavEdit'
import {useFilesModels, onFolderNav} from '../composables'

const slots = useSlots()
const forwardSlots = Object.keys(slots).filter(x => !(['list.filters', 'top'].includes(x)))

const repos = useFilesModels()
const props = withDefaults(defineProps<IModelPanelProps>(), {
    name: 'files',
    relations: ['$folder'],
    headers: ['preview', 'name', {title: 'fields.folder', key: "$folder.path"}, 'created', 'updated'],
})
</script>
