<template>
    <ox-model-panel v-bind="props" :repo="repos.organisations">
        <template v-for="name in forwardSlots" :key="name" #[name]="bind">
            <slot :name="name" v-bind="bind"/>
        </template>

        <template #list.filters="{list,filters}">
            <ox-country-input v-model="filters.country__uuid__in"
                class="ml-2"
                :label="t('fields.country')" density="compact"
                hide-details/>
            <slot name="list.filters" :list="list" :filters="filters"/>
        </template>

        <template #item.country="{item}" v-if="!slots['item.country']">
            {{ item.$country?.flag }} {{ item.$country?.name }}
        </template>

        <template #item.name="{item}" v-if="!slots['item.color']">
            <v-icon :color="item.color">mdi-domain</v-icon>
            {{ item.name }}
        </template>

        <template #item.email="{item}" v-if="!slots['item.email']">
            <v-btn :href="`mailto:${item.email}`" size='x-small'
                prepend-icon="mdi-mail" color="secondary">
                {{ item.email }}
            </v-btn>
            <template v-for="email of item.emails">
                <v-btn :href="`mailto:${email.email}`" size='x-small'
                    prepend-icon="mdi-mail" color="secondary">
                    {{ email.email }}
                </v-btn>
            </template>
        </template>

        <template #item.phone="{item}" v-if="!slots['item.phone']">
            <template v-for="phone of item.phones">
                <v-btn :href="`tel:${phone.number}`" size='x-small'
                    prepend-icon="mdi-phone" color="secondary">
                    {{ phone.number }}
                </v-btn>
            </template>
        </template>

        <template #views.detail.edit.default="{value, saved}">
            <ox-organisation-edit :initial="value" :saved="saved"/>
        </template>
    </ox-model-panel>
</template>
<script setup lang="ts">
import { computed, defineProps, useSlots, withDefaults } from 'vue'

import { query, t } from '@oxylus/ox'
import {OxModelPanel} from '@oxylus/ox/components'
import type {IModelPanelProps} from '@oxylus/ox'
import {OxCountryInput} from '@oxylus/locations/components'

import {useContactModels} from '../composables'
import OxOrganisationEdit from './OxOrganisationEdit.vue'

const slots = useSlots()
const forwardSlots = Object.keys(slots).filter(x => !(['list.filters', 'item.groups'].includes(x)))

const repos = useContactModels()
query(repos.organisations).all({dataKey: 'results'})

const organisations = computed(() => repos.organisations.all())

const props = withDefaults(defineProps<IModelPanelProps>(), {
    name: 'organisations',
    relations: ['$country'],
    fetchRelations: true,
    headers: ['name', 'email', 'vat', 'phone', 'country'],
})
</script>
