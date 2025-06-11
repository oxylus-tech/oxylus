<template>
    <ox-model-panel v-bind="props" :repo="repos.files" icon="mdi-file-outline">
        <template v-for="name in forwardSlots" :key="name" #[name]="bind">
            <slot :name="name" v-bind="bind"/>
        </template>

        <template #list.filters="{list,filters, owner}">
            <slot name="list.filters" :list="list" :filters="filters"/>
        </template>

        <template #prepend="{list, panel}">
            <ox-folder-drawer
                v-if="panel.view.startsWith('list.')"
                v-model="list.filters.folder__uuid"
                v-model:owner="list.filters.owner__uuid"
                />
        </template>

        <template #item.preview="{item}" v-if="!slots['item.preview']">
            <v-img :src="item.preview" class="preview"/>
        </template>

        <template #item.name="{item}">
            {{ item.name }}<br/>
            <small v-if="item.$folder">{{ item.$folder.path }}</small>
        </template>

        <template #item.actions="{value, ...bind}">
            <ox-action :href="value.file" icon="mdi-download"
                :button="bind.button"
                :title="t('actions.download')"/>
            <slot name="item.actions" :value="value" v-bind="bind"/>
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
import {OxModelPanel, OxAction} from 'ox/components'

import OxFileEdit from './OxFileEdit'
import OxFolderDrawer from './OxFolderDrawer'
import {useFilesModels} from '../composables'

const drawer = ref(true)

const slots = useSlots()
const forwardSlots = Object.keys(slots).filter(x => !(['list.filters', 'top', 'item.actions'].includes(x)))

const repos = useFilesModels()
const props = withDefaults(defineProps<IModelPanelProps>(), {
    name: 'files',
    relations: ['$folder'],
    headers: ['preview', 'name', 'updated'],
})
</script>
