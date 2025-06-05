<template>
    <v-data-table-server
            :items="items" item-index="id"
            :items-length="list.count || items.length"
            :items-per-page="props.itemsPerPage"
            :loading="list.state?.isProcessing"
            :headers="headers"
            :no-data-text="t('lists.empty')"
            class="align-top-table"
            @update:options="updateOptions">
        <template v-slot:loading>
            <v-skeleton-loader type="table-row@10"></v-skeleton-loader>
        </template>

        <template v-for="(_, name) in itemSlots" :key="name" v-slot:[name]="bind">
            <slot :name="name" v-bind="bind"/>
        </template>

        <template #item.actions="{item}">
            <ox-action v-if="user.can([item.constructor, 'change'], item)"
                icon="mdi-pencil" button
                :title="t('actions.edit')"
                :item="item"
                :run="show"/>
            <ox-action v-else-if="user.can([item.constructor, 'view'], item)"
                icon="mdi-eye-outline" button
                :title="t('actions.edit')"
                :item="item"
                :run="show"/>
            <slot name="item.actions" :value="item" :dense="true" :button="true"/>
        </template>
    </v-data-table-server>
</template>
<style>
.align-top-table td {
  /*vertical-align: top;*/
}
</style>
<script setup lang="ts">
/**
Provide a wrapper around `v-data-table` that is used to display {@link ModelList}.

It provides:

- integrates to {@link ModelList};
- add an extra column for actions with preset ones (view/edit);
- translate headers titles;

Slots:

- item.actions[value=item, dense=true, button=true]:

  This slot is used to add actions. The attributes can be passed down to an
  OxAction instance.

- *: forwarded down to `v-data-table`

 */

import { computed, defineProps, inject, ref, useSlots } from 'vue'

import { t, tKeys } from 'ox'
// import { Permissions } from '../models'
import { filterSlots } from '../utils'
import OxAction from './OxAction.vue'

const slots = useSlots()
const itemSlots = filterSlots(slots, 'item.', {exclude: ['item.actions']})

const panel = inject('panel')
const list = inject('list')
const items = inject('items')
const user = inject('user')

const props = defineProps({
    // list: Object,
    /** Table headers */
    headers: Array,
    /** If True, allow user to edit (display edit button) */
    edit: Boolean,
})


const headers = computed(() => {
    return props.headers.reduce((dst, field) => {
        dst.push(
            (typeof(field) == 'string') ?
            {key: field, title: t(tKeys.field(field))} :
            {key: field.key, title: t(field.title) }
        )
        return dst
    }, [])
})


function updateOptions(event) {
    list.filters.page = event.page,
    list.filters.page_size = event.itemsPerPage,
    list.filters.ordering = event.sortBy.map(({key, order}) => order == 'asc' ? key : `-${key}`)
}

function show(user, item) {
    panel.show({view: 'detail.edit', value: item})
}
</script>
