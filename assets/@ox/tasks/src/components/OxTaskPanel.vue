<template>
    <ox-model-panel ref="modelPanel" v-bind="props" :repo="repos.tasks" icon="mdi-cog-clockwise"
            :warning="t('alerts.danger_zone_system_data')">
        <template v-for="(_, name) in slots" :key="name" #[name]="bind">
            <slot :name="name" v-bind="bind"/>
        </template>
    </ox-model-panel>
</template>
<script setup lang="ts">
import { ref, useSlots, withDefaults, onMounted } from 'vue'

import { t } from 'ox'
import {OxModelPanel} from 'ox/components'
import type {IModelPanelProps} from 'ox'

import {useTasksModels} from '../composables'

const slots = useSlots()
const repos = useTasksModels()
const modelPanel = ref(null)

const props = withDefaults(defineProps<IModelPanelProps>(), {
    name: 'tasks',
    headers: ['status', 'queue_name', 'task_path', 'priority', 'enqueued_at', 'started_at', 'finished_at', 'return_value'],
})


function refresh(timeout) {
    window.setTimeout(() => {
        modelPanel.value?.list.load()
        refresh(timeout)
    }, timeout)
}

// onMounted(() => refresh(1000))
</script>
