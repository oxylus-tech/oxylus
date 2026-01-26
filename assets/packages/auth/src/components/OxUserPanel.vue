<template>
    <ox-model-panel v-bind="props" :repo="repos.users" :repos="repos">
        <template v-for="name in forwardSlots" :key="name" #[name]="bind">
            <slot :name="name" v-bind="bind"/>
        </template>

        <template #list.filters="{list,filters}">
            <v-select class="ml-3" density="compact"
                v-model="filters.groups__id__in" multiple
                :label="t(models.Group, 2)"
                :items="groups" item-title="$title" item-value="id"
                hide-details />

            <slot name="list.filters" :list="list" :filters="filters"/>
        </template>

        <template #item.groups="{item}" v-if="!slots['item.groups']">
             <v-chip color="primary" v-for="group of item.$groups" variant="tonal" class="mr-2">
                 {{ group.name }}
             </v-chip>
        </template>

        <template #views.edit.default="{value, saved}">
            <ox-user-edit :initial="value" :saved="saved" :full="true"/>
        </template>

        <template #views.create.default="{value, saved}">
            <ox-user-edit :saved="saved" :full="true"/>
        </template>
    </ox-model-panel>
</template>
<script setup lang="ts">
import { computed, defineProps, useSlots, withDefaults } from 'vue'

import { useModels, query, models, t } from '@oxylus/ox'
import {OxModelPanel} from '@oxylus/ox/components'
import type {ModelPanelDefinition} from '@oxylus/ox'

import {useAuthModels} from '../composables'
import OxUserEdit from './OxUserEdit.vue'

const slots = useSlots()
const forwardSlots = Object.keys(slots).filter(x => !(['list.filters', 'item.groups'].includes(x)))

const repos = useAuthModels()
query(repos.groups).all()

const groups = computed(() => repos.groups.all())
/*
const kanbanHeaders = computed(() => {
    return [
        {title: 'Without group', value: null},
        ...groups.value.map((group) => ({title: group.name, value: group.id}))
    ]
})
*/

const props = withDefaults(defineProps<ModelPanelDefinition>(), {
    name: 'users',
    relations: ['$groups'],
    headers: ['username', 'email', 'first_name', 'last_name', 'groups'],
})
</script>
