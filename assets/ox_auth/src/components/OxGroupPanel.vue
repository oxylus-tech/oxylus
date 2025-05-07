<template>
    <ox-model-panel :name="props.name"
            icon="mdi-account-multiple" :repo="repos.groups"
            :headers="props.headers"
            :relations="props.relations"
            search="search">
        <template v-for="(_, name) in slots" :key="name" #[name]="bind">
            <slot :name="name" v-bind="bind"></slot>
        </template>

        <template #views.detail.edit.window.default="{value}">
            <ox-group-edit :initial="value"/>
        </template>

        <!--
        <template #views.detail.edit.tab.users="{value}">
            <v-tab v-if="value?.id" text="Members" value="users"/>
        </template>
        <template #views.detail.edit.window.users="{value}">
            <ox-group-users :group="value"/>
        </template> -->
    </ox-model-panel>
</template>
<script setup lang="ts">
import { defineProps, inject, useSlots, withDefaults } from 'vue'

import type {IModelPanelProps} from '@ox/controllers'

import { OxModelPanel } from 'ox/components'
import { useAuthModels } from '../composables'
import OxGroupEdit from './OxGroupEdit.vue'
// import OxGroupUsers from './OxGroupUsers.vue'

const context = inject('context')
const slots = useSlots()

const {repos, models} = useAuthModels()
const props = withDefaults(defineProps<IModelPanelProps>(), {
    name: 'groups',
    headers: ['id', 'name'],
})
</script>
