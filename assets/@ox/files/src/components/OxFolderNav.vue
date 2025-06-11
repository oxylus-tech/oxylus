<template>
    <v-list v-bind="attrs" selectable class="grow-1"
            @update:selected="load($event[0])">
        <v-list-item prepend-icon="mdi-account-key"                :active="!item" @click.capture.stop="load()">
            <ox-agent-select ref="agent" icon="" density="compact" v-model="owner" hide-details/>
        </v-list-item>
        <v-list-item v-for="item, id in parents" :key="item.id"
            :title="item.name" :value="item"
            prepend-icon="mdi-folder-upload" nav/>
        <v-list-item v-if="item"
            :title="item.name" :value="item" active
            prepend-icon="mdi-folder-open"
            @click.capture.stop="unselect()"/>
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
import { computed, ref, reactive, defineExpose, defineModel, onMounted, watch } from 'vue'

import type { Model } from 'ox'
import {query, t, useModelList} from 'ox'
import {OxAgentSelect} from '@ox/auth/components'

import { useFolders } from '../composables'

const repos = useFolders()
const {list, items} = useModelList({ query: query(repos.folders, repos) })

/** Current folder id **/
const folder = defineModel()
/** Current owner **/
const owner = defineModel('owner')

/** Reference to OxAgentSelect component **/
const agent = ref(null)
/** Folder's parents **/
const parents = reactive([])

/** Current folder */
const item = ref(null)

/** Helper function to get index of item from the list **/
const findIndex = (list, id) => list.findIndex((v) => v.id == id)


/** Unselect current item (go to parent) */
function unselect() {
    load(parents.length ? parents[parents.length-1] : null)
}


/**
 * Select a folder, by object or uuid
 * It fetches parents and children from API when required.
 */
async function load(obj: string|Model, force: boolean =false) {
    if(typeof obj == "string") {
        if(obj == item.value)
            return
        const resp = await list.query.fetch({id: obj, save: false})
        obj = resp.entities[0]
    }

    folder.value = obj?.id
    item.value = obj

    if(obj) {
        // remove obj from parents if found
        const idx = findIndex(parents, obj.id)
        idx != -1 && parents.splice(idx)
    }
    await loadParents(obj)

    list.filters = { owner__uuid: owner.value, ordering: 'name' }
    if(obj?.id)
        list.filters.parent__uuid = obj.id
    else
        list.filters.root = "true"

    return await list.load()
}

/** Reload current opened folder */
async function reload() {
    return await load(item.value)
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
            const resp = await list.query.fetch({params, save: false})
            parents.splice(0, parents.length, ...resp.entities)
        }
        // otherwise, splice
        else if(idx < parents.length-1)
            parents.splice(idx+1)
    }
}

onMounted(() => owner.value && load(folder.value))

watch(owner, (val, old) => {
    if(val == old)
        return

    parents.splice(0)
    folder.value = null
    list.ids = []
    load()
})
watch(() => folder, (val, old) => {
    if(val != old)
        load(folder.value)
})

defineExpose({ load, reload, list, owner, item, parents })
</script>
