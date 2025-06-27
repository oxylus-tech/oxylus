<template>
    <v-data-table-server
            :items="props.items" item-index="id"
            :items-length="props.list.count || props.items.length"
            :items-per-page="props.list.page_size"
            :hide-default-footer="(props.list.count || props.items.length || 0) < props.list.page_size"
            :loading="props.list.state?.isProcessing"
            :headers="headers"
            :no-data-text="t('lists.empty')"
            class="align-top-table"
            @update:options="updateOptions">
        <template v-if="slots['item.image']" #item.image="{item}">
            <slot name="item.image" :item="item">
                <v-img v-if="item[props.image]" :src="item[props.image]" class="preview" cover max-height="200"/>
            </slot>
        </template>

        <template v-for="(_, name) in itemSlots" :key="name" v-slot:[name]="bind">
            <slot :name="name" v-bind="bind"/>
        </template>

        <template #item.actions="{item}">
            <ox-action-edit button :item="item" :edit="props.edit"/>
            <slot name="item.actions" :item="item" :dense="true" :button="true"/>
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

import { computed, defineProps, inject, ref, toRefs, useSlots } from 'vue'

import { t, tKeys } from 'ox'
// import { Permissions } from '../models'
import { filterSlots } from '../utils'
import OxAction from './OxAction'
import OxActionEdit from './OxActionEdit'

const slots = useSlots()
const itemSlots = filterSlots(slots, 'item.', {exclude: ['item.actions', 'item.image']})

const panel = inject('panel')
const user = inject('user')

const props = defineProps({
    /** ModelList used to display objects **/
    list: Object,
    /** List items (cf. {@link useModelList}) **/
    items: Array,
    /** Table headers **/
    headers: Array,
    /** If True, display edit/view button **/
    edit: Boolean,
    /** If provided, use this item field as image **/
    image: String,
})

const headers = computed(() => {
    const items = [];
    if(props.image || slots['item.image'])
        items.push({'key': 'image', title:''})

    return items.concat(
        props.headers.reduce((dst, field) => {
            dst.push(
                (typeof(field) == 'string') ?
                {key: field, title: t(tKeys.field(field))} :
                {key: field.key, title: t(field.title) }
            )
            return dst
        }, [])
    )
})

function updateOptions(event) {
    const params = {
        ...props.list.filters,
        page: event.page,
        page_size: event.itemsPerPage,
        ordering: event.sortBy.map(({key, order}) => order == 'asc' ? key : `-${key}`)
    }
    props.list.page_size = event.itemsPerPage
    props.list.load({params})
}

</script>
