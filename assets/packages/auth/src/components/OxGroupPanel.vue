<template>
    <ox-model-panel v-bind="props" :repo="repos.groups" :repos="repos">
        <template v-for="(_, name) in slots" :key="name" #[name]="bind">
            <slot :name="name" v-bind="bind"></slot>
        </template>

        <template #views.edit.default="{value, saved}">
            <ox-group-edit :initial="value" :saved="saved"/>
        </template>

        <!-- <template #view.edit.sections>
            <ox-section name="members" :title="t('label.members')">
                <ox-group-users :group="value"/>
            </ox-section>
        </template> -->

        <template #views.create.default="{saved}">
            <ox-group-edit :saved="saved"/>
        </template>
    </ox-model-panel>
</template>
<script setup lang="ts">
import { defineProps, useSlots, withDefaults } from 'vue'

import type {ModelPanelDefinition} from '@oxylus/ox'

import { OxModelPanel, OxSection } from '@oxylus/ox/components'
import { useAuthModels } from '../composables'
import OxGroupEdit from './OxGroupEdit.vue'
import OxGroupUsers from './OxGroupUsers.vue'

const slots = useSlots()

const repos = useAuthModels()
const props = withDefaults(defineProps<ModelPanelDefinition>(), {
    headers: ['name'],
})
</script>
