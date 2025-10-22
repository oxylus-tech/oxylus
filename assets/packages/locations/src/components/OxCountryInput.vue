<template>
    <ox-autocomplete :repo="repos.countries" lookup="name__icontains"
        item-value="id" item-title="name"
        v-model="value"
        v-bind="attrs"
        >
        <template #selection="{ item }">
            <span class="mr-2">{{ item.raw.flag }}</span>
            {{ item.raw.name }}
        </template>
        <template #item="{ props, item }">
            <v-list-item v-bind="props">
                <template #prepend>
                    <span class="mr-2">{{ item.raw.flag }} </span>
                </template>
            </v-list-item>
        </template>

        <template v-for="_, slot in slots" #[slot]="bind">
            <slot :name="slot" v-bind="bind"/>
        </template>
    </ox-autocomplete>
</template>
<script setup lang="ts">
import {useAttrs, useSlots, defineModel, defineProps} from 'vue'
import {query} from '@oxylus/ox'
import {OxAutocomplete} from '@oxylus/ox/components'
import {useCountries} from '../composables'

const slots = useSlots()
const attrs = useAttrs()
const value = defineModel()
const repos = useCountries()
</script>
