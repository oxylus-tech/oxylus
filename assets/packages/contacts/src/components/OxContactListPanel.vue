<template>
    <ox-model-panel v-bind="props" :repo="repos.contactLists">
        <template v-for="(_, name) in slots" :key="name" #[name]="bind">
            <slot :name="name" v-bind="bind"></slot>
        </template>

        <template #item.name="{item}">
            <ox-contact-list-name :item="item"/>
        </template>

        <template #item.contact_count="{item}">
            {{ t('fields.contact_count.value', item.contact_count, {count: item.contact_count}) }}
            <v-chip v-if="item.is_subscription">{{ t('fields.is_subscription') }}</v-chip>
        </template>

        <template #views.detail.edit.default="{value, saved}">
            <ox-contact-list-edit :initial="value" :saved="saved"/>
        </template>
    </ox-model-panel>
</template>
<script setup lang="ts">
import { defineProps, useSlots, withDefaults } from 'vue'

import type {IModelPanelProps} from '@oxylus/ox'
import { t } from '@oxylus/ox'

import { OxModelPanel } from '@oxylus/ox/components'
import { useContactList } from '../composables'
import OxContactListName from './OxContactListName.vue'
import OxContactListEdit from './OxContactListEdit.vue'

const slots = useSlots()

const repos = useContactList()
const props = withDefaults(defineProps<IModelPanelProps>(), {
    relations: ['$group', '$organisation'],
    fetchRelations: true,
    headers: ['name', 'contact_count'],
})
</script>
