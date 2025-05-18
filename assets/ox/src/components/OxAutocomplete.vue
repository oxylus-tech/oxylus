<template>
    {{ slots }}
    <v-autocomplete v-bind="selectProps" :items="items"
        v-model="value" v-model:search="search"
        >
        <template v-for="slot in slots" #[slot]="bind">
            <slot :name="slot" v-bind="bind"/>
        </template>
    </v-autocomplete>
</template>
<script setup lang="ts">
console.log('SETUP')
import { computed, defineProps, defineModel, inject, ref, useSlots, watch } from 'vue'
import type {Repository} from 'pinia-orm'

import { useModelList, query, filterValues, excludeValues } from 'ox'
import type {IModelList} from 'ox'

const slots = useSlots()
const value = defineModel()
const search = ref("")

interface IAutoCompleteProps extends IModelList {
    /** Model's repository */
    repo: Repository
    /** Search lookup */
    lookup: string

    label: string
    name: string
    multiple: boolean
    hideDetails: boolean
    density: string
    itemTitle: string
    itemValue: string
}

const props = withDefaults(defineProps<IAutoCompleteProps>(), {
    lookup: 'search',
})
const repos = inject('repos')

const selectPropsKeys = ['label', 'name', 'multiple', 'hideDetails', 'density', 'itemTitle', 'itemValue']
const selectProps = computed(() => filterValues(props, selectPropsKeys))

const {list, items} = useModelList({
    ...excludeValues(props, ['repo', 'search', ...selectPropsKeys]),
    filters: props.filters || {},
    query: query(props.repo, repos),
})
list.load()

watch(search, (value) => {
    // for some reason, v-autocomplete set search to "<empty string>"
    // when items are updated, search is reset
    const filter = list.filters[props.lookup]
    const hasNext = list.nextUrl

    const valueIsOk = value && value != '<empty string>' && value != filter
    const shouldLoad = valueIsOk && (
        !filter || !filter.startsWith(value) || !list.nextUrl
    )

    if(shouldLoad) {
        list.filters[props.lookup] = value
        list.load().then(x => { search.value = value})
    }
})
</script>
