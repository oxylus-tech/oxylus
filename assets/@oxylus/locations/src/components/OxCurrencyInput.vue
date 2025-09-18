<template>
    <ox-autocomplete :repo="repos.currencies" lookup="name__icontains"
        item-value="id" item-title="name"
        v-model="value"
        v-bind="props"
        >
        <template v-slot:selection="{ item, index }">
            {{ item.raw.name }}
            <span class="ml-2">{{ item.code }}</span>
        </template>
        <template v-slot:item="{ props: itemProps, item }">
            <v-list-item v-bind="itemProps">
                <template #append>
                    <span class="ml-2">{{ item.raw.code }} </span>
                </template>
            </v-list-item>
        </template>

        <template v-for="slot of slots" #[slot]="bind">
            <slot :name="slot" v-bind="bind"/>
        </template>
    </ox-autocomplete>
</template>
<script setup lang="ts">
import {useSlots, defineModel, defineProps} from 'vue'
import {query} from '@oxylus/ox'
import {OxAutocomplete} from '@oxylus/ox/components'
import {useCurrencies} from '../composables'

const slots = useSlots()
const props = defineProps({
    label: String,
    name: String,
    multiple: Boolean,
    hideDetails: Boolean,
    density: String,
    rules: Array,
})
const value = defineModel()
const repos = useCurrencies()
</script>
