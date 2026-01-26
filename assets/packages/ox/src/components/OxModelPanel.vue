<template>
    <ox-panel :name="props.name" :index="props.index"
            :title="panel.title"
            :icon="model?.meta?.icon || props.icon"
            :state="list.state">
        <template #append-title v-if="slots['append-title']">
            <!-- @slot After the panel title -->
            <slot name="append-title" v-bind="bind"  />
        </template>

        <template #prepend v-if="slots['prepend']">
            <!-- @slot At the top of the panel, between the OxStateAlert and the sheet. -->
            <slot name="prepend" v-bind="bind"  />
        </template>

        <template #append v-if="slots['append']">
            <!-- @slot At the end of the panel. -->
            <slot name="append" v-bind="bind"  />
        </template>

        <template #app-actions>
            <!-- @slot At the right of the app bar, before all other buttons. -->
            <slot name="app-actions" v-bind="bind" />

            <template v-if="activeView?.category == 'list'">
                <v-btn-group class="ml-3" color="secondary"
                        density="compact" variant="tonal">
                    <!-- @slot Navigation buttons for list views. -->
                    <slot name="nav.list" v-bind="bind" />
                    <v-btn :title="t('actions.list.reload')"
                        :aria-label="t('actions.list.reload')"
                        @click="list.load()">
                        <v-icon>mdi-reload</v-icon>
                    </v-btn>
                    <v-btn v-if="filters"
                        :title="showFilters ? t('filters.hide') : t('filters.show')"
                        :aria-label="showFilters ? t('filters.hide') : t('filters.show')"
                        @click="showFilters = !showFilters" :active="showFilters">
                        <v-icon :icon="filters.icon"/>
                    </v-btn>
                </v-btn-group>
            </template>
            <template v-else-if="activeView?.category == 'detail'">
                <v-btn-group class="ml-3" color="secondary" density="compact" variant="tonal">
                    <!-- @slot Navigation buttons for detail views. -->
                    <slot name="nav.detail" v-bind="bind" />

                    <v-menu>
                        <template #activator="{props}">
                            <v-btn prepend-icon="mdi-dots-vertical" v-bind="props">
                                {{ t('actions') }}
                            </v-btn>
                        </template>
                        <v-list>
                            <slot name="item.actions" :item="item"/>
                        </v-list>
                    </v-menu>

                    <v-btn :disabled="!prev"
                            :title="t('prev')" :aria-label="t('prev')"
                            @click.stop="router.go({value: prev.id})">
                        <v-icon icon="mdi-chevron-left"/>
                    </v-btn>
                    <v-btn :disabled="!next"
                            :title="t('next')" :aria-label="t('next')"
                            @click.stop="router.go({value: next.id})">
                        <v-icon icon="mdi-chevron-right"/>
                    </v-btn>
                </v-btn-group>
            </template>
        </template>

        <template #top>
            <v-alert v-if="props.warning" type="warning" variant="tonal" :text="props.warning" />
            <!-- @slot At the top of the panel, before list filters. -->
            <slot name="top"/>
            <ox-list-filters ref="filters"
                    v-show="activeView?.category == 'list' && showFilters"
                    :search="props.search"
                    teleport-to="#panel-list-actions">
                <template #default="bind">
                    <!-- @slot Where to put the lists filters. Bindings are thoses provided by default slot of {@link OxListFilters} -->
                    <slot name="list.filters" v-bind="bind" :filters="list.filters" />
                </template>
            </ox-list-filters>
        </template>

        <!-- list.table is always provided -->
        <ox-view name="table" icon="mdi-table"
                category="list"
                :title="t('views.table')">
            <ox-list-table :list="list" :items="items" :headers="headers" :edit="!!slots['views.edit']">
                <template v-for="(_, name) in itemSlots" v-slot:[name]="bind" :key="name">
                    <slot :name="name" v-bind="bind" />
                </template>
            </ox-list-table>
        </ox-view>

        <ox-view name="cards" icon="mdi-view-grid"
                category="list"
                :title="t('views.cards')">
            <ox-list-card :list="list" :items="items"
                    :headers="props.headers"
                    :edit="!!slots['views.edit']">
                <template v-for="(_, name) in itemSlots" v-slot:[name]="bind" :key="name">
                    <slot :name="name" v-bind="bind" />
                </template>
            </ox-list-card>
        </ox-view>

        <ox-view v-if="slots['views.edit']" name="edit" category="detail"
                :disabled="!item"
                :icon="user.can([model, 'change']) ? 'mdi-pencil' : 'mdi-eye'"
                :title="t('views.edit')">
            <template #default="bind">
                <ox-section name="default" :title="model.meta.verbose_name">
                    <slot name="views.edit.default" v-bind="bind" :value="item" :saved="saved" />
                </ox-section>
                <!-- @slot Extra sections to add to edit view -->
                <slot name="views.edit" v-bind="bind" :value="item" :saved="saved" />
            </template>
        </ox-view>

        <ox-view v-if="slots['views.create'] && user.can([model, 'add'])"
                name="create" category="create" icon="mdi-plus-box"
                :title="t('views.create')">
            <template #default="bind">
                <slot name="views.create.default" v-bind="bind"  :saved="saved" />
            </template>
        </ox-view>

        <slot name="default"/>
    </ox-panel>
</template>
<script setup lang="ts">
/**
 * @component A panel for displaying model views, linked to a provided repository.
 *
 * It provides different views by default: `views.list.table` ({@link OxListTable}), `views.list.cards` ({@link OxListCard}). You want to implement `views.detail.edit` slot.
 *
 * It is responsible to fetch data from the server, display the items, switch between different
 * views.
 *
 * Required injections: `user`.
 * Optional injections: `repos` (defaults to props `repos`)
 *
 */
import { computed, defineExpose, inject, onMounted, ref, useSlots, withDefaults } from 'vue'

import OxAction from './OxAction.vue'
import OxListFilters from './OxListFilters.vue'
import OxListTable from './OxListTable.vue'
import OxListCard from './OxListCard.vue'
import OxPanel from './OxPanel.vue'
import OxView from './OxView.vue'
import OxSection from './OxSection.vue'

import {t, filterSlots, useModelPanel, useGuard, exposeRefs} from '@oxylus/ox'
import type {ModelPanelDefinition} from '../composables/modelPanel'

const slots = useSlots()
const itemSlots = filterSlots(slots, 'item.')
const hasEdit = computed(() => !!slots.edit)

const filters = ref(null)
const props = withDefaults(defineProps<ModelPanelDefinition>(), {
    index: 'table',
    search: 'search',
    fetchRelations: true,
})
const user = inject('user')
const usePanel = useModelPanel({
    ...props,
    repos: inject('repos', props.repos)
})
const {
    router, model, list, items, item, panel,
    active, activeView, showFilters,
    next, prev
} = usePanel


/** List table headers */
const headers = computed(() => [
    ...props.headers,
    {key: 'actions', title: t('actions')},
])

/** This is called by editors once object has been saved */
function saved(item) {
    item = new props.repo.use(item)
    router.go({view: 'edit', value: item.id})
    list.load()
}

const bind = exposeRefs({...usePanel, item})

onMounted(() => list.load())
defineExpose(bind)
</script>
