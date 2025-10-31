<template>
    <template v-if="allowed">
        <v-btn v-if="props.button" variant="text" v-bind="attrs"
            :disabled="processing"
            :color="props.color" :icon="props.icon"
            :title="props.title" :aria-label="props.title"
            @click.stop="run">
        </v-btn>
        <v-list-item v-else v-bind="attrs"
            :title="props.title" :base-color="props.color" :prepend-icon="props.icon"
            :disabled="processing"
            @click.stop="run"/>
    </template>
</template>
<script setup lang="ts">
/**
 * @component A button that aims to execute an action that can be related to
 * an item.
 *
 * It provides permissions checks and user confirmation. A function can be provided
 * as well as an URL. The action can be rendered as a `v-btn` or `v-list-item`.
 *
 * This is the base component used for most actions to execute in user interfaces.
 *
 * Required injections: `user`
 */
import {computed, defineProps, defineEmits, inject, useAttrs} from 'vue'
import {useAction} from '@oxylus/ox'

import type {IActionProps, ActionCompleted} from '../composables/actions'

const props = defineProps<IActionProps>()
const attrs = useAttrs()

const emits = defineEmits<{
    /**
     * Callback when an action has been completed.
     *
     * @param {User} user - user running the action.
     * @param {Model|null} item - item on which the action was run.
     * @param {any} result - result of the action (return value of the called function).
     */
    completed: ActionCompleted
}>()
const user = inject('user')
const {run, processing, allowed} = useAction({user: user, emits, props})
</script>
