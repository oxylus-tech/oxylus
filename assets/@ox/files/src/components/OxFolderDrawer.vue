<template>
    <v-btn v-if="!drawer" @click.stop="drawer = !drawer"
        class="float-left" icon="mdi-dock-left" :rounded="0"
        variant="text"/>
    <v-navigation-drawer v-model="drawer" permanent>
        <v-list-item prepend-icon="mdi-account-key"
            @click.capture.stop="folderNav.load(); folder = ''">
                <ox-agent-select ref="agent" icon="" density="compact" v-model="owner" hide-details class="mb-2 mt-2"/>
        </v-list-item>

        <v-list ref="folderList" v-bind="attrs" selectable
                v-model:selected="selected">
            <ox-folder-nav-node ref="folderNav" :owner="owner" v-bind="attrs"
                    @open="select($event)"
                    @close="select()"/>
        </v-list>

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
import OxFolderNavNode from './OxFolderNavNode'
import OxFolderNavEdit from './OxFolderNavEdit'

const drawer = ref(true)
const attrs = useAttrs()
const folder = defineModel()
const selected = ref(null)
const owner = defineModel('owner')

const folderNav = ref(null)
const folderList = ref(null)

function select(item) {
    folder.value = item?.id
    selected.value = [item]
}
</script>
