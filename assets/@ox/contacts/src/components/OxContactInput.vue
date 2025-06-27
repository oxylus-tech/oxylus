<template>
    <ox-autocomplete :repo="repos.contacts"
        item-value="id" item-title="name"
        lookup="search" v-model="value" v-bind="attrs"
        >
        <template #selection="{ item }">
            <v-chip v-if="item.raw.person" prepend-icon="mdi-card-account-details" color="info">
                {{ item.raw.name }}
            </v-chip>
            <v-chip v-else prepend-icon="mdi-domain" :color="item.raw.organisation.color || 'info'">
                {{ item.raw.name }}
            </v-chip>
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
import {useAttrs, useSlots, defineModel} from 'vue'
import {useModels} from 'ox'
import {OxAutocomplete} from 'ox/components'
import {Contact} from '../models'

const slots = useSlots()
const attrs = useAttrs()
const value = defineModel()
const repos = useModels([Contact])
</script>
