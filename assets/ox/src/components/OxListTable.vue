<template>
    <v-data-table-server
            :items="props.list.items" item-index="id" :items-length="props.list.count || props.list.items.length"
            :loading="props.list.state?.isProcessing"
            :headers="props.headers"
            @update:options="updateOptions">
        <template v-slot:loading>
            <v-skeleton-loader type="table-row@10"></v-skeleton-loader>
        </template>

        <template v-for="(_, name) in itemSlots" :key="name" v-slot:[name]="bind">
            <slot :name="name" v-bind="bind"/>
        </template>

        <template #item.actions="{item}">
            <ox-action v-if="edit"
                icon="mdi-pencil" button
                :title="t('actions.edit')"
                :permissions="permissions"
                :item="item"
                :run="runEdit"/>
            <slot name="item.actions" :value="item" :dense="true" :button="true"/>
        </template>
    </v-data-table-server>
</template>
<script setup lang="ts">
import { defineProps, inject, useSlots } from 'vue'
import { useI18n } from 'vue-i18n'

import OxAction from './OxAction.vue'
import { Permissions } from '../models'
import { filterSlots } from '../utils'

const { t } = useI18n()
const slots = useSlots()
const itemSlots = filterSlots(slots, 'item.', {exclude: ['item.actions']})

const panel = inject('panel')
const permissions = new Permissions('change')
const props = defineProps({
    list: Object,
    headers: Array,
    edit: Boolean,
})


function updateOptions(event) {
    return props.list.fetch({
        filters: {
            "page": event.page,
            "page_size": event.itemsPerPage,
            "ordering": event.sortBy.map(({key, order}) => order == 'asc' ? key : `-${key}`)
        }
    })
}

function runEdit(user, item) {
    panel.reset('.edit', item)
}
</script>
