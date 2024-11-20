<template>
    <v-navigation-drawer v-model="nav.drawer">
        <template v-if="">
        </template>
        <v-list density="compact" v-if="slots.default">
            <slot name="default" v-bind="bindApp"></slot>
        </v-list>
    </v-navigation-drawer>
</template>
<script setup>
import { defineModel, defineProps, defineEmits, reactive, useSlots } from 'vue'

const slots = useSlots()
const emits = defineEmits(['select'])
const value = defineModel()
const data = defineModel("data")


</script>
