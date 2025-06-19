<template>
    <ox-owned-panel v-bind="props" :repo="repos.mailTemplates" icon="mdi-email-edit">
        <template v-for="_, name in slots" :key="name" #[name]="bind">
            <slot :name="name" v-bind="bind"/>
        </template>

        <template #views.detail.edit.default="{value, owner, saved}">
            <ox-mail-template-edit :owner="owner?.id" :initial="value" :saved="saved"/>
        </template>
    </ox-owned-panel>
</template>
<script setup lang="ts">
import { useSlots, withDefaults } from 'vue'

import { t } from 'ox'
import type {IModelPanelProps} from 'ox'
import {OxOwnedPanel} from '@ox/auth/components'

import OxMailTemplateEdit from './OxMailTemplateEdit'
import {useMailModels} from '../composables'

const slots = useSlots()

const repos = useMailModels()
const props = withDefaults(defineProps<IModelPanelProps>(), {
    name: 'mailtemplates',
    relations: [],
    headers: ['name', 'subject', 'created', 'updated'],
})
</script>
