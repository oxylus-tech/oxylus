<template>
    <ox-owned-panel v-bind="props" :repo="repos.mailAccounts" icon="mdi-email-lock">
        <template v-for="name in forwardSlots" :key="name" #[name]="bind">
            <slot :name="name" v-bind="bind"/>
        </template>

        <template #list.filters="{list,filters, owner}">
            <slot name="list.filters" :list="list" :filters="filters"/>
        </template>

        <template #views.detail.edit.default="{value, saved, list}">
            <ox-mail-account-edit :initial="value" :saved="saved"
                :owner="list?.filters?.owner__uuid"/>
        </template>
    </ox-owned-panel>
</template>
<style scoped>
.preview {
    max-width: 200px;
}
</style>
<script setup lang="ts">
import { useSlots, withDefaults } from 'vue'

import { t } from 'ox'
import type {IModelPanelProps} from 'ox'
import {OxOwnedPanel} from '@ox/auth/components'

import OxMailAccountEdit from './OxMailAccountEdit'
import {useMailModels} from '../composables'

const slots = useSlots()
const forwardSlots = Object.keys(slots).filter(x => !(['list.filters'].includes(x)))

const repos = useMailModels()
const props = withDefaults(defineProps<IModelPanelProps>(), {
    name: 'mailaccounts',
    headers: ['name'],
})
</script>
