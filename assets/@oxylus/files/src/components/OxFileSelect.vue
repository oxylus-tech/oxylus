<template>
    <v-card>
        <v-card-title>
            <v-row>
                <v-col>{{ t('actions.files.select') }}</v-col>
                <v-col>
                    <v-text-field v-model="list.filters.search"
                        :label="t('filters.search')" :aria-label="t('filters.search')"
                        hide-details density="compact"/>
                </v-col>
            </v-row>

        </v-card-title>
        <v-card-text>
            <v-row>
                <v-col cols="2" class="folders">
                    <ox-folder-nav :owner="props.owner"
                        v-model="list.filters.folder__uuid" style="overflow-x: hidden"/>
                </v-col>
                <v-col class="files">
                    <ox-list-table v-model="selected" return-object
                            item-value="id"
                            :list="list" :items="items"
                            :select-strategy="props.multiple ? 'page':'single'" show-select
                            :headers="['preview', 'name', 'file_size', 'updated']"
                            >
                        <template #item.preview="{item}">
                            <v-img :src="item.preview" max-width="50px"/>
                        </template>
                        <template #item.file_size="{item}">
                            {{ formatBytes(item.file_size) }}
                        </template>

                    </ox-list-table>
                </v-col>
            </v-row>
        </v-card-text>
        <v-card-actions>
            <v-row>
                <v-col>
                    <template v-if="selected?.length">
                        <v-chip color="info">
                            {{ selected[0].name }}
                            <template v-if="selected.length > 1">
                                + {{ selected.length }}
                            </template>
                        </v-chip>
                    </template>
                </v-col>
                <v-col class="text-right">
                    <v-btn :text="t('actions.select')" color="primary"
                        class="mr-3"
                        :disabled="!selected?.length"
                        @click="select()"/>
                    <v-btn :text="t('actions.close')" color="error"
                        @click="close()"/>
                </v-col>
            </v-row>
        </v-card-actions>
    </v-card>
</template>
<style scoped>
.nav {
    max-height: 20rem;
}

/*.files, .folders {
    max-height: 100%;
    overflow-y: auto;
}*/

/* .folders { min-width: 18rem; } */
</style>
<script setup lang="ts">
/**
 * This component provide a file selector inside a card.
 * It can be embedded into a v-dialog if required.
 *
 * Internally, it uses a {@link list}, which means that owned items are released after the component is destroyed.
 * This means that if you want to use those items dynamically without fetch again, you'll have to acquire them first in your own list.
 *
 * Events:
 * - `select(selected: ModelId[])`: emitted when items are selected, with a list of those items.
 * - `close`: user clicked on close button
 */
import type { Ref } from 'vue'
import type { ModelId } from '@oxylus/ox'

import { defineModel, defineEmits, reactive, ref, watch } from 'vue'
import { t, useModelList, query } from '@oxylus/ox'
import {OxListTable} from '@oxylus/ox/components'
import {useFilesModels} from '../composables'
import { formatBytes } from '../models'

import OxFolderNav from './OxFolderNav.vue'

const emits = defineEmits(['select', 'close'])
const props = defineProps({
    /** Current owner uuid **/
    owner: String,
    /** Enable multi-selection **/
    multiple: Boolean,
})
const repos = useFilesModels()

const selected: Ref<ModelId[]> = ref([])

const {list, items} = useModelList({
    query: query(repos.files, repos),
})


function select() { emits('select', selected.value) }
function close() { emits('close') }

watch(() => props.owner, (val) => {
    list.filters.owner__uuid = props.owner
})
watch(() => Object.values(list.filters), (val) => list.load() )
</script>
