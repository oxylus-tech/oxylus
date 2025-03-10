<template>
    <v-data-table-server
            :items="list.items" item-index="id" :items-length="list.count || list.items.length"
            :loading="list.state?.isProcessing"
            :headers="headers"
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
import { computed, defineProps, inject, useSlots } from 'vue'

import { useI18n, tKeys } from 'ox'
import { Permissions } from '../models'
import { filterSlots } from '../utils'
import OxAction from './OxAction.vue'

const { t } = useI18n()
const slots = useSlots()
const itemSlots = filterSlots(slots, 'item.', {exclude: ['item.actions']})

const panel = inject('panel')
const list = inject('list')
const permissions = new Permissions('change')
const props = defineProps({
    // list: Object,
    headers: Array,
    edit: Boolean,
})


const headers = computed(() => {
    return props.headers.reduce((dst, field) => {
        dst.push(
            (typeof(field) == 'string') ?
            {key: field, title: t(tKeys.field(field))} : field
        )
        return dst
    }, [])
})


function updateOptions(event) {
    return list.fetch({
        filters: {
            "page": event.page,
            "page_size": event.itemsPerPage,
            "ordering": event.sortBy.map(({key, order}) => order == 'asc' ? key : `-${key}`)
        }
    })
}

function runEdit(user, item) {
    panel.show({view: 'detail.edit', value: item})
}
</script>
