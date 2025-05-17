<template>
    <v-select v-model="value" :items="items"
        item-value="id" item-title="name"
        @update:modelValue="emits('update:modelValue', $event)"
        v-bind="props">

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
    </v-select>
</template>
<script setup lang="ts">
import {computed, useSlots, defineModel, defineEmits, defineProps, inject} from 'vue'
import {query} from 'ox'
import {useCurrencies} from '../composables'

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

const repos = useCurrencies()
const items = computed(() => repos.currencies.all().orderBy('name'))
</script>
