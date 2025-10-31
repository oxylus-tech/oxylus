<template>
    <v-container class="card-grid">
        <template v-for="item in props.items" :key="item.id">
            <v-card density="compact"
                :title="headers[0].key && item[headers[0].key]" :subtitle="headers[1]?.key && item[headers[1].key]">

                <template #title v-if="slots[headers[0].slot]">
                    <!-- @slot the first header will be provided as the card title.
                         @binding {Model} item current item. -->
                    <slot :name="headers[0].slot" :item="item"/>
                </template>

                <template #subtitle v-if="slots[headers[1]?.slot]">
                    <!-- @slot the second header will be provided as the card subtitle.
                         @binding {Model} item current item. -->
                    <slot :name="headers[1].slot" :item="item"/>
                </template>

                <div class="d-flex flex-no-wrap justify-space-between">
                    <div v-if="slots['item.image'] || props.image">
                        <v-avatar rounded="0" size="125">
                            <!-- @slot If provided, use this as preview of the item. Defaults to an `v-img` with source set to `props.image`.
                                 @binding {Model} item current item. -->
                            <slot name="item.image" :item="item">
                                <v-img :src="props.image"/>
                            </slot>
                        </v-avatar>
                    </div>
                    <div>
                        <v-card-item v-if="!slots['item.default'] && (headers.length > 2 || itemSlots.length)">
                            <div>
                                <template v-for="header in headers">
                                    <div v-if="!notHeaders.has(header.key)">
                                        <v-label :text="header.title + ':'" class="mr-2"/>
                                        <!-- @slot Each header will be slotted.
                                             @binding {Model} item current item. -->
                                        <slot :name="header.slot" :item="item">
                                            <template v-if="!isEmpty(item[header.key])">
                                                {{ item[header.key] }}
                                            </template>
                                        </slot>
                                    </div>
                                </template>
                            </div>
                        </v-card-item>

                        <v-card-actions>
                            <ox-action-edit button :item="item" :edit="props.edit" size="small"/>
                            <!-- @slot Action column of a row. It can be used to add extra actions to the list.
                                 @binding {Model} item the item we're talking about.
                                 @binding {=true} dense used for {@link OxAction}.
                                 @binding {=true} button used for {@link OxAction}.
                                 @binding {="small"} size used for {@link OxAction}.
                                 -->
                            <slot name="item.actions" :item="item" :button="true" size="small"/>
                        </v-card-actions>
                    </div>
                </div>
            </v-card>
        </template>
    </v-container>
</template>
<style scoped>
.card-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 16px;
}
</style>
<script setup lang="ts">
/**
 * @component Provide a list whose values are displayed in cards grid, with API
 * similar to {@link OxListTable}.
 *
 * It set title to first header, subtitle to the second if provided.
 *
 * Headers, slots and fields works similar to what {@link OxListTable} does, but
 * adapted to the rendering context of a card.
 */
import { computed, onMounted, useSlots } from 'vue'
import { isEmpty } from 'lodash'
import { filterSlots, t } from '@oxylus/ox'
import OxActionEdit from './OxActionEdit.vue'

const slots = useSlots()
// FIXME: only keep values
const itemSlots = filterSlots(slots, "item.", {exclude: ["item.actions", "item.image"]})


const props = defineProps({
    /** ModelList used to display objects */
    list: Object,
    /** List items (cf. {@link useModelList}) */
    items: Array,
    /**
     * Displayed fields, where the first value is set as title.
     * Two formats: a string (as field name), or `{key: "fieldName", title: "Field Title"}`.
     **/
    headers: Array,
    /** If True, display edit/view button */
    edit: Boolean,
    /** Field name used as image */
    image: String,
})

const headers = computed(() => {
    if(!props.headers)
        return []

    const items = []
    for(var header of props.headers) {
        header = typeof header == "string" ? {key: header, title: t('fields.' + header) } : {...header}
        header.slot = `item.${header.key}`
        items.push(header)
    }
    return items
})


const notHeaders = computed(() => new Set([
    headers.value[0].key, headers.value[1]?.key, props.image
]))

onMounted(() => !props.list.length && props.list.load())
</script>
