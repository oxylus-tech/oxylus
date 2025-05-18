<template>
    <ox-autocomplete :repo="repos.countries" lookup="name__icontains"
        item-value="id" item-title="name"
        v-model="value"
        v-bind="props"
        >
        <template #selection="{ item, index }">
            <span class="mr-2">{{ item.raw.flag }}</span>
            {{ item.raw.name }}
        </template>
        <template #item="{ props: itemProps, item }">
            <v-list-item v-bind="itemProps">
                <template #prepend>
                    <span class="mr-2">{{ item.raw.flag }} </span>
                </template>
            </v-list-item>
        </template>

        <template v-for="slot of slots" #[slot]="bind">
            <slot :name="slot" v-bind="bind"/>
        </template>
    </ox-autocomplete>
</template>
<script setup lang="ts">
import {computed, useSlots, defineModel, defineEmits, defineProps, inject} from 'vue'
import {query} from 'ox'
import {OxAutocomplete} from 'ox/components'
import {useCountries} from '../composables'

const emits = defineEmits(["update:modelValue"])

const slots = useSlots()
const props = defineProps({
    label: String,
    name: String,
    multiple: Boolean,
    hideDetails: Boolean,
    density: String
})
const value = defineModel()

const repos = useCountries()
const items = computed(() => repos.countries.orderBy('name').all())
</script>
