<template>
    <ox-action v-if="panel?.repos" v-bind="attrs" :item="props.item"
        icon="mdi-delete" color="error"
        :title="t('actions.delete')" :confirm="t('actions.delete.confirm')"
        :permission="[props.item.constructor , 'delete']"
        :run="run" @completed="panel?.show({view:panel.index})"
    />
</template>
<script setup lang="ts">
/**
 * @component An action button used to delete the provided item.
 *
 * Required injections: `panel`, `repos` and `user`.
 *
 * Attributes bound to inner {@link OxAction}.
 */
import { defineProps, inject, useAttrs } from 'vue'
import { t, usePanel } from '@oxylus/ox'
import type { Model } from '@oxylus/ox/models'

import OxAction from './OxAction.vue'

const {router, panel} = usePanel()

const attrs = useAttrs()
const props = defineProps<{
    /** The object to delete. */
    item: Model
}>()

async function run(user, item) {
    const repo = panel?.repos[item.constructor.entity]
    return await repo.api().delete(item.$url(), {delete: props.item.id})
}
</script>
