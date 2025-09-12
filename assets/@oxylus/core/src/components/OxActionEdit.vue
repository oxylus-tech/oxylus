<template>
    <ox-action v-if="props.edit && user.can([item.constructor, 'change'], item)"
        v-bind="attrs" icon="mdi-pencil"
        :title="t('actions.edit')"
        :item="item"
        :run="show"/>
    <ox-action v-else-if="props.edit && user.can([item.constructor, 'view'], item)"
        v-bind="attrs" icon="mdi-eye-outline"
        :title="t('actions.view')"
        :item="item"
        :run="show"/>
</template>
<script setup lang="ts">
import { defineProps, inject, useAttrs } from 'vue'
import { t } from '@oxylus/core'

import OxAction from './OxAction.vue'

const panel = inject('panel')
const repos = inject('repos')
const user = inject('user')

const attrs = useAttrs()
const props = defineProps<{
    item: Object
    edit: Boolean
}>()

function show(user, item) {
    panel.show({view: 'detail.edit', value: item})
}
</script>
