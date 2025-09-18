<template>
    <ox-model-panel v-bind="props" :repo="repos.currencies"
            :warning="t('alerts.danger_zone_system_data')">
        <template v-for="name in forwardSlots" :key="name" #[name]="bind">
            <slot :name="name" v-bind="bind"/>
        </template>

        <template #list.filters="{list,filters}">
            <slot name="list.filters" :list="list" :filters="filters"/>
        </template>

        <template #item.is_iso="{item}">
            <v-icon v-if="item.is_iso" class="text-success">mdi-check-circle</v-icon>
            <v-icon v-else class="text-error">mdi-close-circle</v-icon>
        </template>

        <template #views.detail.edit.default="{value, saved}">
            <ox-currency-edit :initial="value" :saved="saved"/>
        </template>
    </ox-model-panel>
</template>
<script setup lang="ts">
import { computed, defineProps, inject, useSlots, withDefaults } from 'vue'

import { useModels, query, t } from '@oxylus/ox'
import {OxModelPanel} from '@oxylus/ox/components'
import type {IModelPanelProps} from '@oxylus/ox'

import {useLocationModels} from '../composables'
import OxCurrencyEdit from './OxCurrencyEdit.vue'

const slots = useSlots()
const forwardSlots = Object.keys(slots).filter(x => !(['list.filters', 'top'].includes(x)))

const repos = useLocationModels()
query(repos.currencies).allOnce()

const kanbanHeaders = computed(() => {
    return [
        {title: 'Without group', value: null},
        ...groups.value.map((group) => ({title: group.name, value: group.id}))
    ]
})

const props = withDefaults(defineProps<IModelPanelProps>(), {
    name: 'currencies',
    headers: ['name', 'code', 'numeric', 'is_iso', 'valid_to'],
})
</script>
