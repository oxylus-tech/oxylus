<template>
    <slot name="before" v-bind="props"></slot>
    <slot name="default" v-bind="props"></slot>
    <slot name="after" v-bind="props"></slot>
</template>
<script setup>
import {computed, defineProps, inject, toRefs, useSlots} from 'vue'

const slots = useSlots()
const props = defineProps({
    // Action's Props
    value: Object,
    dense: {type: Boolean, default: false},
    button: {type: Boolean, default: false},
    exclude: {type: Array},
})
</script>
