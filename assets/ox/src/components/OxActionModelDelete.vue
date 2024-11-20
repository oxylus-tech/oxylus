<template>
    <ox-action
        :item="props.item" :button="props.button"
        icon="mdi-delete" color="error"
        :title="t('actions.delete')" :confirm="t('actions.delete.confirm')"
        :permissions="['delete', (u, o) => o.id]"
        :run="run" @completed="panel?.reset('')"
    />
</template>
<script setup lang="ts">
import { defineProps, inject } from 'vue'
import { useI18n } from 'vue-i18n'

import { makeModelApiAction } from '../composables/actions'
import OxAction from './OxAction.vue'

const { t } = useI18n()
const panel = inject('panel')
const repos = inject('repos')

const props = defineProps<{
    item: Object
    button?: boolean
}>()

const run = makeModelApiAction({
    repo: repos[props.item.constructor.entity],
    method: 'delete',
    options: (user, item) => ({delete: props.item.id}),
})
</script>
