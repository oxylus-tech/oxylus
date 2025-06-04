<template>
    <template v-if="shouldShow(props)">
        <template v-if="props.type == 'subheader'">
            <v-list-subheader>{{ props.title }}</v-list-subheader>
            <template v-if="props.items">
                <ox-app-nav-item v-for="item of props.items"
                    v-bind="item" />
            </template>
        </template>
        <template v-else-if="props.type == 'group'">
            <v-list-group :value="props.name">
                <template #activator="{props:itemProps}">
                    <v-list-item v-bind="itemProps"
                        :title="props.title" :prepend-icon="props.icon" />
                </template>

                <template v-for="(sub, i) in props.items" :key="i">
                    <ox-app-nav-item v-bind="sub"/>
                </template>
            </v-list-group>
        </template>
        <v-divider v-else-if="props.type == 'divider'"/>
        <v-list-item v-else
            :active="panels.panel == props.name"
            :value="props.name"
            :prepend-icon="props.icon" :title="props.title"
            @click.stop="show"/>
    </template>
</template>
<script setup lang="ts">
import { computed, defineProps, inject, ref } from 'vue'
import type {IPanelNavProps} from '../controllers'

const props = defineProps<IPanelNavProps>()

const isOpen = ref(null)
const user = inject('user')
const panels = inject('panels')
const visible = computed(() => !props.auto || panel.name == props.name)

function shouldShow(item) {
    if(item.permissions && !user.can(item.permissions))
        return false
    if(item.items)
        return item.items.some(x => shouldShow(x))
    return true
}


function show() {
    const vals = { panel: props.name, href: props.url }
    panels.show(vals)
}
</script>
