<template>
    <v-list v-bind="attrs" selectable v-model:selected="selected">
        <v-list-item :value="{}">
            <v-list-item-title>
                <v-icon>mdi-account-key</v-icon>
                {{ props.owner?.name || "/" }}
            </v-list-item-title>
        </v-list-item>
        <v-list-item v-for="item in parents" :key="item.id" :item="item"
            :title="item.name" :value="item"
            prepend-icon="mdi-folder-open"
            />
        <v-divider color="success" />
        <v-list-item v-for="item in items" :key="item.id" :item="item"
            :title="item.name" :value="item"
            prepend-icon="mdi-folder" />
    </v-list>
</template>
<script setup lang="ts">
import { ref, reactive, defineModel, defineEmits, onMounted, useAttrs, watch } from 'vue'

import {query} from 'ox'
import { useFolders } from '../composables'

const emits = defineEmits('selected')

const props = defineProps({
    /** Folder instance to list children **/
    folder: Object,
    /** Owner */
    owner: Object,
})
const repos = useFolders()
const items = ref([])
const item = ref(props.folder)
const parents = reactive([])
const selected = ref(null)

async function load() {
    if(!props.owner)
        return
    const params = { owner__uuid: props.owner.id }
    if(item.value?.id)
        params.parent__uuid = item.value.id
    else
        params.root = "true"

    const resp = await query(repos.folders).all({params})
    items.value = resp.entities
}

onMounted(() => load())
watch(selected, (val) => {
    val = val[0]
    if(items.value.find((v) => v.id == val.id))
        parents.push(val)
    else if(val?.id) {
        const idx = parents.findIndex(v => val.id == v.id)
        if(idx != -1)
            parents.splice(idx+1)
    }
    else
        parents.splice(0)
    item.value = val
    emits('selected', item.value)
    load()
})
watch(() => [props.folder, props.owner], () => {
    item.value = null
    load()
})
</script>
