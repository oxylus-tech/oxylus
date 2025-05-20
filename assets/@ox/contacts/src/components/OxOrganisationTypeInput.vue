<template>
    <ox-autocomplete :repo="repos.organisationTypes"
        item-value="id" item-title="name"
        lookup="search" :filters="{country__uuid: props.country}"
        :custom-filter="customFilter"
        v-model="value" v-bind="props"
        >
        <template #selection="{ item, index }">
            {{ item.raw.name }}
            <span class="ml-2">{{ item.raw.abbreviation }}</span>
        </template>
        <template #item="{ props: itemProps, item }">
            <v-list-item v-bind="itemProps">
                <template #append>
                    <span class="ml-2">{{ item.raw.abbreviation }} </span>
                </template>
            </v-list-item>
        </template>

        <template v-for="_, slot in slots" #[slot]="bind">
            <slot :name="slot" v-bind="bind"/>
        </template>
    </ox-autocomplete>
</template>
<script setup lang="ts">
import {useSlots, defineModel, defineProps} from 'vue'
import {query, useModels} from 'ox'
import {OxAutocomplete} from 'ox/components'
import {OrganisationType} from '../models'

const slots = useSlots()
const props = defineProps({
    label: String,
    name: String,
    multiple: Boolean,
    hideDetails: Boolean,
    density: String,
    country: String,
    disabled: Boolean,
    rules: Array,
})
const value = defineModel()

const repos = useModels([OrganisationType])

function customFilter(title, text, item) {
    text = text.toUpperCase()
    return item.raw.name.toUpperCase().indexOf(text) != -1 ||
        item.raw.abbreviation.toUpperCase().indexOf(text) != -1
}
</script>
