<template>
    <template v-if="tabs && Object.keys(tabs).length">
        <v-tabs v-model="tab">
            <slot name="tab" v-if="slots.default">
                <v-tab :text="props?.title" value="default"/>
            </slot>
            <template v-for="(value, name) in tabs">
                <v-tab :value="value">
                    <slot :name="name"/>
                </v-tab>
            </template>
        </v-tabs>
        <v-tabs-window v-model="tab">
            <v-tabs-window-item value="default" v-if="slots.default">
                <slot name="default"/>
            </v-tabs-window-item>
            <template v-for="(value, name) in windows">
                <v-tabs-window-item :value="value">
                    <slot :name="name"/>
                </v-tabs-window-item>
            </template>
        </v-tabs-window>
    </template>
    <template v-else>
        <slot name="default"/>
    </template>
</template>
<script setup lang="ts">
/**
 * This represent a single view inside a Panel.
 *
 * A view can have multiple windows, in such case it is displayed using tabs.
 * Tabs are hidden when there is only one window slot in it.
 *
 * The default slots are `default` (for the content) and `tab.default` (for the tab).
 * Other slots can be named following the convention: `window.[name]` and `tab.[name]`.
 */
import { ref, defineProps, onMounted, useSlots } from 'vue'
import { filterSlots } from 'ox'

const props = defineProps({
    /** default tab title */
    title: String,
})

/** Current tab/window value */
const tab = ref(null)

const slots = useSlots()
const tabs = filterSlots(slots, "tab.", {exclude: "tab.default"})
const windows = filterSlots(slots, "window.")
</script>
