<template>
    <v-autocomplete v-bind="attrs"
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
import { debounce } from 'lodash'
import { isEqual } from 'lodash'
import { defineModel, inject, ref, onMounted, toRaw, useAttrs, useSlots, watch } from 'vue'
import type {Repository} from 'pinia-orm'
import { VAutocomplete } from 'vuetify/components/VAutocomplete'

import { useModelList, query, splitValues, filterValues, excludeValues } from 'ox'
import type {IModelList} from 'ox'

const slots = useSlots()
const value = defineModel()
const item = ref(null)
const search = ref("")

interface IAutoCompleteProps extends IModelList {
    /** Model's repository */
    repo: Repository
    /** Search lookup */
    lookup: string
}


const props = withDefaults(defineProps<IAutoCompleteProps>(), {
    lookup: 'search',
})
const attrs = useAttrs()
const repos = inject('repos')

// list props are not expected to change, only `filters`
const listProps = excludeValues(props, ['repo', 'search'])
const {list, items} = useModelList({
        ...listProps.value?.[1],
        filters: props.filters || {},
        save: false,
        query: query(props.repo, repos),
})


var lastId = null
async function getItem(id) {
    if(id) {
        const idx = list.findIndex(id)
        if(idx != -1)
            item.value = list.items[idx]
        else if(lastId != id) {
            lastId = id
            const resp = await list.load({id: id, append: 0})
            const value = resp.entities[0]
            item.value = value.id == id ? value : null
        }
    }
    else
        item.value = null
    return item
}

const load = debounce(
    async () => {
        const resp = await list.load()
        item.value && list.add(item.value)
        return resp
    },
    200
)


/** Called when filters are updated */
function filtersUpdated(filters) {
    filters[props.lookup] = search.value
    if(!isEqual(toRaw(list.filters), toRaw(filters))) {
        list.filters = {...props.filters}
        list.filters[props.lookup] = search.value
        load()
    }
}

/** Called when search is updated */
function searchUpdated(val) {
    // v-autocomplete set search to "<empty string>"
    // when items are updated, search is reset
    const filter = list.filters[props.lookup]
    if(val && val != '<empty string>' && val != filter) {
        list.filters[props.lookup] = val
        load().then(x => {
            getItem(value.value)
            search.value = val
        })
    }
}


// --- Watchers
onMounted(() => {
    if(props.filters && Object.values(props.filters).length)
        filtersUpdated(props.filters)
    else
        list.load()
    getItem(value.value)
})

watch(() => props.filters, (val) => filtersUpdated(val))
watch(search, searchUpdated)
watch(value, (val, old) => val != old && getItem(val))
</script>
