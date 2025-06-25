<template>
    <ox-model-panel v-bind="props" :repo="repos.contactLists">
        <template v-for="(_, name) in slots" :key="name" #[name]="bind">
            <slot :name="name" v-bind="bind"></slot>
        </template>

        <template #item.group="{item}">
            <v-chip v-if="item.$group" :prepend-icon="mdi-account-multiple">
                {{ item.$group.name }}
            </v-chip>
            <v-chip v-if="item.$organisation" :prepend-icon="mdi-domain">
                {{ item.$organisation.name }}
            </v-chip>
        </template>

        <template #views.detail.edit.default="{value, saved}">
            <ox-contact-list-edit :initial="value" :saved="saved"/>
        </template>
    </ox-model-panel>
</template>
<script setup lang="ts">
import { defineProps, useSlots, withDefaults } from 'vue'

import type {IModelPanelProps} from 'ox'

import { OxModelPanel } from 'ox/components'
import { useContactList } from '../composables'
import OxContactListEdit from './OxContactListEdit.vue'

const slots = useSlots()

const repos = useContactList()
const props = withDefaults(defineProps<IModelPanelProps>(), {
    relations: ['$group', '$organisation'],
    headers: ['name', 'group', 'is_subscription'],
})
</script>
