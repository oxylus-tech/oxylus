<template>
    <ox-owned-panel v-bind="props" :repo="repos.folders" icon="mdi-folder-outline">
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

        <template #prepend="{list, owner, panel}">
            <v-navigation-drawer v-if="panel.view.startsWith('list.')" persistent>
                <ox-folder-nav
                    :owner="owner" :folder="list.filters?.parent__uuid"
                    @selected="list.filters.parent__uuid = $event?.id" v-if="panel.view"/>
            </v-navigation-drawer>
        </template>

        <template #views.detail.edit.default="{value, saved}">
            <ox-folder-edit :initial="value" :saved="saved"/>
        </template>
    </ox-owned-panel>
</template>
<script setup lang="ts">
import { useSlots, withDefaults } from 'vue'

import { query, t } from 'ox'
import type {IModelPanelProps} from 'ox'
import {OxOwnedPanel} from '@ox/auth/components'

import OxFolderEdit from './OxFolderEdit'
import OxFolderInput from './OxFolderInput'
import OxFolderNav from './OxFolderNav'
import {useFilesModels} from '../composables'

const slots = useSlots()
const forwardSlots = Object.keys(slots).filter(x => !(['list.filters', 'top'].includes(x)))

const repos = useFilesModels()
const props = withDefaults(defineProps<IModelPanelProps>(), {
    name: 'folders',
    relations: [],
    headers: ['path', 'name', 'created', 'updated'],
})
</script>
