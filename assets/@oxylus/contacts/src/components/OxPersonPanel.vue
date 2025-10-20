<template>
    <ox-model-panel v-bind="props" :repo="repos.persons">
        <template v-for="name in forwardSlots" :key="name" #[name]="bind">
            <slot :name="name" v-bind="bind"/>
        </template>

        <template #list.filters="{list,filters}">
            <v-select class="ml-3" density="compact"
                v-model="filters.organisations__uuid__in"
                :label="t('models.organisations')"
                :items="organisations" item-title="$title" item-value="id"
                hide-details />
            <slot name="list.filters" :list="list" :filters="filters"/>
        </template>

        <template #item.organisations="{item}" v-if="!slots['item.organisations']">
            <template v-for="organisation of item.$organisations">
                 <v-chip size="small" :color="organisation.color ?? 'primary'" variant="tonal" class="mr-2">
                     {{ organisation.name }}
                 </v-chip>
             </template>
        </template>

        <template #item.email="{item}" v-if="!slots['item.emails']">
            <template v-if="item.email">
                <v-btn :href="`mailto:${item.email}`" size='x-small'
                    prepend-icon="mdi-mail" color="secondary">
                    {{ item.email }}
                </v-btn>
                <br/>
            </template>
            <template v-for="email of item.emails">
                <v-btn :href="`mailto:${email.email}`" size='x-small'
                    prepend-icon="mdi-mail" color="secondary">
                    {{ email.email }}
                </v-btn>
                <br/>
            </template>
        </template>

        <template #item.phone="{item}" v-if="!slots['item.phones']">
            <template v-for="phone of item.phones">
                <v-btn :href="`tel:${phone.number}`" size='x-small'
                    prepend-icon="mdi-phone" color="secondary">
                    {{ phone.number }}
                </v-btn>
                <br/>
            </template>
        </template>

        <template #views.detail.edit.default="{value, saved}">
            <ox-person-edit :initial="value" :saved="saved"/>
        </template>
    </ox-model-panel>
</template>
<script setup lang="ts">
import { computed, defineProps, inject, useSlots, withDefaults } from 'vue'

import { query, t } from '@oxylus/ox'
import {OxModelPanel} from '@oxylus/ox/components'
import type {IModelPanelProps} from '@oxylus/ox'

import {useContactModels} from '../composables'
import OxPersonEdit from './OxPersonEdit.vue'

const context = inject('context')
const slots = useSlots()
const forwardSlots = Object.keys(slots).filter(x => !(['list.filters', 'item.groups'].includes(x)))

const repos = useContactModels()

// required for filters
query(repos.organisations).all()

const organisations = computed(() => repos.organisations.all())

const props = withDefaults(defineProps<IModelPanelProps>(), {
    name: 'persons',
    relations: ['$organisations'],
    headers: ['first_name', 'last_name', 'email', 'phone', 'organisations'],
})
</script>
