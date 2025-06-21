<template>
    <v-list selectable v-bind="attrs" v-model:selected="selected">
        <ox-folder-nav-item ref="folderNav" :owner="props.owner"
                @open="select($event)"
                @close="select()"/>
    </v-list>
</template>
<script setup lang="ts">
import { defineModel, defineExpose, ref, useAttrs } from 'vue'
import OxFolderNavItem from './OxFolderNavItem'

const attrs = useAttrs()
const props = defineProps({
    owner: String
})

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
