<template>
    <template v-if="allowed">
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
import {useAction} from '../composables'

import type {IPermission, Model} from '../models'
import type {ActionRun, ActionCompleted} from '../composables'

const props = defineProps<{
    /**
     * @property {Model} value - value or model instance.
     */
    item: Model
    /**
     * @property {String} text - text displayed to user.
     */
    title: string
    /**
     * @property {String} icon
     */
    icon: string
    /**
     * @property {String} color
     */
    color?: string
    /**
     * @property {Boolean} button - display action as a small button
     */
    button?: boolean
    /**
     * @property {String} confirm - if provided ask user for confirmation before
     * executing the action.
     */
    confirm?: string
    /**
     * @property {Array<string | Function>} permissions - required permission to run the action
     */
    permissions: IPermission
    /**
     * @property {ActionRun} run: function to call when action is executed
     */
    run: ActionRun
}>()


const emits = defineEmits<{
    completed: ActionCompleted
}>()
const context = inject('context')
const {processing, permissions, allowed, run} = useAction(props, {user: context.user, emits})
</script>
