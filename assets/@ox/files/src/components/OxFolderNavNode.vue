<template>
    <template v-if="props.item">
        <v-list-item ref="listItem"
            :title="item.name" :value="item" nav
            :prepend-icon="isOpen ? 'mdi-folder-open' : 'mdi-folder'"
            active-color="success"
            @click.capture.stop="toggle"/>

        <div class="list" v-if="isOpen">
            <ox-folder-nav-node v-for="item in items" :key="item.id"
                :item="item" :owner="props.owner"
                @close="open()"
                @open="emits('open', $event)"/>
        </div>
    </template>
    <template v-else>
        <ox-folder-nav-node v-for="item in items" :key="item.id" :item="item" :owner="props.owner"
            @open="emits('open', $event)"
            @close="emits('close', $event)"/>
    </template>
</template>
<style scoped>
.list {
    margin-left: 0.8rem;
    border-left: 1px solid black;
    margin-right: -1rem;
}

</style>
<script setup lang="ts">
import {ref, defineExpose, defineEmits, watch, onMounted} from 'vue'
import {query, useModelList} from 'ox'
import { useFolders } from '../composables'
import OxFolderNavNode from './OxFolderNavNode'


const props = defineProps({
    item: Object,
    owner: String,
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

watch(() => props.owner, (val, old) => {
    if(props.item || val == old)
        return
    load()
})

onMounted(() => props.owner && load())

defineExpose({ load, items, close, open, toggle, isOpen })
</script>
