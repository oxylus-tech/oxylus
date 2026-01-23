<template>
    <v-navigation-drawer v-model="drawer" theme="dark">
        <!-- @slot At the top of the list -->
        <slot name="prepend"/>
        <v-list v-model:opened="opened" density="compact">
            <template v-for="(item,i) in items" :key="i">
                <ox-app-nav-item v-bind="item"/>
            </template>
        </v-list>
        <template #append>
            <v-list>
                <!-- @slot After the list (inside another `v-list`) -->
                <slot name="append"/>
            </v-list>
        </template>
    </v-navigation-drawer>
</template>
<script setup>
/**
 * @component A navigation sidebar using `v-navigation-drawer`, based on a
 * provided list of navigation items.
 *
 * Each item is provided as properties to an {@link OxAppNavItem}.
 *
 * Required injections: `panels`.
 */
import { computed, defineModel, inject, ref } from 'vue'

import {useRouter} from '@oxylus/ox'
import OxAppNavItem from './OxAppNavItem.vue'

const router = useRouter()
/** @model drawer - This controls wether the panel is opened or not. */
const drawer = defineModel('drawer')
const opened = ref([])

const props = defineProps({
    /** The list of items */
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
    if(router.location.panel)
        for(const item of items) {
            if(item.items) {
                const val = getOpened(item.items)
                if(val)
                    return [val, item.name]
            }
            else if(item.name == router.location.panel)
                return [item.name]
        }
}


</script>
