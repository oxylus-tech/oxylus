<template>
    <v-tabs-window v-model="target.panel">
        <template v-for="(slot, name) in slots" :key="name">
            <v-tabs-window-item :name="name" @group:selected="target.reset({panel: name})">
                <slot :name="name"></slot>
            </v-tabs-window-item>
        </template>
    </v-tabs-window>
</template>
<script lang="ts">
import {defineProps, inject, useSlots} from 'vue'

import {panels} from 'ox'
import type {ITarget} from '../panels/target'

const slots = useSlots()
const props = defineProps<ITarget>()
const target = inject('panels') || panels.useTarget(props)
</script>
