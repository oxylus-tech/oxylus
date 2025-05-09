<template>
    <v-list-item
        :active="panels.panel == props.panel"
        :prepend-icon="props.icon" :title="props.title"
        @click.stop="panels.show(props)"/>
</template>
<script setup lang="ts">
import { computed, defineProps, inject } from 'vue'
import type {IPanelNavProps} from '../controllers'

const props = defineProps<IPanelNavProps>()

const panels = inject('panels')
const visible = computed(() => !props.auto || panel.name == props.name)
</script>
