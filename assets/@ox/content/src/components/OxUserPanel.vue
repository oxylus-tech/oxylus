<template>
    <ox-model-panel v-bind="props" :repo="repos.users" icon="mdi-account">
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

        <template #views.detail.edit.default="{value, saved}">
            <ox-user-edit :initial="value" :saved="saved" :full="true"/>
        </template>
    </ox-model-panel>
</template>
<script setup lang="ts">
import { computed, defineProps, useSlots, withDefaults } from 'vue'

import { useModels, query } from 'ox'
import {OxModelPanel} from 'ox/components'
import type {IModelPanelProps} from 'ox'

import {useAuthModels} from '../composables'
import OxUserEdit from './OxUserEdit.vue'

const slots = useSlots()
const forwardSlots = Object.keys(slots).filter(x => !(['list.filters', 'item.groups'].includes(x)))

const repos = useAuthModels()
query(repos.groups).all()

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
