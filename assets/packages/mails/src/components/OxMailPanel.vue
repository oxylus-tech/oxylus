<template>
    <ox-owned-panel v-bind="props" :repo="repos.mails">
        <template #item.state="{item}">
            <v-chip :color="colors[item.state]">{{ Mail.State.toString(item.state) }}</v-chip>
        </template>

        <template #item.actions="bind">
            <ox-action-post v-if="!bind.item.is_template" v-bind="bind"
                icon="mdi-send" :title="t('actions.mails.send')"
                path="send" :repo="repos.mails"
                :confirm="getConfirm(bind.item)"
                permission="ox_mails.change_mail"
                />
            <slot name="item.actions" v-bind="bind"/>
        </template>

        <template #views.detail.edit.default="{value, owner, saved}">
            <ox-mail-edit :owner="owner?.id" :initial="value" :saved="saved"/>
        </template>

        <template v-for="slot in forwardSlots" :key="name" #[name]="bind">
            <slot :name="slot" v-bind="bind"/>
        </template>
    </ox-owned-panel>
</template>
<script setup lang="ts">
/**
 * @component Model panel for mail.
 */
import { useSlots, withDefaults } from 'vue'

import { t, filterSlots } from '@oxylus/ox'
import type {IModelPanelProps} from '@oxylus/ox'
import {OxActionPost} from '@oxylus/ox/components'
import {OxOwnedPanel} from '@oxylus/auth/components'

import OxMailEdit from './OxMailEdit.vue'
import {Mail} from '../models'
import {useMailModels} from '../composables'

const slots = useSlots()
const forwardSlots = filterSlots(slots, null, {exclude: ['item.actions']})

const repos = useMailModels()
const props = withDefaults(defineProps<IModelPanelProps>(), {
    name: 'mails',
    headers: ['subject', 'state', 'updated'],
})

const State = Mail.State
const colors = {
    [State.DRAFT]: 'info',
    [State.SENDING]: 'warning',
    [State.SENT]: 'success',
    [State.ERROR]: 'error',
}

function getConfirm(item) {
    if(item.state != State.DRAFT && item.state != State.ERROR)
        return t('actions.mails.send.confirm')
}
</script>
