<template>
    <ox-owned-panel v-bind="props" :repo="props.repo || repos.mails">
        <template #item.state="{item}">
            <v-chip :color="colors[item.state]">{{ BaseMail.State.toString(item.state) }}</v-chip>
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

        <template #views.edit.default="bind">
            <slot name="views.edit.default" v-bind="bind">
                <ox-mail-edit :owner="bind.owner?.id" :initial="bind.value" :saved="bind.saved"/>
            </slot>
        </template>

        <template #views.create.default="bind">
            <slot name="views.create" v-bind="bind">
                <ox-mail-edit :owner="bind.owner?.id" :initial="bind.value" :saved="bind.saved"/>
            </slot>
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
import { useSlots, withDefaults, useAttrs } from 'vue'

import { t, filterSlots } from '@oxylus/ox'
import type {ModelPanelDefinition} from '@oxylus/ox'
import {OxActionPost} from '@oxylus/ox/components'
import {OxOwnedPanel} from '@oxylus/auth/components'

import OxMailEdit from './OxMailEdit.vue'
import {BaseMail} from '../models'
import {useMailModels} from '../composables'

const slots = useSlots()
const forwardSlots = filterSlots(slots, null, {exclude: ['item.actions', 'views.detail.edit.default']})

const repos = useMailModels()
const props = withDefaults(defineProps<ModelPanelDefinition>(), {
    name: 'mails',
    headers: ['subject', 'state', 'updated'],
})
const attrs = useAttrs()

const State = BaseMail.State
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
