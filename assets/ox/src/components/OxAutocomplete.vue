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
import { debounce, throttle } from 'lodash'
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

    const q = search.value != '<empty string>' && search.value || ''
    if(!reset && q == lastSearch)
        return
    lastSearch = q

    list.filters = {...props.filters}
    list.filters[props.lookup] = q
    console.log(list.filters)

    let resp = await list.load()

    // Ensure item is in the list
    if(item.value)
        list.add(item.value, 0)

    if(!reset) {
        // When item is not provided we ensure it is here
        !item.value && await getItem(value.value)
        if(!search.value || search.value == '<empty string>')
            search.value = q
    }
    return resp
}, 300)


/** Called when filters are updated */
function filtersUpdated(filters) {
    if(!isEqual(toRaw(list.filters), toRaw(filters)))
        load({reset: true})
}

/** Called when search is updated */
function searchUpdated(val) {
    // v-autocomplete set search to "<empty string>"
    // when items are updated, search is reset
    if(val != '<empty string>' && val != lastSearch) {
        console.log('search updated >', `"${val}"`, lastSearch)
        load({q: val})
    }
}


// --- Watchers
onMounted(() => {
    if(props.filters && Object.values(props.filters).length)
        filtersUpdated(props.filters)
    else
        list.load()?.then(() => getItem(value.value))
})

watch(() => props.filters, (val) => filtersUpdated(val))
watch(search, searchUpdated)
watch(value, (val, old) => val != old && getItem(val))
</script>
