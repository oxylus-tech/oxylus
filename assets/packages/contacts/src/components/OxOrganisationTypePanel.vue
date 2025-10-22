<template>
    <ox-model-panel v-bind="props" :repo="repos.organisationTypes"
            :warning="t('alerts.danger_zone_system_data')">
        <template v-for="name in forwardSlots" :key="name" #[name]="bind">
            <slot :name="name" v-bind="bind"/>
        </template>

        <template #list.filters="{list,filters}">
            <ox-country-input v-model="filters.country__uuid__in"
                class="ml-2"
                :label="t('fields.country')" density="compact"
                hide-details/>

            <slot name="list.filters" :list="list" :filters="filters"/>
        </template>

        <template #item.country="{item}" v-if="!slots['item.currency']">
            {{ item.$country?.flag }} {{ item.$country?.name }}
        </template>

        <template #views.detail.edit.default="{value, saved}">
            <ox-organisation-type-edit :initial="value" :saved="saved"/>
        </template>
    </ox-model-panel>
</template>
<script setup lang="ts">
import { defineProps, useSlots, withDefaults } from 'vue'

import { useModels, query, t } from '@oxylus/ox'
import {OxModelPanel} from '@oxylus/ox/components'
import type {IModelPanelProps} from '@oxylus/ox'

import {OxCountryInput} from '@oxylus/locations/components'
import OxOrganisationTypeEdit from './OxOrganisationTypeEdit.vue'
import {useContactModels} from '../composables'

const slots = useSlots()
const forwardSlots = Object.keys(slots).filter(x => !(['list.filters', 'top'].includes(x)))

const repos = useContactModels()
const props = withDefaults(defineProps<IModelPanelProps>(), {
    name: 'organisationTypes',
    relations: ['$country'],
    fetchRelations: true,
    headers: ['name', 'abbreviation', 'code', 'country', 'language_code'],
})
</script>
