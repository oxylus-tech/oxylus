<template>
    <ox-model-panel v-bind="props" :repo="repos.folders" icon="mdi-folder-outline">
        <template v-for="name in forwardSlots" :key="name" #[name]="bind">
            <slot :name="name" v-bind="bind"/>
        </template>

        <template #item.owner="{item}">
            {{ item.owner.name }}
        </template>

        <template #list.filters="{list,filters}">
            <ox-folder-input v-model="filters.parent__uuid"
                :label="t('fields.folder')"
                density="compact" hide-details/>
            <slot name="list.filters" :list="list" :filters="filters"/>
        </template>

        <template #prepend="{list, panel}">
            <v-navigation-drawer v-if="panel.view.startsWith('list.')" persistent>
                <ox-folder-nav
                    v-model="list.filters.parent__uuid"
                    v-model:owner="list.filters.owner__uuid"
                    />

                <template #append>
                    <ox-folder-nav-edit
                        :folder="list.filters.parent__uuid"
                        :owner="list.filters.owner__uuid"/>
                </template>
            </v-navigation-drawer>
        </template>

        <template #views.detail.edit.default="{value, saved}">
            <ox-folder-edit :initial="value" :saved="saved"/>
        </template>
    </ox-model-panel>
</template>
<script setup lang="ts">
import { useSlots, withDefaults } from 'vue'

import { query, t } from 'ox'
import type {IModelPanelProps} from 'ox'
import {OxModelPanel} from 'ox/components'

import OxFolderEdit from './OxFolderEdit'
import OxFolderInput from './OxFolderInput'
import OxFolderNav from './OxFolderNav'
import {useFilesModels, onFolderNav} from '../composables'

const slots = useSlots()
const forwardSlots = Object.keys(slots).filter(x => !(['list.filters', 'top'].includes(x)))

const repos = useFilesModels()
const props = withDefaults(defineProps<IModelPanelProps>(), {
    name: 'folders',
    relations: [],
    headers: ['path', 'name', 'created', 'updated'],
})
</script>
