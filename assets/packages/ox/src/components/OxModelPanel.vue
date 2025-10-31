<template>
    <ox-panel :name="props.name" :title="panel.title" :icon="panel.icon"
            :state="list.state" :index="props.index">
        <template #append-title v-if="slots['append-title']">
            <!-- @slot After the panel title -->
            <slot name="append-title" v-bind="bind" />
        </template>

        <template #prepend v-if="slots['prepend']">
            <!-- @slot At the top of the panel, between the OxStateAlert and the sheet. -->
            <slot name="prepend" v-bind="bind" />
        </template>

        <template #append v-if="slots['append']">
            <!-- @slot At the end of the panel. -->
            <slot name="append" v-bind="bind" />
        </template>

        <template #app-bar-right>
            <!-- @slot At the right of the app bar, before all other buttons. -->
            <slot name="app-bar-right" v-bind="bind"/>

            <template v-if="panel.view.startsWith('list.')">
                <v-btn-group class="ml-3" color="secondary"
                        density="compact" variant="tonal">
                    <!-- @slot Navigation buttons for list views. -->
                    <slot name="nav.list" v-bind="bind"/>
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
            <template v-else-if="panel.view.startsWith('detail.') && panel.value">
                <v-btn-group class="ml-3" color="secondary" density="compact" variant="tonal">
                    <!-- @slot Navigation buttons for detail views. -->
                    <slot name="nav.detail" v-bind="bind"/>

                    <template v-if="panel.view == 'detail.edit' && panel.value">
                        <v-menu>
                            <template #activator="{props}">
                                <v-btn prepend-icon="mdi-dots-vertical" v-bind="props">
                                    {{ t('actions') }}
                                </v-btn>
                            </template>
                            <v-list>
                                <slot name="item.actions" :item="panel.value"/>
                            </v-list>
                        </v-menu>
                    </template>

                    <v-btn :disabled="!prev"
                            :title="t('prev')" :aria-label="t('prev')"
                            @click.stop="panel.show({view: panel.view, value: prev})">
                        <v-icon icon="mdi-chevron-left"/>
                    </v-btn>
                    <v-btn :disabled="!next"
                            :title="t('next')" :aria-label="t('next')"
                            @click.stop="panel.show({view: panel.view, value: next})">
                        <v-icon icon="mdi-chevron-right"/>
                    </v-btn>
                </v-btn-group>
            </template>

            <v-btn-toggle class="ml-3" color="secondary"
                density="compact" variant="tonal" mandatory
                v-model="panel.view"
                >
                <!-- TODO: permission check -->
                <v-btn value="list.table"
                        @click.capture.stop="panel.show({view: 'list.table'})"
                        :title="t('panels.nav.table')"
                        :aria-label="t('panels.nav.table')">
                    <v-icon>mdi-table</v-icon>
                </v-btn>
                <v-btn value="list.cards"
                        @click.capture.stop="panel.show({view: 'list.cards'})"
                        :title="t('panels.nav.cards')"
                        :aria-label="t('panels.nav.cards')">
                    <v-icon>mdi-view-grid</v-icon>
                </v-btn>
                <v-btn value="list.kanban" v-if="slots['views.list.kanban']"
                        @click.capture.stop="panel.show({view: 'list.kanban'})"
                        :title="t('panels.nav.kanban')"
                        :aria-label="t('panels.nav.kanban')">
                    <v-icon>mdi-view-column</v-icon>
                </v-btn>
                <v-btn value="detail.edit" v-if="hasEdit"
                        @click.capture.stop="panel.show({view: 'detail.edit', value: panel.value})"
                        :disabled="!panel.value?.id && panel.view != 'detail.edit'"
                        :title="t('panels.nav.edit')"
                        :aria-label="t('panels.nav.edit')">
                    <v-icon v-if="user.can([panel.model, 'change'])">mdi-pencil</v-icon>
                    <v-icon v-else>mdi-eye</v-icon>
                </v-btn>
                <v-btn value="detail.add" v-if="hasEdit && user.can([panel.model, 'add'])"
                        @click.capture.stop="panel.create()"
                        :title="t('panels.nav.add')"
                        :aria-label="t('panels.nav.add')">
                    <v-icon>mdi-plus-box</v-icon>
                </v-btn>
                <!-- @slot Inside the `v-btn-toggle` used to switch views. -->
                <slot name="nav.views" v-bind="bind"/>
            </v-btn-toggle>

            <!-- @slot After button toggle used for switching views. -->
            <slot name="app-bar-end" v-bind="bind"/>
        </template>

        <template #top>
            <v-alert v-if="props.warning" type="warning" variant="tonal" :text="props.warning" />
            <!-- @slot At the top of the panel, before list filters. -->
            <slot name="top"/>
            <ox-list-filters ref="filters"
                    v-show="panel.view.startsWith('list.') && showFilters"
                    :search="props.search"
                    teleport-to="#panel-list-actions">
                <template #default="bind">
                    <!-- @slot Where to put the lists filters. Bindings are thoses provided by default slot of {@link OxListFilters} -->
                    <slot name="list.filters" v-bind="bind"/>
                </template>
            </ox-list-filters>
        </template>

        <!-- list.table is always provided -->
        <template #views.list.table v-if="!slots['views.list.table']">
            <ox-list-table :list="list" :items="items" :headers="headers" :edit="hasEdit">
                <template v-for="(_, name) in itemSlots" v-slot:[name]="bind" :key="name">
                    <slot :name="name" v-bind="bind"/>
                </template>
            </ox-list-table>
        </template>

        <template #views.list.cards v-if="!slots['views.list.cards']">
            <ox-list-card :list="list" :items="items" :edit="hasEdit"
                    :headers="props.headers">
                <template v-for="(_, name) in itemSlots" v-slot:[name]="bind" :key="name">
                    <slot :name="name" v-bind="bind"/>
                </template>
            </ox-list-card>
        </template>

        <template v-for="(name, slot) in viewsListSlots" v-slot:[slot]>
            <!-- @slot Views are prefixed with `views.`
                 @binding {Panel} panel the panel controller
                 @binding {Panels} panels the panels controller
                 @binding {ModelList} list the model list
                 @binding {Model[]} items the list of items fetched by the model list
                 @binding {(Model): void} saved the function called once an item is saved
                 @binding {Model} value current item being edited/displayed
            -->
            <slot :name="slot" v-bind="bind"/>
        </template>

        <!-- FIXME: views.detail.edit shall be sloted too, not only nested ones? -->
        <template #views.detail.edit v-if="hasEdit">
            <ox-view :title="t(`models.${panel.model.entity}`)">
                <template v-for="(name, slot) in editSlots" #[name]>
                    <slot :name="slot" v-bind="bind"/>
                </template>
            </ox-view>
        </template>
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
 * Required injections: `panels`, `panel`, `user`.
 *
 * ## Views
 *
 * Views are provided as slots, using prefix `views.[list|detail].[name]`. Views are of two type: list and detail.
 *
 * For `views.list.table`, `views.list.kanban`, `views.list.cards`, `views.detail.edit`, button will be provided in the top bar if the slots are present. Extra buttons can be added in `nav.views` slot.
 *
 * Slots prefixed with `item.` will be forwarded down to all list views.
 */
import { computed, defineProps, defineExpose, inject, useTemplateRef, useSlots, toRefs, withDefaults, watch } from 'vue'
import { Teleport } from 'vue'

import OxAction from './OxAction.vue'
import OxListFilters from './OxListFilters.vue'
import OxListTable from './OxListTable.vue'
import OxListCard from './OxListCard.vue'
import OxPanel from './OxPanel.vue'
import OxView from './OxView.vue'
import OxModelEdit from './OxModelEdit.vue'

import {t, filterSlots, useModelPanel} from '@oxylus/ox'
import type {IModelPanelProps} from '../controllers'

const slots = useSlots()
const viewsListSlots = filterSlots(slots, 'views.list.')
const itemSlots = filterSlots(slots, 'item.')
const editSlots = filterSlots(slots, 'views.detail.edit.')
const hasEdit = computed(() => !!Object.keys(editSlots).length)

const filters = useTemplateRef('filters')
const props = withDefaults(defineProps<IModelPanelProps>(), {
    index: 'list.table',
    search: 'search',
    fetchRelations: true,
})

const user = inject('user')
const {panel, list, items, next, prev} = useModelPanel({props})
const panels = panel.panels

const canEdit = computed(() =>  user.can([panel.model, panel.value?.id ? "change": "add"]))

const {showFilters} = toRefs(panel)

/** List table headers */
const headers = computed(() => [
    ...props.headers,
    {key: 'actions', title: t('actions')},
])

/** This is called by editors once object has been saved */
function saved(item) {
    item = new props.repo.use(item)
    panel.show({view: panel.view, value: item})
    list.load()
}

const bind = computed(() => ({
    panel, panels, list, items,
    saved,
    value: panel.value,
}))

watch(() => Object.values(list.filters), () => list.load())

defineExpose({
    /** The ModelList being used across all views */
    list,
    /** The {@link OxModelPanel} controller */
    panel,
    /** The actual list of items */
    items,
    /** URL to next page. */
    next,
    /** URL to prev page. */
    prev
})
</script>
