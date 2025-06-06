<template>
    <template v-if="allowed">
        <v-btn v-if="props.button" variant="text"
            :disabled="processing"
            :color="props.color" :icon="props.icon"
            :title="props.title" :aria-label="props.title"
            @click.stop="run">
        </v-btn>
        <v-list-item v-else
            :title="props.title" :base-color="props.color" :prepend-icon="props.icon"
            :disabled="processing"
            @click.stop="run"/>
    </template>
</template>
<script setup lang="ts">
import {computed, defineProps, defineEmits, inject, toRefs} from 'vue'
import {useAction} from 'ox'

import type {IPermission, Model} from 'ox'
import type {ActionRun, ActionCompleted} from 'ox'
import type {IActionProps} from '../composables/actions'

const props = defineProps<IActionProps>()

const emits = defineEmits<{
    completed: ActionCompleted
}>()
const user = inject('user')
const {run, processing, allowed} = useAction({user: user, emits, props})
</script>
