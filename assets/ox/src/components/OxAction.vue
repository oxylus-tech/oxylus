<template>
    <template v-if="action.allowed">
        <v-btn v-if="props.button" variant="text"
            :color="props.color" :icon="props.icon"
            :title="props.title" :aria-label="props.title"
            @click.stop="run">
        </v-btn>
        <v-list-item v-else
            :title="props.title" :base-color="props.color" :prepend-icon="props.icon"
            @click.stop="run"/>
    </template>
</template>
<script setup lang="ts">
import {computed, defineProps, defineEmits, inject, toRefs} from 'vue'
import {useAction} from 'ox'

import type {IPermission, Model} from 'ox'
import type {ActionRun, ActionCompleted} from 'ox'
import type {ActionProps} from '../composables/actions'

const props = defineProps<ActionProps>()

const emits = defineEmits<{
    completed: ActionCompleted
}>()
const context = inject('context')
const action = useAction({user: context.user, emits}, props)

async function run(...args) {
    await action.run(...args)
}
</script>
