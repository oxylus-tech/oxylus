<template>
    <ox-panel :name="props.name" :title="modelPanel.title" :icon="modelPanel.icon"
            :state="list.state">
        <template #append-title>
            <slot name="append-title" v-bind="bind"/>

            <template v-if="target.view.startsWith('list.')">
                <v-btn-group class="ml-3" color="secondary"
                        density="compact" variant="tonal">
                    <slot name="nav.list" v-bind="bind"/>
                    <v-btn v-if="filters"
                        :title="showFilters ? t('filters.hide') : t('filters.show')"
                        :aria-label="showFilters ? t('filters.hide') : t('filters.show')"
                        @click="showFilters = !showFilters" :active="showFilters">
                        <v-icon :icon="filters.icon"/>
                    </v-btn>
                </v-btn-group>
            </template>
            <template v-else-if="target.view.startsWith('detail.') && target.value?.id">
                <v-btn-group class="ml-3" color="secondary" density="compact" variant="tonal">
                    <slot name="nav.detail" v-bind="bind"/>

                    <template v-if="target.view == 'detail.edit' && target.value">
                        <v-menu>
                            <template #activator="{props}">
                                <v-btn prepend-icon="mdi-dots-vertical" v-bind="props">
                                    {{ t('actions') }}
                                </v-btn>
                            </template>
                            <v-list>
                                <slot name="item.actions" :value="target.value"/>
                            </v-list>
                        </v-menu>
                    </template>

                    <v-btn :disabled="!list.prev"
                            :title="t('prev')" :aria-label="t('prev')"
                            @click.stop="target.value = list.prev">
                        <v-icon icon="mdi-chevron-left"/>
                    </v-btn>
                    <v-btn :disabled="!list.next"
                            :title="t('next')" :aria-label="t('next')"
                            @click.stop="target.value = list.next">
                        <v-icon icon="mdi-chevron-right"/>
                    </v-btn>
                </v-btn-group>
            </template>

            <v-btn-toggle class="ml-3" color="secondary" v-model="target.view" density="compact" variant="tonal">
                <!-- TODO: permission check -->
                <v-btn value="list.table"
                        :title="t('panels.nav.table')"
                        :aria-label="t('panels.nav.table')">
                    <v-icon>mdi-table</v-icon>
                </v-btn>
                <v-btn value="list.cards" v-if="slots['views.list.cards']"
                        :title="t('panels.nav.cards')"
                        :aria-label="t('panels.nav.cards')">
                    <v-icon>mdi-card-account-details</v-icon>
                </v-btn>
                <v-btn value="list.kanban" v-if="slots['views.list.kanban']"
                        :title="t('panels.nav.kanban')"
                        :aria-label="t('panels.nav.kanban')">
                    <v-icon>mdi-view-column</v-icon>
                </v-btn>
                <v-btn value="detail.add" v-if="slots['views.detail.add']"
                        @click.stop="modelPanel.create()"
                        :title="t('panels.nav.add')"
                        :aria-label="t('panels.nav.add')">
                    <v-icon>mdi-plus-box</v-icon>
                </v-btn>
                <v-btn value="detail.edit" v-if="slots['views.detail.edit'] || editSlots"
                        :disabled="!target.value?.id"
                        :title="t('panels.nav.edit')"
                        :aria-label="t('panels.nav.edit')">
                    <v-icon>mdi-pencil</v-icon>
                </v-btn>
                <slot name="nav.views" v-bind="bind"/>
            </v-btn-toggle>
        </template>

        <template #top>
            <ox-list-filters ref="filters"
                    v-show="target.view.startsWith('list.') && showFilters"
                    :search="props.search"
                    teleport-to="#panel-list-actions">
                <template #default="bind">
                    <slot name="list.filters" v-bind="bind"/>
                </template>
            </ox-list-filters>
        </template>

        <!-- list.table is always provided -->
        <template #views.list.table v-if="!slots['views.list.table']">
            <ox-list-table :headers="headers" edit>
                <template v-for="(_, name) in itemSlots" v-slot:[name]="bind" :key="name">
                    <slot :name="name" v-bind="bind"/>
                </template>
            </ox-list-table>
        </template>

        <template v-for="(name, slot) in viewsListSlots" v-slot:[slot]>
            <slot :name="slot" v-bind="bind"/>
        </template>

        <template #views.detail.edit v-if="slots['views.detail.edit'] || editSlots">
            <ox-model-edit v-model:value="target.value">
                <template v-for="(name, slot) in editSlots" #[name]="bind">
                    <slot :name="slot" v-bind="bind"/>
                </template>
            </ox-model-edit>
        </template>

        <template #views.detail.add v-if="slots['views.detail.add']">
            <slot name="views.detail.add" v-bind="bind"
                :saved="(item) => modelPanel.created(item)"/>
        </template>
    </ox-panel>
</template>
<script setup lang="ts">
import { computed, defineProps, inject, useTemplateRef, useSlots, toRefs } from 'vue'
import { Teleport } from 'vue'

import OxAction from './OxAction.vue'
import OxListFilters from './OxListFilters.vue'
import OxListTable from './OxListTable.vue'
import OxPanel from './OxPanel.vue'
import OxModelEdit from './OxModelEdit.vue'

import {t, filterSlots, panels} from 'ox'
import type {IModelPanelProps} from '../panels'


const slots = useSlots()
const viewsListSlots = filterSlots(slots, 'views.list.')
const itemSlots = filterSlots(slots, 'item.')
const editSlots = filterSlots(slots, 'views.detail.edit.')

const filters = useTemplateRef('filters')
const props = defineProps<IModelPanelProps>()
const repos = inject('repos')
const panels = inject('panels')

const modelPanel = panels.useModelPanel({repos, panels, props})
const {list, showFilters} = toRefs(modelPanel)

const bind = computed(() => {
    return ({
        target,
        list,
        value: panel.value
    })
})
</script>
