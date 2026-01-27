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
            :active="router.location.panel == props.name"
            :value="props.name"
            :prepend-icon="props.icon" :title="props.title"
            @click.stop="show"/>
    </template>
</template>
<script setup lang="ts">
/**
 * @component An navigation item used by {@link OxAppNav}.
 *
 * There are three type of items:
 * - `item`: a single simple item, represented by a `v-list-item`.
 * - `subheader`: a group of items with a `v-list-subheader` on the top.
 * - `group`: a group of items collapsable under a `v-list-group`.
 *
 * For `subheader` and `group`, it will used provided (nested) items.
 *
 * Note that those values are actually those provided by Django applications'
 * `panels` module.
 *
 *
 * Required injections: `user`, `router`.
 */
import { computed, defineProps, inject, ref } from 'vue'
import { useRouter } from '@oxylus/ox'

export interface INavItemProps {
    /** Panel name **/
    name: string
    /** Title **/
    title?: string
    /** Panels page **/
    url?: string
    /** Required permission */
    permission?: string|string[]
    /** Item type: subheader, divider, (item by default) */
    type?: string,
    /** Nested items */
    items?: Record<string, INavItemProps>[]
    // Unused but avoids warnings
    order: number
}

const props = defineProps<INavItemProps>()

const isOpen = ref(null)
const user = inject('user')
const router = useRouter()
const visible = computed(() => !props.auto || router.location.panel == props.name)

function shouldShow(item) {
    if(item.permission && !user.can(item.permission))
        return false
    if(item.items)
        return item.items.some(x => shouldShow(x))
    return true
}


/** Show this panel */
function show() {
    const vals = { panel: props.name, href: props.url, view: null }
    router.go(vals)
}
</script>
