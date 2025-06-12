<template>
    <v-list v-bind="attrs" selectable class="grow-1"
            @update:selected="load($event[0])">
        <v-list-item prepend-icon="mdi-account-key"                :active="!item" @click.capture.stop="load()">
            <ox-agent-select ref="agent" icon="" density="compact" v-model="owner" hide-details/>
        </v-list-item>
        <v-list-item v-for="obj in items" :key="obj.id"
            :title="obj.name" :value="obj"
            :class="item && obj.level > item.level ? 'ml-3' : ''"
            :prepend-icon="getIcon(obj)" nav
            />
        <!-- @click.capture.stop="item.id == folder && unselect()" -->
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
    load(obj.parent)
}


function getIcon(obj) {
    if(!item.value)
        return 'mdi-folder'
    return obj.level < item.value.level ? 'mdi-folder-upload' :
           obj.id == item.value.id ? 'mdi-folder-open' : 'mdi-folder'
}

/**
 * Select a folder, by object or uuid
 * It fetches parents and children from API when required.
 */
async function load(obj: string|Model, force: boolean =false) {
    list.filters = { owner__uuid: owner.value, ordering: 'name' }

    if(obj) {
        if(obj.parent) {
            await list.load({ params: { ancestors: obj.id }})
            list.ids.push(obj.id)
        }
        else
            list.ids = [obj.id]
    }
    else
        list.ids = []

    folder.value = obj?.id
    item.value = obj

    const params = {}
    if(obj?.id)
        params.parent__uuid = obj.id
    else
        params.root = "true"

    await list.load({append: true, params})
}

/** Reload current opened folder */
async function reload() {
    return await load(item.value)
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
