<template>
    <ox-model-panel v-bind="props" :repo="repos.groups" icon="mdi-account-multiple">
        <template v-for="(_, name) in slots" :key="name" #[name]="bind">
            <slot :name="name" v-bind="bind"></slot>
        </template>

        <template #views.detail.edit.default="{value, saved}">
            <ox-group-edit :initial="value" :saved="saved"/>
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
import { defineProps, useSlots, withDefaults } from 'vue'

import type {IModelPanelProps} from 'ox'

import { OxModelPanel } from 'ox/components'
import { useAuthModels } from '../composables'
import OxGroupEdit from './OxGroupEdit.vue'

const slots = useSlots()

const repos = useAuthModels()
const props = withDefaults(defineProps<IModelPanelProps>(), {
    name: 'groups',
    headers: ['id', 'name'],
})
</script>
