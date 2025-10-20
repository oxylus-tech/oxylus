<template>
    <ox-autocomplete ref="input" :repo="repos.contacts"
        item-value="id" item-title="name"
        lookup="search" v-model="value" v-bind="attrs"
        >
        <template #selection="{ item }">
            <ox-contact-name :item="item.raw"/>
        </template>

        <template #item="{ props, item }">
            <v-list-item v-bind="props">
                <template #prepend>
                    <v-icon :color="item.raw.organisation?.color">
                        {{ item.raw.person ? "mdi-card-account-details": "mdi-domain" }}
                    </v-icon>
                </template>
            </v-list-item>
        </template>

        <template v-for="_, slot in slots" #[slot]="bind">
            <slot :name="slot" v-bind="bind"/>
        </template>
    </ox-autocomplete>
</template>
<script setup lang="ts">
import {defineExpose, ref, useAttrs, useSlots, defineModel} from 'vue'
import {useModels} from '@oxylus/ox'
import {OxAutocomplete} from '@oxylus/ox/components'
import {Contact} from '../models'
import OxContactName from './OxContactName.vue'

const slots = useSlots()
const attrs = useAttrs()
const value = defineModel()
const repos = useModels([Contact])
const input = ref(null)

defineExpose({
    get selected() { return input.value?.selected }
})
</script>
