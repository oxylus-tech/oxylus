<template>
    <!-- Simple preview dialog -->
    <v-dialog v-model="dialog.active" max-width="1000">
        <v-spacer/>
        <ox-file-viewer v-model="dialog.item" :items="modelPanel.items">
            <template #actions.close>
                <v-btn icon="mdi-close" color="error" variant="text"
                    :aria-label="t('actions.close')"
                    :title="t('actions.close')"
                    @click="dialog.active=false"/>
            </template>
        </ox-file-viewer>
        <v-spacer/>
    </v-dialog>

    <ox-model-panel ref="modelPanel" v-bind="props" :repo="repos.files">
        <template v-for="name in forwardSlots" :key="name" #[name]="bind">
            <slot :name="name" v-bind="bind"/>
        </template>

        <template #list.filters="{list,filters, owner}">
            <slot name="list.filters" :list="list" :filters="filters"/>
        </template>

        <template #prepend="{list, panel}">
            <ox-folder-drawer
                :show="panel.view.startsWith('list.')"
                v-model="list.filters.folder__uuid"
                v-model:owner="list.filters.owner__uuid"
                />
        </template>

        <template #item.image="{item}" v-if="!slots['item.preview']">
            <v-img v-if="item.preview" :src="item.preview" class="preview"
                cover max-height="200" width="100"
                @click="dialog.show(item)" style="cursor: pointer"/>
        </template>

        <template #item.name="{item}">
            {{ item.name }}<br/>
            <small v-if="item.$folder">{{ item.$folder.path }}</small>
        </template>

        <template #item.file_size="{item, ...o}">{{ formatBytes(item.file_size) }}</template>

        <template #item.actions="{item, ...bind}">
            <ox-action :href="item.file" icon="mdi-download"
                :button="bind.button"
                :title="t('actions.download')"/>
            <slot name="item.actions" :item="item" v-bind="bind"/>
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
}
</style>
<script setup lang="ts">
/**
 * @component This is the panel provided for files.
 *
 * It has:
 * - A drawer on the left for folder list and edition
 * - A file viewer integrated.
 *
 */

import { ref, reactive, useSlots, toRaw, withDefaults, watch } from 'vue'

import { query, t } from '@oxylus/ox'
import type {IModelPanelProps} from '@oxylus/ox'
import {OxModelPanel, OxAction} from '@oxylus/ox/components'

import OxFileEdit from './OxFileEdit'
import OxFileViewer from './OxFileViewer'
import OxFolderDrawer from './OxFolderDrawer'
import { formatBytes } from '../models'
import {useFilesModels} from '../composables'

const modelPanel = ref(null)
const drawer = ref(true)
const dialog = reactive({
    active: false,
    item: null,

    show(item) {
        this.item = item
        this.active = true
    },

    close() {
        this.active = false
    },

    go(dir) {
        const items = modelPanel.value.items
        console.log(items, this.item)
        let idx = items.indexOf(this.item) + dir
        idx = this.normIndex(idx)

        this.item = items[idx]
    },

    normIndex(index) {
        const items = modelPanel.value.items
        if(index > items.length)
            return 0
        else if(index < 1)
            return items.length-1
        return index
    }
})

const slots = useSlots()
const forwardSlots = Object.keys(slots).filter(x => !(['list.filters', 'top', 'item.actions'].includes(x)))

const repos = useFilesModels()
const props = withDefaults(defineProps<IModelPanelProps>(), {
    name: 'files',
    relations: ['$folder'],
    headers: ['name', 'file_size', 'updated'],
})
</script>
