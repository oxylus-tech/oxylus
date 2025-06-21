<template>
    <v-btn v-if="!drawer" @click.stop="drawer = !drawer"
        class="float-left" icon="mdi-dock-left" :rounded="0"
        variant="text"/>
    <v-navigation-drawer v-model="drawer" permanent v-bind="attrs">
        <v-list-item prepend-icon="mdi-account-key"
            @click.capture.stop="folderNav.load(); folder = ''">
                <ox-agent-select ref="agent" icon="" density="compact" v-model="owner" hide-details class="mb-2 mt-2"/>
        </v-list-item>

        <ox-folder-nav ref="folderNav" :owner="owner"
            v-model:selected="selected" v-model:owner="owner"
            v-model="folder"/>

        <slot name="default" :folder="folder" :owner="owner"/>

        <template #append v-if="folderNav">
            <ox-folder-nav-edit
                :item="selected?.[0]" :owner="owner"
                @updated="folderNav.load()"/>
        </template>
    </v-navigation-drawer>
</template>
<script setup lang="ts">
import { defineModel, ref, useAttrs, watch } from 'vue'
import {OxAgentSelect} from '@ox/auth/components'
import OxFolderNav from './OxFolderNav'
import OxFolderNavEdit from './OxFolderNavEdit'

const drawer = ref(true)
const attrs = useAttrs()
const folder = defineModel()
const selected = defineModel('selected')
const owner = defineModel('owner')

const folderNav = ref(null)

</script>
