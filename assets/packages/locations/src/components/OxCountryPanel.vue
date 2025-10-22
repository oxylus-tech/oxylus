<template>
    <ox-model-panel v-bind="props" :repo="repos.countries"
            :warning="t('alerts.danger_zone_system_data')">
        <template v-for="name in forwardSlots" :key="name" #[name]="bind">
            <slot :name="name" v-bind="bind"/>
        </template>

        <template #list.filters="{list,filters}">
            <ox-continent-input class="ml-3" density="compact" hide-details
                v-model="filters.continent"
                :label="t('fields.continent')" />

            <slot name="list.filters" :list="list" :filters="filters"/>
        </template>

        <template #item.name="{item}" v-if="!slots['item.name']">
            {{ item.flag }} {{ item.name }}
        </template>

        <template #item.currency="{item}" v-if="!slots['item.currency']">
            {{ item.$currency?.code }}
        </template>

        <template #views.detail.edit.default="{value, saved}">
            <ox-country-edit :initial="value" :saved="saved"/>
        </template>
    </ox-model-panel>
</template>
<script setup lang="ts">
import { defineProps, useSlots, withDefaults } from 'vue'

import { query, t } from '@oxylus/ox'
import {OxModelPanel} from '@oxylus/ox/components'
import type {IModelPanelProps} from '@oxylus/ox'

import {useLocationModels} from '../composables'
import OxContinentInput from './OxContinentInput.vue'
import OxCountryEdit from './OxCountryEdit.vue'

const slots = useSlots()
const forwardSlots = Object.keys(slots).filter(x => !(['list.filters', 'top'].includes(x)))

const repos = useLocationModels()

// FIXME: acquire/release
query(repos.currencies).allOnce()

const props = withDefaults(defineProps<IModelPanelProps>(), {
    name: 'countries',
    relations: ['$currency'],
    fetchRelations: false,
    headers: ['name', 'code', 'code_3', 'phone', 'currency'],
})
</script>
