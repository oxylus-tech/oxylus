<template>
    <template v-if="shouldShow(props)">
        <template v-if="props.type == 'group'">
            <v-list-group :value="props.name">
                <template #activator="{props:itemProps}">
                    <v-list-item v-bind="itemProps"
                        :title="props.title" :prepend-icon="props.icon" />
                </template>

                <template v-for="(sub, i) in props.items" :key="i">
                    <ox-app-nav-item v-bind="sub"
                        :type="sub.type == 'group' ? 'subheader' : sub.type" />
                </template>
            </v-list-group>
        </template>
        <template v-else-if="props.type == 'subheader'">
            <v-list-subheader>{{ props.title }}</v-list-subheader>
            <template v-if="props.items">
                <ox-app-nav-item v-for="item of props.items"
                    v-bind="item" />
            </template>
        </template>
        <v-list-item v-else
            :active="panels.panel == props.name"
            :value="props.name"
            :prepend-icon="props.icon" :title="props.title"
            @click.stop="show"/>
    </template>
</template>
<script setup lang="ts">
import { computed, defineProps, inject, ref } from 'vue'
import type {IPanelInfo} from '../controllers'

interface INavItemProps extends IPanelInfo {
    /** Panel name */
    name: string
    /** Panels page **/
    url?: string
    /** Required permission */
    permission?: string|string[]
    /** Item type: subheader, divider, (item by default) */
    type?: string,
    /** Nested items */
    items?: Record<string, INavItemProps>[]
}

const props = defineProps<INavItemProps>()

const isOpen = ref(null)
const user = inject('user')
const panels = inject('panels')
const visible = computed(() => !props.auto || panel.name == props.name)

function shouldShow(item) {
    if(item.permission && !user.can(item.permission))
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
