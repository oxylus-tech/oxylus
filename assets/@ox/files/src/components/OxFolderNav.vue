<template>
    <v-list v-bind="attrs" selectable class="grow-1"
            @update:selected="select($event[0])">
        <v-list-item prepend-icon="mdi-account-key" :value="{}"
                :active="!item">
            <ox-agent-select ref="agent" icon="" :density="compact" v-model="owner" hide-details/>
        </v-list-item>
        <v-list-item v-for="item, id in parents" :key="item.id"
            :title="item.name" :value="item"
            prepend-icon="mdi-folder-upload" nav/>
        <v-list-item v-if="item"
            :title="item.name" :value="item" active
            prepend-icon="mdi-folder-open"
            @click.capture.stop="unselectCurrent()"/>
        <v-list-item v-for="item in items" :key="item.id"
            :title="item.name" :value="item" class="ml-3"
            prepend-icon="mdi-folder" nav/>
    </v-list>
</template>
<script setup lang="ts">
/**
 * Provide folders navigation.
 *
 * Events:
 * - `selected({folder: string, owner: string})`: when a folder is selected
 *
 */
import { computed, ref, reactive, defineModel, onMounted, watch } from 'vue'

import {query, t, useModelList} from 'ox'
import {OxAgentSelect} from '@ox/auth/components'

import { useFolders } from '../composables'

const repos = useFolders()

const {list, items} = useModelList({query: query(repos.folders)})

/** Current folder id **/
const folder = defineModel()
/** Current owner **/
const owner = defineModel('owner')

/** Reference to OxAgentSelect component **/
const agent = ref(null)
/** Folder's parents **/
const parents = reactive([])

/** Current folder */
const item = computed(() => folder.value && repos.folders.whereId(folder.value).first())

/** Helper function to get index of item from the list **/
const findIndex = (list, id) => list.findIndex((v) => v.id == id)


/** Unselect current item (go to parent) */
function unselectCurrent() {
    select(parents.length ? parents[parents.length-1] : null)
}


/**
 * Select a folder, by object or uuid
 * It fetches parents and children from API when required.
 */
async function select(obj) {
    if(typeof obj == "string") {
        if(obj == item.value)
            return
        const resp = await query(repos.folders).fetch({id: obj})
        obj = resp.entities[0]
    }
    else if(obj && obj.id == item.id)
        return

    if(item.value?.id != obj?.id)
        folder.value = obj?.id

    if(obj) {
        // remove obj from parents
        const idx = findIndex(parents, obj.id)
        idx != -1 && parents.splice(idx)
    }
    await loadParents(obj)

    list.filters = { owner__uuid: owner.value }
    if(obj?.id)
        list.filters.parent__uuid = obj.id
    else
        list.filters.root = "true"

    list.load()
}

/**
 * Sync folder's ancestors to parents list.
 */
async function loadParents(obj) {
    if(!obj?.parent)
        return parents.splice(0)

    if(obj.parent == item.value?.id)
        parents.push(item.value)
    else {
        const idx = findIndex(parents, obj.parent)
        // load parents if not found
        if(idx == -1) {
            const params = { ancestors: obj.id }
            const resp = await list.query.fetch({params})
            parents.splice(0, parents.length, ...resp.entities)
        }
        // otherwise, splice
        else if(idx < parents.length-1)
            parents.splice(idx+1)
    }
}

onMounted(() => owner.value && select(folder.value))

watch(owner, (val, old) => {
    if(val == old)
        return

    parents.splice(0)
    folder.value = null
    list.items = []
    select()
})
watch(() => folder, (val, old) => {
    if(val != old)
        select(folder.value)
})

// defineExpose({ owner, value, item, items })
</script>
