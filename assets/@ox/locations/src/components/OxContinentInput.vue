<template>
    <v-select v-model="value" v-bind="props"
        :placeholder="t('fields.continent')"
        :items="Country.continentItems">
        <template #item="{item, props}">
            <v-list-item v-bind="props"
                :title="t(Country.Continent.display(item.raw))"
                :value="item.raw"/>
        </template>
        <template #selection="{item}">
            {{ t(Country.Continent.display(item.value)) }}
        </template>
        <template #detail="bind">
            <slot name="detail" v-bind="bind"/>
        </template>
    </v-select>
</template>
<script setup lang="ts">
import { defineModel, defineProps, useSlots } from 'vue'
import { t } from 'ox'
import { Country } from '../models'

const value = defineModel()
const slots = useSlots()
const props = defineProps({
    density: String,
    hideDetails: Boolean,
})

</script>
