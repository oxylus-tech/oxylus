<template>
    <v-list-item v-if="visible"
        :active="panel.name == props.name"
        :prepend-icon="props.icon" :title="props.title"
        @click.stop="panel.show({path: props.path ?? props.name })"/>
</template>
<script setup lang="ts">
import { computed, defineProps, inject, defineExpose } from 'vue'
import type {IPanelNavProps} from '../composables'

const props = defineProps<IPanelNavProps>()
const panel = inject('panel')
const visible = computed(() => !props.auto || panel.name == props.name)

const title = computed(() => {
    const postfix = panel.name == props.name && panel.edited ? "*" : ""
    return props.title + postfix
})

defineExpose({title, name: props.name})
</script>
