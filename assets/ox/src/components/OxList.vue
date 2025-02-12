<template>
    <slot name="default" :list="list" :value="value"/>
</template>
<script setup lang="ts">
import { defineProps, defineExpose, inject, toRefs } from 'vue'

import type {IListProps} from '../composables/list'
import {useList} from 'ox'

const props = defineProps<IListProps>()
const repos = inject('repos')
const panel = inject('panel')
const {value} = toRefs(panel)
const list = useList({...props, value, repos})

defineExpose({list, value})
</script>
