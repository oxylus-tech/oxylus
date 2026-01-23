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
/**
 * @component An action button to view or edit the related
 * item, depending on the user's permissions. It uses `detail.edit` by default.
 *
 * Required injections: `panel`, and `user`.
 *
 * Attributes bound to inner {@link OxAction}.
 */
import { defineProps, inject, useAttrs, withDefaults } from 'vue'
import { t, usePanel } from '@oxylus/ox'
import type { Model } from '@oxylus/ox/models'

import OxAction from './OxAction.vue'

const {router, panel} = usePanel()
const user = inject('user')

const attrs = useAttrs()
const props = withDefaults(defineProps<{
    /**
     * The related model instance to edit/view.
     */
    item: Model
    /**
     * Show edit button if user has permissions.
     */
    edit: boolean
    /**
     * View to display
     */
    view: string
}>(), { view: "edit" })

function show(user, item) {
    router.go({view: props.view, value: item.id})
}
</script>
