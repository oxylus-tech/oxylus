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
            <!-- @slot If provided, use this as preview of the item. Defaults to an `v-img` with source set to `props.image`.
                 @binding {Model} item current item -->
            <slot name="item.image" :item="item">
                <v-img v-if="item[props.image]" :src="item[props.image]" class="preview" cover max-height="200"/>
            </slot>
        </template>

        <template v-for="(_, name) in itemSlots" :key="name" v-slot:[name]="bind">
            <!-- @slot Slots prefixed with `item.` are passed down to inner `v-data-table-server`.
                 @binding {Model} item current item
                -->
            <slot :name="name" v-bind="bind"/>
        </template>

        <template #item.actions="{item}">
            <ox-action-edit button :item="item" :edit="props.edit"/>
            <!-- @slot Action column of a row. It can be used to add extra actions to the list.
                 @binding {Model} item the item we're talking about.
                 @binding {=true} dense used for {@link OxAction}.
                 @binding {=true} button used for {@link OxAction}.
                 -->
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
 * @component Provide a wrapper around `v-data-table` that is used to display {@link ModelList}.
 *
 * It takes a list of items managed by a {@link ModelList} as properties. The ModelList is used
 * to update/fetch items (eg. pagination).
 *
 * It also adds an extra column for actions with preset ones (view/edit).
 *
 * ## Columns
 *
 * Columns are described using the `headers` property. This property follows the format of
 * `v-data-table-server` with extra features. A column can be specified as:
 *
 * - a string: this is the field name of an item. In such case, the component looks up for
 *   a translation (following Oxylus conventions).
 * - an object as `{key: "fieldName", title: "Column Title"}`
 *
 * A column can be customized using a slot with the name of the field prefixed with `item.`, such
 * as `item.myField`.
 */

import { computed, defineProps, ref, toRefs, useSlots } from 'vue'

import { t, tKeys } from '@oxylus/ox'
// import { Permissions } from '../models'
import { filterSlots } from '../utils'
import OxAction from './OxAction.vue'
import OxActionEdit from './OxActionEdit.vue'

const slots = useSlots()
const itemSlots = filterSlots(slots, 'item.', {exclude: ['item.actions', 'item.image']})

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
