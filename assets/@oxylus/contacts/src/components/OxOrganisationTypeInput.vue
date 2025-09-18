<template>
    <ox-autocomplete :repo="repos.organisationTypes"
        item-value="id" item-title="name"
        lookup="search" :filters="{country__uuid: props.country}"
        :custom-filter="customFilter"
        v-model="value" v-bind="attrs"
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
import {useAttrs, useSlots, defineModel} from 'vue'
import {useModels} from '@oxylus/ox'
import {OxAutocomplete} from '@oxylus/ox/components'
import {OrganisationType} from '../models'

const slots = useSlots()
const props = defineProps({
    country: String
})
const attrs = useAttrs()
const value = defineModel()

const repos = useModels([OrganisationType])

function customFilter(title, text, item) {
    text = text.toUpperCase()
    if(!item.raw.name) {
        console.log(item.raw)
    }
    return item.raw.name.toUpperCase().indexOf(text) != -1 ||
        item.raw.abbreviation.toUpperCase().indexOf(text) != -1
}
</script>
