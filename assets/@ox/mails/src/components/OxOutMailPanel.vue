<template>
    <ox-owned-panel v-bind="props" :repo="repos.outMails" icon="mdi-email-arrow-right">
        <template v-for="_, name in slots" :key="name" #[name]="bind">
            <slot :name="name" v-bind="bind"/>
        </template>

        <template #item.template="{item}">
            {{ item.$template.name }}
        </template>

        <template #item.status="{item}">
            {{ OutMail.Status.toString(item.status) }}
        </template>

        <template #item.actions="{item, ...bind}">
            <v-btn icon="mdi-send"/>
            <slot name="item.actions" v-bind="bind" :item="item"/>
        </template>

        <template #views.detail.edit.default="{value, owner, saved}">
            <ox-out-mail-edit :owner="owner?.id" :initial="value" :saved="saved"/>
        </template>
    </ox-owned-panel>
</template>
<script setup lang="ts">
import { useSlots, withDefaults } from 'vue'

import { t } from 'ox'
import type {IModelPanelProps} from 'ox'
import {OxOwnedPanel} from '@ox/auth/components'

import OxOutMailEdit from './OxOutMailEdit'
import {OutMail} from '../models'
import {useMailModels} from '../composables'

const slots = useSlots()

const repos = useMailModels()
const props = withDefaults(defineProps<IModelPanelProps>(), {
    name: 'outmails',
    relations: ['$template'],
    headers: ['template', 'subject', 'updated', 'status'],
})
</script>
