<template>
    <v-select v-model="value"
        :items="countries"
        item-value="id" item-title="name"
        @update:modelValue="emits('update:modelValue', $event)"
        v-bind="props">

        <template v-slot:selection="{ item, index }">
            <span class="mr-2">{{ item.raw.flag }}</span>
            {{ item.raw.name }}
        </template>
        <template v-slot:item="{ props: itemProps, item }">
            <v-list-item v-bind="itemProps">
                <template #prepend>
                    <span class="mr-2">{{ item.raw.flag }} </span>
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

const repos = inject('repos')
const countries = computed(() => repos.countries.all())

if(!countries.value?.length)
    query(repos.countries).all()
</script>
