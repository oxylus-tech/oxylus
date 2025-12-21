<template>
    <node-view-wrapper :class="['tiptap-block-node', inline && 'inline']"
            :as="inline ? 'span' : 'div'">
        <template v-if="!inline">
            <header class="tiptap-block-label">
                <v-icon>{{ block.icon }}</v-icon>
                <b class="ml-1">{{ attrs.label || attrs.variable }}</b>
                <span> : {{ block.label }}</span>
            </header>
            <node-view-content class="tiptap-block-content" />
        </template>
        <v-chip v-else :prepend-icon="block.icon"
                :color="props.selected ? 'secondary' : 'primary'">
            {{ attrs.label || attrs.variable }}
        </v-chip>
    </node-view-wrapper>
</template>
<script setup lang="ts">
import {computed} from 'vue'
import { NodeViewWrapper, NodeViewContent } from '@tiptap/vue-3'

const props = defineProps({
    node: {type: Object, required: true},
    extension: {type: Object, required: true},
    selected: {type: Boolean},
})

const attrs = computed(() => props.node.attrs)
const inline = computed(() => props.extension.config.inline)
const block = computed(() => props.extension.options.block)
</script>
