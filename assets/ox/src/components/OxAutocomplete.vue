<template>
    <v-autocomplete v-bind="fieldProps"
        :items="items" :loading="list.state.isProcessing"
        v-model="value"
        v-model:search="search"
        >
        <template v-for="_, slot in slots" #[slot]="bind">
            <slot :name="slot" v-bind="bind"/>
        </template>
    </v-autocomplete>
</template>
<script setup lang="ts">
import { isEqual } from 'lodash'
import { computed, defineProps, defineModel, inject, ref, onMounted, toRaw, useSlots, watch } from 'vue'
import type {Repository} from 'pinia-orm'
import { VAutocomplete } from 'vuetify/components/VAutocomplete'

import { useModelList, query, splitValues, filterValues, excludeValues } from 'ox'
import type {IModelList} from 'ox'

const slots = useSlots()
const value = defineModel()
const search = ref("")

interface IAutoCompleteProps extends IModelList {
    /** Model's repository */
    repo: Repository
    /** Search lookup */
    lookup: string

    /** v-autocomplete parameters */
    label: string
    name: string
    disabled: boolean
    multiple: boolean
    hideDetails: boolean
    density: string
    itemTitle: string
    itemValue: string
    customFilter: (itemTitle: string, queryText: string, item: any) =>  boolean
}

const props = withDefaults(defineProps<IAutoCompleteProps>(), {
    lookup: 'search',
})
const repos = inject('repos')

const $props = computed(() => splitValues(props, VAutocomplete.props))
const fieldProps = computed(() => $props.value[0])

// list props are not expected to change, only `filters`
const listProps = excludeValues($props.value[1], ['repo', 'search'])
const {list, items} = useModelList({
        ...listProps.value?.[1],
        filters: props.filters || {},
        save: false,
        query: query(props.repo, repos),
})


function filtersUpdated(filters) {
    filters[props.lookup] = search.value
    if(!isEqual(list.filters, filters)) {
        list.filters = {...props.filters}
        list.filters[props.lookup] = search.value
        list.load()
    }
}

function searchUpdated(value) {
    // v-autocomplete set search to "<empty string>"
    // when items are updated, search is reset
    const filter = list.filters[props.lookup]
    const hasNext = list.nextUrl
    if(value && value != '<empty string>' && value != filter) {
        list.filters[props.lookup] = value
        list.load().then(x => { search.value = value })
    }
}

var lastId = null
function ensureItem(id) {
    if(!id || list.findIndex(id) != -1)
        return

    if(list.findIndex(id) == -1 && lastId != id) {
        lastId = id
        list.load({id: id, append: 0})
    }
}

// --- Watchers
onMounted(() => {
    if(props.filters && Object.values(props.filters).length)
        filtersUpdated(props.filters)
    else
        list.load()
    ensureItem(value.value)
})

watch(() => props.filters, (val) => filtersUpdated(val))
watch(search, searchUpdated)
watch(value, (val, old) => val != old && ensureItem(val))
</script>
