<template>
    <v-window-item :value="view.name">
        <template v-if="view.sections?.size > 1">
            <v-tabs v-model="router.location.section">
                <template v-for="section in view.sections.values()" :key="section.name">
                    <v-tab :value="section.name" :text="section.title" />
                </template>
            </v-tabs>
            <v-tabs-window v-model="router.location.section">
                <slot name="default" v-bind="infos" :view="view" />
            </v-tabs-window>
        </template>
        <template v-else>
            <slot name="default" v-bind="infos" :view="view" />
        </template>
    </v-window-item>
</template>
<script setup lang="ts">
/**
 * @component This represent a single view inside a Panel.
 *
 * A view can have multiple windows, in such case it is displayed using tabs.
 * Tabs are hidden when there is only one window slot in it.
 *
 * The default slots are `default` (for the content) and `tab.default` (for the tab).
 * Other slots can be named following the convention: `window.[name]` and `tab.[name]`.
 */
import { ref, useSlots } from 'vue'
import { useView, type ViewDefinition } from '../composables/router'

const slots = useSlots()
const props = defineProps<ViewDefinition>()
const {router, view, ...infos} = useView(props)

/** Current tab/window value */
const tab = ref(null)
</script>
