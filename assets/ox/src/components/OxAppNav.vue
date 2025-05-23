<template>
    <v-navigation-drawer v-model="drawer" theme="dark">
        <slot name="prepend"/>
        <v-list v-model:opened="opened" density="compact">
            <template v-for="(item,i) in items" :key="i">
                <ox-app-nav-item v-bind="item"/>
            </template>
        </v-list>
        <template #append>
            <v-list><slot name="append"/></v-list>
        </template>
    </v-navigation-drawer>
</template>
<script setup>
import { computed, defineModel, defineProps, defineEmits, inject, onMounted, ref, watch } from 'vue'

import OxAppNavItem from './OxAppNavItem'

const context = inject('context')
const panels = inject('panels')
const drawer = defineModel('drawer')
const opened = ref([])

const props = defineProps({
    items: Array
})

const items = computed(() => props.items)


function getOpened(items) {
    if(panels.panel)
        for(const item of items) {
            if(item.items) {
                const val = getOpened(item.items)
                if(val)
                    return [val, item.value]
            }
            else if(item.value == panels.panel)
                return [item.value]
        }
}

function updateOpened() {
    opened.value = getOpened(items.value)
}


onMounted(updateOpened)
watch(items, updateOpened)
watch(() => panels.panel, updateOpened)
</script>
