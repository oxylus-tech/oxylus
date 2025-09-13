<template>
    <v-dialog v-model="showSelect" height="80%" scrollable>
        <ox-component src="../ox_files/OxFileSelect.js"
            :owner="props.owner" multiple
            @select="onSelect"
            @close="showSelect = false"/>
    </v-dialog>
    <v-list item-value="id">
        <v-list-item>
            <v-row>
                <v-col>{{ t('labels.files.select.count', {count: list.length}) }}</v-col>
                <v-col cols="2" v-if="list.length">{{ totalSize }}</v-col>

                <v-col cols="2" class="text-right">
                    <v-btn size="small"
                        prepend-icon="mdi-plus"
                        :text="t('actions.files.select')"
                        :aria-label="t('actions.files.select')"
                        @click="showSelect = true" />
                </v-col>
            </v-row>
        </v-list-item>
        <template v-for="item, index in items" :key="index">
            <v-list-item :item="item">
                <v-row align="center">
                    <v-col cols="2" v-if="item.preview">
                        <v-img :src="item.preview" max-width="100px" max-height="80px"/>
                    </v-col>
                    <v-col>{{ item.name }}</v-col>
                    <v-col cols="2">{{ item.displaySize }}</v-col>
                    <v-col cols="2" class="text-right">
                        <v-btn size="small" color="success" icon="mdi-download"
                            :title="t('actions.download')"
                            :aria-label="t('actions.download')"
                            :href="item.file" target="blank" />
                        <v-btn size="small" color="error" icon="mdi-delete" class="ml-2"
                            :title="t('actions.remove')"
                            :aria-label="t('actions.remove')"
                            @click.stop.prevent="removeItem(index)" />
                    </v-col>
                </v-row>
            </v-list-item>
        </template>
    </v-list>
</template>
<script setup lang="ts">
/**
 * Provide a list of mail attachments, wrapping around {@link OxFormList}.
 */
import { computed, defineModel, onMounted, ref, watch } from 'vue'
import {useModelList, query, t} from '@oxylus/core'
import {OxFormList, OxComponent} from '@oxylus/core/components'
import {useFilesModels} from '@oxylus/files/composables'
import {formatBytes} from '@oxylus/files/models'

const repos = useFilesModels()
const props = defineProps({
    /** Current owner **/
    owner: String,
})

const showSelect = ref(false)

/**
 * The list of emails to attach.
 * @model
 */
const ids = defineModel({default: []})

const {list, items} = useModelList({
    query: query(repos.files),
    ids: ids.value ? [...ids.value] : []
})

const totalSize = computed(
    () => formatBytes(items.value.reduce( (dst,v) => dst+v.file_size, 0))
)

function onSelect(selected) {
    const vals = selected.map(v => v.id)
    list.update(vals, true)
    ids.value = [...list.ids]
    showSelect.value = false
}

function removeItem(index) {
    if(confirm(t('actions.delete.confirm'))) {
        list.ids.splice(index, 1)
        ids.value?.splice(index, 1)
    }
}

onMounted(() => {
    ids.value?.length && list.load({all: true, params: {uuid__in: ids.value.join(',')}})
})
</script>
