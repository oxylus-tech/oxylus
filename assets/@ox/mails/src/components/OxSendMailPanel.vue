<template>
    <ox-owned-panel v-bind="props" :repo="repos.sendMails" icon="mdi-email-arrow-right">
        <template #item.state="{item}">
            <v-chip :color="colors[item.state]">{{ SendMail.State.toString(item.state) }}</v-chip>
        </template>

        <template #item.template="{item}">
            {{ item.$template?.name }}
        </template>

        <template #item.actions="bind">
            <ox-action-post v-bind="bind"
                icon="mdi-send" :title="t('actions.mails.send')"
                path="send" :repo="repos.sendMails"
                :confirm="getConfirm(bind.item)"
                permission="ox_mails.change_sendmail"
                />
            <slot name="item.actions" v-bind="bind"/>
        </template>

        <template #views.detail.edit.default="{value, owner, saved}">
            <ox-send-mail-edit :owner="owner?.id" :initial="value" :saved="saved"/>
        </template>

        <template v-for="slot in forwardSlots" :key="name" #[name]="bind">
            <slot :name="slot" v-bind="bind"/>
        </template>
    </ox-owned-panel>
</template>
<script setup lang="ts">
import { useSlots, withDefaults } from 'vue'

import { t, filterSlots } from 'ox'
import type {IModelPanelProps} from 'ox'
import {OxActionPost} from 'ox/components'
import {OxOwnedPanel} from '@ox/auth/components'

import OxSendMailEdit from './OxSendMailEdit'
import {SendMail} from '../models'
import {useMailModels} from '../composables'

const slots = useSlots()
const forwardSlots = filterSlots(slots, null, {exclude: ['item.actions']})

const repos = useMailModels()
const props = withDefaults(defineProps<IModelPanelProps>(), {
    name: 'sendmails',
    relations: ['$template'],
    headers: ['state', 'subject', 'updated'],
})

const State = SendMail.State
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
