<template>
    <input type="hidden" v-if="props.name" :name="props.name" :value="value"/>
    <v-autocomplete v-bind="attrs"
        :items="items" :loading="state.isProcessing"
        v-model="value"
        v-model:search="search"
        >
        <template v-for="_, slot in slots" #[slot]="bind">
            <!-- @slot All slots are passed down to `v-autocomplete`. -->
            <slot :name="slot" v-bind="bind"/>
        </template>

        <template #item="slotProps" v-if="slots['item']">
            <slot name="item" v-bind="slotProps" />
        </template>

        <template #selection="slotProps" v-if="slots['selection']">
            <slot name="selection" v-bind="slotProps" />
        </template>
    </v-autocomplete>
</template>
<script setup lang="ts">
/**
 * @component Autocompletion field, fetching model's data from the provided server.
 *
 * It is a wrapper around `v-autocomplete` which items are model instance.
 * It also has an hidden `<input>` field which allows it to be used with forms.
 *
 * Items are not saved on the repository in order to keep it clean and avoid to flood
 * memory.
 */
import { debounce, unionBy } from 'lodash'

import type { Reactive, Ref } from 'vue'
import { defineExpose, defineModel, inject, reactive, ref, onMounted, useAttrs, useSlots, watch } from 'vue'
import type {Repository} from 'pinia-orm'
import { VAutocomplete } from 'vuetify/components/VAutocomplete'

import { useQuery, ifNotEqualFn } from '@oxylus/ox'
import type {IModelList, State} from '@oxylus/ox'
import type {Model, ModelId} from '@oxylus/ox/models'

const slots = useSlots()

/** Model value **/
const value: Ref<ModelId|ModelId[]> = defineModel()
/** Search string **/
const search: Ref<string> = ref("")


interface IAutoCompleteProps {
    /** Model's repository */
    repo: Repository
    /** GET parameter for passing the search lookup. */
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

/** List of items **/
const items: Reactive<Model[]> = reactive([])
/** Selected items **/
const selected: Ref<Model[]> = ref([])


/** Get items by id, fetching missing ones */
async function getItems(ids: ModelId|ModelId[]) {
    const missingIds = ids && getMissing(ids)
    if(missingIds?.length) {
        const resp = await fetch({id: missingIds})
        items.splice(0, 0, ...resp.entities)
    }

    updateSelected(ids)
}

/** From the provided list of ids, returns thoses not present in the list */
function getMissing(ids: ModelId|ModelId[]): ModelId[]|null {
    if(!Array.isArray(ids))
        return items.findIndex((v) => v.id == ids) == -1 ? [ids] : null

    const itemIds = new Set(items.map(item => item.id))
    return ids.filter(id => !itemIds.has(id))
}

/** Update selection based on provided list of items. */
function updateSelected(ids: ModelId|ModelId[]) {
    if(Array.isArray(ids))
        selected.value = items.filter(v => ids.includes(v.id))
    else if(ids)
        selected.value = [items.find(v => v.id == ids)]
    else
        selected.value = []
}


let lastSearch = null

/**
 * Load the list of items from the server based on search value.
 * Avoids to reload if the search is the same a the previous one.
 *
 * @param {boolean} reset - force loading event despite search did not changed.
 */
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

    const entities = selected.value ?
        unionBy(resp.entities, selected.value, (v) => v.id) :
        resp.entities

    items.splice(0, items.length, ...entities)

    if(!reset) {
        // When item is not provided we ensure it is here
        // value.value && await getItems(value.value)
        search.value = q
    }
}, 500)



// --- Watchers
onMounted(async () => {
    await load()
    value.value && await getItems(value.value)
})

watch(() => props.filters, ifNotEqualFn(() => load({reset: true})))
watch(search, val => {
    // v-autocomplete set search to "<empty string>"
    // when items are updated, search is reset
    if(val != '<empty string>' && val != lastSearch)
        load({q: val})
})
watch(value, (val, old) => {
    val != old && updateSelected(val)
})


defineExpose({
    /** Selected models ids. */
    value,
    /** Selected items. */
    selected,
    /** Load list of items. */
    load,
    /** All fetched items (displayed in the selection list). */
    items
})
</script>
