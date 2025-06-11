<template>
    <v-btn v-if="!drawer" @click.stop="drawer = !drawer"
        class="float-left" icon="mdi-dock-left" :rounded="0"
        variant="text"/>
    <v-navigation-drawer v-model="drawer" permanent>
        <ox-folder-nav ref="folderNav" v-model="folder" v-model:owner="owner" v-bind="attrs"/>

        <slot name="default" :folder="folder" :owner="owner"/>

        <template #append v-if="folderNav">
            <ox-folder-nav-edit
                :item="folderNav.item" :owner="folderNav.owner" :list="folderNav.list"
                @updated="folderNav.reload()"/>
        </template>
    </v-navigation-drawer>
</template>
<script setup lang="ts">
import { defineModel, ref, useAttrs } from 'vue'
import OxFolderNav from './OxFolderNav'
import OxFolderNavEdit from './OxFolderNavEdit'

const drawer = ref(true)
const attrs = useAttrs()
const folder = defineModel()
const owner = defineModel('owner')

const folderNav = ref(null)
</script>
