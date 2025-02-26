<template>
    <slot name="default" :query="query"/>
</template>
<script setup lang="ts">
import {inject, defineProps} from 'vue'

import type {IQueryProps} from "../composables"
import {useQuery} from "ox"

const props = defineProps<IQueryProps>()
const repos = inject('repos')
const query = useQuery({repo: props.repo, repos})
</script>
