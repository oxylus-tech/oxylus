<template>
    <ox-model-panel ref="modelPanel" v-bind="props" :repo="repos.folders" :repos="repos">
        <template v-for="name in forwardSlots" :key="name" #[name]="bind">
            <slot :name="name" v-bind="bind"/>
        </template>

        <!--
        <template #list.filters="{list,filters}">
            <ox-folder-input v-model="filters.parent__uuid"
                :label="t('fields.folder')"
                density="compact" hide-details/>
            <slot name="list.filters" :list="list" :filters="filters"/>
        </template>
        -->

        <template #prepend="{list, activeView}">
            <ox-folder-drawer
                v-if="activeView?.category == 'list'"
                v-model="list.filters.parent__uuid"
                v-model:owner="list.filters.owner__uuid"
                />
        </template>

        <template #views.edit="{value, saved}">
            <ox-folder-edit :initial="value" :saved="saved"/>
        </template>
    </ox-model-panel>
</template>
<script setup lang="ts">
import { useSlots, withDefaults } from 'vue'

import { query, t } from '@oxylus/ox'
import type {IModelPanelProps} from '@oxylus/ox'
import {OxModelPanel} from '@oxylus/ox/components'

import OxFolderEdit from './OxFolderEdit.vue'
import OxFolderInput from './OxFolderInput.vue'
import OxFolderDrawer from './OxFolderDrawer.vue'
import {useFilesModels} from '../composables'

const slots = useSlots()
const forwardSlots = Object.keys(slots).filter(x => !(['list.filters', 'top'].includes(x)))

const repos = useFilesModels()
const props = withDefaults(defineProps<IModelPanelProps>(), {
    name: 'folders',
    relations: [],
    headers: ['name', 'path', 'updated'],
})
</script>
