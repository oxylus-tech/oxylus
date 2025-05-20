<template>
    <template v-if="props.type == 'subheader'">
        <v-list-subheader>{{ props.title }}</v-list-subheader>
        <template v-if="props.items">
            <ox-app-nav-item v-for="item of props.items"
                v-bind="item" />
        </template>
    </template>
    <template v-else-if="props.type == 'group'">
        <v-list-group v-if="!props.permissions || context.user.can(props.permissions)" :value="props.value">
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
    <v-list-item v-else-if="!props.permissions || context.user.can(props.permissions)"
        :active="panels.panel == props.value"
        :value="props.value"
        :prepend-icon="props.icon" :title="props.title"
        @click.stop="show"/>
</template>
<script setup lang="ts">
import { computed, defineProps, inject } from 'vue'
import type {IPanelNavProps} from '../controllers'

const props = defineProps<IPanelNavProps>()

const context = inject('context')
const panels = inject('panels')
const visible = computed(() => !props.auto || panel.name == props.name)

function show() {
    const vals = { panel: props.value, href: props.url }
    console.log(props, vals)
    panels.show(vals)
}
</script>
