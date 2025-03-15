<template>
    <ox-action
        :item="props.item" :button="props.button"
        icon="mdi-delete" color="error"
        :title="t('actions.delete')" :confirm="t('actions.delete.confirm')"
        :permissions="['delete', (u, o) => o.id]"
        :run="run" @completed="panel?.show({view:panel.index})"
    />
</template>
<script setup lang="ts">
import { defineProps, inject } from 'vue'
import { t } from 'ox'

import OxAction from './OxAction.vue'

const panel = inject('panel')
const repos = inject('repos')

const props = defineProps<{
    item: Object
    button?: boolean
}>()

async function run(user, item) {
    const repo = repos[item.constructor.entity]
    return await repo.api().delete(item.$url(), {delete: props.item.id})
}
</script>
