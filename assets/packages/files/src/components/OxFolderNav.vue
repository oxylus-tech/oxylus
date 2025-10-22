<template>
    <v-list ref="folderList" selectable v-bind="attrs" v-model:selected="selected">
        <ox-folder-nav-item ref="folderNav" :owner="props.owner"
                :current-folder="folder"
                @open="select($event)"
                @close="select()"/>
    </v-list>
</template>
<script setup lang="ts">
import { defineModel, defineExpose, onMounted, ref, useAttrs, watch } from 'vue'
import OxFolderNavItem from './OxFolderNavItem.vue'

const attrs = useAttrs()
const props = defineProps({
    owner: String
})

const folderList = ref(null)
const folderNav = ref(null)
const folder = defineModel()
const selected = defineModel('selected')

function select(item) {
    folder.value = item?.id
    selected.value = [item]
}

defineExpose({
    folder, selected,

    get load() { return folderNav.value.load }
})
</script>
