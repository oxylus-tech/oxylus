<template>
    <ox-model-panel :name="props.name"
            icon="mdi-account-multiple" :repo="repos.groups"
            :headers="props.headers"
            :relations="props.relations"
            search="search">
        <template v-for="(_, name) in slots" :key="name" #[name]="bind">
            <slot :name="name" v-bind="bind"></slot>
        </template>

        <template #views.detail.add="{panel,value,saved}"
                v-if="!slots['views.detail.add'] && context.user.can('auth.add_group')">
            <ox-group-edit :initial="value" @saved="saved"/>
        </template>

        <template #views.detail.edit.window.default="{value}"
                v-if="context.user.can('auth.change_group')">
            <ox-group-edit :initial="value"/>
        </template>

        <template #views.detail.edit.tab.users="{value}">
            <v-tab v-if="value?.id" text="Members" value="users"/>
        </template>
        <template #views.detail.edit.window.users="{value}">
            <ox-group-users :group="value"/>
        </template>
    </ox-model-panel>
</template>
<script setup>
import { defineProps, inject, useSlots } from 'vue'

import { useModels, useModelPanelProps} from 'ox'
import { OxModelPanel } from 'ox/components'
import { useAuthModels } from '../composables'
import OxGroupEdit from './OxGroupEdit.vue'
import OxGroupUsers from './OxGroupUsers.vue'

const context = inject('context')
const slots = useSlots()

const {repos, models} = useAuthModels()
const props = defineProps(
    useModelPanelProps({
        name: "group-panel",
        relations: [],
        headers: ["id", "name"],
    })
)
</script>
