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
import { computed, defineModel, inject, ref } from 'vue'

import OxAppNavItem from './OxAppNavItem'

const context = inject('context')
const panels = inject('panels')
const drawer = defineModel('drawer')
const opened = ref([])

const props = defineProps({
    items: Array
})

const items = computed(() => {
    updateOpened(props.items)
    return props.items
})

/** Update opened items */
function updateOpened(items) {
    opened.value = getOpened(items)
}

/** Get opened menu items */
function getOpened(items) {
    if(panels.panel)
        for(const item of items) {
            if(item.items) {
                const val = getOpened(item.items)
                if(val)
                    return [val, item.name]
            }
            else if(item.name == panels.panel)
                return [item.name]
        }
}


</script>
