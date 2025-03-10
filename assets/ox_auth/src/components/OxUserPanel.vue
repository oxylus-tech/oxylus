<template>
    <ox-model-panel :name="props.name"
            icon="mdi-account" :repo="repos.users"
            :headers="props.headers"
            :relations="props.relations"
            search="search">
        <template v-for="name in forwardSlots" :key="name" #[name]="bind">
            <slot :name="name" v-bind="bind"/>
        </template>

        <template #list.filters="{list,filters}">
            <v-select class="ml-3" density="compact"
                v-model="filters.groups__id__in" multiple
                label="Groups"
                :items="groups" item-title="$title" item-value="id"
                hide-details />

            <slot name="list.filters" :list="list" :filters="filters"/>
        </template>

        <template #item.groups="{item}" v-if="!slots['item.groups']">
             <v-chip color="primary" v-for="group of item.groups" variant="tonal" class="mr-2">
                 {{ group.name }}
             </v-chip>
        </template>

        <template #views.list.kanban="{panel,items,list}">
            <ox-list-kanban field="groups_id" :headers="kanbanHeaders"
                item-title="username"
                @click="(item) => panel.show({view: 'detail.edit', value: item})"/>
        </template>

        <template #views.detail.edit.window.default="{value}"
                v-if="context.user.can('auth.change_user')">
            <ox-user-edit :initial="value"/>
        </template>
    </ox-model-panel>
</template>
<script setup lang="ts">
import { computed, defineProps, inject, useSlots, withDefaults } from 'vue'

import { useModels, api, query } from 'ox'
import {OxModelPanel, OxListKanban} from 'ox/components'
import type {IModelPanelProps} from '@ox/controllers'

import {useAuthModels} from '../composables'
import OxUserEdit from './OxUserEdit.vue'

const context = inject('context')
const panels = inject('panels')
const slots = useSlots()
const forwardSlots = Object.keys(slots).filter(x => !(['list.filters', 'item.groups'].includes(x)))

const {repos, models} = useAuthModels()
query(repos.groups).all({dataKey: 'results'})

const groups = computed(() => repos.groups.all())
const kanbanHeaders = computed(() => {
    return [
        {title: 'Without group', value: null},
        ...groups.value.map((group) => ({title: group.name, value: group.id}))
    ]
})

const props = withDefaults(defineProps<IModelPanelProps>(), {
    name: 'users',
    relations: ['groups'],
    headers: ['id', 'username', 'first_name', 'last_name', 'email', 'groups'],
})
</script>
