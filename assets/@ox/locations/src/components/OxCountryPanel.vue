<template>
    <ox-model-panel :name="props.name"
            icon="mdi-earth" :repo="repos.countries"
            :headers="props.headers"
            :relations="props.relations" :fetch-relations="false"
            search="search">
        <template v-for="name in forwardSlots" :key="name" #[name]="bind">
            <slot :name="name" v-bind="bind"/>
        </template>

        <template #list.filters="{list,filters}">
            <ox-continent-input class="ml-3" density="compact"
                v-model="filters.continent"
                :label="t('fields.continent')" />

            <slot name="list.filters" :list="list" :filters="filters"/>
        </template>

        <template #item.name="{item}" v-if="!slots['item.name']">
            {{ item.flag }} {{ item.name }}
        </template>

        <template #item.currency="{item}" v-if="!slots['item.currency']">
            {{ item.$currency.code }}
        </template>

        <!--
        <template #views.list.kanban="{panel,items,list}">
            <ox-list-kanban field="groups_id" :headers="kanbanHeaders"
                item-title="username"
                @click="(item) => panel.show({view: 'detail.edit', value: item})"/>
        </template> -->

        <template #views.detail.edit.default="{value, saved}">
            <ox-country-edit :initial="value" :saved="saved" :full="true"/>
        </template>
    </ox-model-panel>
</template>
<script setup lang="ts">
import { computed, defineProps, inject, useSlots, withDefaults } from 'vue'

import { useModels, query, t } from 'ox'
import {OxModelPanel, OxListKanban} from 'ox/components'
import type {IModelPanelProps} from 'ox'

import {useLocationModels} from '../composables'
import OxContinentInput from './OxContinentInput.vue'
import OxCountryEdit from './OxCountryEdit.vue'

const slots = useSlots()
const forwardSlots = Object.keys(slots).filter(x => !(['list.filters',].includes(x)))

const repos = useLocationModels()

const kanbanHeaders = computed(() => {
    return [
        {title: 'Without group', value: null},
        ...groups.value.map((group) => ({title: group.name, value: group.id}))
    ]
})

const props = withDefaults(defineProps<IModelPanelProps>(), {
    name: 'countries',
    relations: ['$currency'],
    headers: ['name', 'code', 'code_3', 'phone', 'currency'],
})
</script>
