<template>
    <template v-if="props.item">
        <v-list-item ref="listItem"
            :title="item.name" :value="item" nav
            :prepend-icon="isOpen ? 'mdi-folder-open' : 'mdi-folder'"
            active-color="success"
            @click.capture.stop="toggle"/>

        <div class="children" v-if="isOpen" style="
                margin-left: 0.8rem;
                border-left: 1px solid black;
                margin-right: -1rem;">
            <ox-folder-nav-item v-for="item in items" :key="item.id"
                :item="item" :owner="props.owner"
                :current-folder="props.currentFolder"
                @close="onOpen" @open="emits('open', $event)"/>
        </div>
    </template>
    <template v-else>
        <ox-folder-nav-item v-for="item in items" :key="item.id" :item="item" :owner="props.owner"
            :current-folder="props.currentFolder"
            @open="onOpen" @close="emits('close', $event)"/>
    </template>
</template>
<style scoped>
.children {
    margin-left: 0.8rem;
    border-left: 1px solid black;
    margin-right: -1rem;
}
</style>
<script setup lang="ts">
import {ref, defineExpose, defineEmits, watch, onMounted} from 'vue'
import {query, useModelList} from '@oxylus/core'
import { useFolders } from '../composables'
import OxFolderNavItem from './OxFolderNavItem'


const props = defineProps({
    /** Folder object to be rendered */
    item: Object,
    /** Owner id */
    owner: String,
    /** Current opened folder */
    currentFolder: String,
})
const emits = defineEmits(['open', 'close'])

const listItem = ref(null)
const isOpen = ref(false)
const repos = useFolders()
const {list, items} = useModelList({query: query(repos.folders)})

function toggle() {
    if(isOpen.value && listItem.value.isSelected)
        close()
    else
        open()
}

function close() {
    listItem.value.select(false)
    isOpen.value = false
    list.ids = []
    emits('close', props.item)
}

async function open() {
    listItem.value.select(true)
    isOpen.value = true
    emits('open', props.item)
    return await load()
}

async function load() {
    const params = { owner__uuid: props.owner, ordering: 'name' }
    if(props.item?.id)
        params.parent__uuid = props.item.id
    else
        params.root = "true"
    return await list.load({params})
}

function onOpen(...args) {
    isOpen.value = true
    emits('open', ...args)
}

watch(() => props.owner, (val, old) => {
    if(props.item || val == old)
        return
    load()
})

onMounted(() => {
    props.owner && load()
    props.item && props.currentFolder == props.item.id && open()
})

defineExpose({ load, items, close, open, toggle, isOpen })
</script>
