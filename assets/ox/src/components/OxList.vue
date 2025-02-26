<template>
    <slot name="default" :list="list" :value="value"/>
</template>
<script setup lang="ts">
import { defineProps, defineExpose, inject, toRefs } from 'vue'

import type {IListProps} from '../composables/list'
import {useList} from 'ox'

const props = defineProps<IListProps>()
const query = inject('query')
const panels = inject('panels')
const {value} = toRefs(panels)
const list = useList({...props, query, value})

defineExpose({list, value})
</script>
