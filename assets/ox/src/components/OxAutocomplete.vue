<template>
    <input type="hidden" v-if="props.name" :name="props.name" :value="value"/>
    <v-autocomplete v-bind="attrs"
        :items="items" :loading="state.isProcessing"
        v-model="value"
        v-model:search="search"
        >
        <template v-for="_, slot in slots" #[slot]="bind">
            <slot :name="slot" v-bind="bind"/>
        </template>
    </v-autocomplete>
</template>
<script setup lang="ts">
import { isEqual, debounce, unionBy } from 'lodash'
import { defineModel, inject, reactive, ref, onMounted, toRaw, useAttrs, useSlots, watch } from 'vue'
import type {Repository} from 'pinia-orm'
import { VAutocomplete } from 'vuetify/components/VAutocomplete'

import { useQuery } from 'ox'
import type {IModelList, State} from 'ox'

const slots = useSlots()
const value = defineModel()
const item = ref(null)
const search = ref("")

interface IAutoCompleteProps {
    /** Model's repository */
    repo: Repository
    /** Search lookup */
    lookup: string
    /** Field name */
    name: string
    /** Search filters */
    filters: Object
}


const props = withDefaults(defineProps<IAutoCompleteProps>(), {
    lookup: 'search',
})
const attrs = useAttrs()
const repos = inject('repos')

// list props are not expected to change, only `filters`
const {state, query, fetch} = useQuery(props.repo, repos, {save: false})
const items = reactive([])


var lastId = null
async function getItem(id) {
    if(id) {
        const idx = items.findIndex((v) => v.id == id)
        console.log(id, idx)
        if(idx != -1)
            item.value = items[idx]
        else if(lastId != id) {
            console.log('fetch item...')
            lastId = id
            const resp = await fetch({id: id})
            const value = resp.entities[0]
            if(value.id == id) {
                items.splice(0, 0, value)
                item.value = value
            }
            else
                item.value = null
        }
    }
    else
        item.value = null
    return item
}


let lastSearch = null
const load = debounce(async ({reset=false}={}) => {
    // Using debounce is tricky: it delays calling function
    // This means:
    // - we need to fetch the actual search value when function is run
    // - we are delayed between search/filters update
    //
    // - we provides reset to:
    //   - force loading even if search is the same as last one
    //   - reset search (v-autocomplete resets search.value when items is updated.
    if(state.isProcessing)
        return

    const q = search.value != '<empty string>' && search.value || ''
    if(!reset && q == lastSearch)
        return
    lastSearch = q

    const filters = {...props.filters, page_size: 20}
    filters[props.lookup] = q
    let resp = await fetch({params: filters})

    items.splice(0, items.length, ...resp.entities)

    if(!reset) {
        item.value = null

        console.log('item...', item.value, value.value)
        // When item is not provided we ensure it is here
        await getItem(value.value)
        search.value = q
    }
}, 500)


/** Called when filters are updated */
function filtersUpdated(filters) {
    //const listFilters = {...toRaw(list.filters)}
    //delete listFilters[props.lookup]

    //if(!isEqual(toRaw(listFilters), toRaw(filters)))
    load({reset: true})
}

/** Called when search is updated */
function searchUpdated(val) {
    // v-autocomplete set search to "<empty string>"
    // when items are updated, search is reset
    if(val != '<empty string>' && val != lastSearch)
        load({q: val})
}


// --- Watchers
onMounted(() => {
    load() // ?.then(() => getItem(value.value))
})

watch(() => props.filters, (val, old) => {
    if(!isEqual(toRaw(val), toRaw(old)))
        filtersUpdated(val)
})
watch(search, searchUpdated)
watch(value, (val, old) => val != old && getItem(val))
</script>
