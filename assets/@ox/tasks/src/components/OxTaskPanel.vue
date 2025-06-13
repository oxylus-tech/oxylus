<template>
    <ox-model-panel ref="modelPanel" v-bind="props" :repo="repos.tasks" icon="mdi-cog-clockwise"
            :warning="t('alerts.danger_zone_system_data')">
        <template v-for="(_, name) in slots" :key="name" #[name]="bind">
            <slot :name="name" v-bind="bind"/>
        </template>

        <template #item.status="{item}">
            <v-chip :color="colors[item.status]">{{ item.status }}</v-chip>
        </template>

        <template #item.date="{item}">
            <v-chip :title="t('fields.enqueued_at')" color="info">{{ item.enqueued_at }}</v-chip><br>
            <v-chip :title="t('fields.started_at')" color="warning">{{ item.started_at }}</v-chip><br>
            <v-chip :title="t('fields.finished_at')" color="success">{{ item.finished_at }}</v-chip><br>
        </template>

        <template #item.return_value="{item}">
            <p class="mb-3">
                <b>{{ t('fields.args_kwargs') }}</b><br>
                <code>{{ item.args_kwargs }}</code>
            </p>
            <p v-if="item.return_value">
                <b>{{ t('fields.return_value') }}</b><br>
                <code>{{ item.return_value }}</code>
            </p>
        </template>
    </ox-model-panel>
</template>
<script setup lang="ts">
import { ref, useSlots, withDefaults } from 'vue'

import { t } from 'ox'
import {OxModelPanel} from 'ox/components'
import type {IModelPanelProps} from 'ox'

import {useTasksModels} from '../composables'

const slots = useSlots()
const repos = useTasksModels()
const modelPanel = ref(null)

const props = withDefaults(defineProps<IModelPanelProps>(), {
    name: 'tasks',
    headers: ['status', 'queue_name', 'task_path', 'priority', 'date', 'return_value'],
})


const colors = {
    'SUCCEEDED': 'success',
    'FAILED': 'error',
    'STARTED': 'warning',
    'NEW': 'info',
}



function refresh(timeout) {
    window.setTimeout(() => {
        modelPanel.value?.list.load()
        refresh(timeout)
    }, timeout)
}

// onMounted(() => refresh(1000))
</script>
