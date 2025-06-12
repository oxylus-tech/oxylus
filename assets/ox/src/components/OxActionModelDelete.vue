<template>
    <ox-action v-bind="attrs" :item="props.item"
        icon="mdi-delete" color="error"
        :title="t('actions.delete')" :confirm="t('actions.delete.confirm')"
        :permission="[props.item.constructor , 'delete']"
        :run="run" @completed="panel?.show({view:panel.index})"
    />
</template>
<script setup lang="ts">
import { defineProps, inject, useAttrs } from 'vue'
import { t } from 'ox'

import OxAction from './OxAction.vue'

const panel = inject('panel')
const repos = inject('repos')

const attrs = useAttrs()
const props = defineProps<{
    item: Object
}>()

async function run(user, item) {
    const repo = repos[item.constructor.entity]
    return await repo.api().delete(item.$url(), {delete: props.item.id})
}
</script>
