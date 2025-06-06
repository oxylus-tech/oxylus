<template>
    <ox-panel :name="props.name" :title="panel.title" :icon="panel.icon"
            :state="list.state" :index="props.index">
        <template #append-title v-if="slots['append-title']">
            <slot name="append-title" v-bind="bind" />
        </template>

        <template #prepend v-if="slots['prepend']">
            <slot name="prepend" v-bind="bind" />
        </template>

        <template #append v-if="slots['append']">
            <slot name="append" v-bind="bind" />
        </template>

        <template #app-bar-right>
            <slot name="app-bar-right" v-bind="bind"/>

            <template v-if="panel.view.startsWith('list.')">
                <v-btn-group class="ml-3" color="secondary"
                        density="compact" variant="tonal">
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
                    <slot name="nav.detail" v-bind="bind"/>

                    <template v-if="panel.view == 'detail.edit' && panel.value">
                        <v-menu>
                            <template #activator="{props}">
                                <v-btn prepend-icon="mdi-dots-vertical" v-bind="props">
                                    {{ t('actions') }}
                                </v-btn>
                            </template>
                            <v-list>
                                <slot name="item.actions" :value="panel.value"/>
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
                <v-btn value="list.cards" v-if="slots['views.list.cards']"
                        @click.capture.stop="panel.show({view: 'list.cards'})"
                        :title="t('panels.nav.cards')"
                        :aria-label="t('panels.nav.cards')">
                    <v-icon>mdi-card-account-details</v-icon>
                </v-btn>
                <v-btn value="list.kanban" v-if="slots['views.list.kanban']"
                        @click.capture.stop="panel.show({view: 'list.kanban'})"
                        :title="t('panels.nav.kanban')"
                        :aria-label="t('panels.nav.kanban')">
                    <v-icon>mdi-view-column</v-icon>
                </v-btn>
                <v-btn value="detail.edit" v-if="slots['views.detail.edit'] || editSlots"
                        @click.capture.stop="panel.show({view: 'detail.edit', value: panel.value})"
                        :disabled="!panel.value?.id && panel.view != 'detail.edit'"
                        :title="t('panels.nav.edit')"
                        :aria-label="t('panels.nav.edit')">
                    <v-icon>mdi-pencil</v-icon>
                </v-btn>
                <v-btn value="detail.add" v-if="editSlots"
                        @click.capture.stop="panel.create()"
                        :title="t('panels.nav.add')"
                        :aria-label="t('panels.nav.add')">
                    <v-icon>mdi-plus-box</v-icon>
                </v-btn>
                <slot name="nav.views" v-bind="bind"/>
            </v-btn-toggle>

            <slot name="app-bar-end" v-bind="bind"/>
        </template>

        <template #top>
            <v-alert v-if="props.warning" type="warning" variant="tonal" :text="props.warning" />
            <slot name="top"/>
            <ox-list-filters ref="filters"
                    v-show="panel.view.startsWith('list.') && showFilters"
                    :search="props.search"
                    teleport-to="#panel-list-actions">
                <template #default="bind">
                    <slot name="list.filters" v-bind="bind"/>
                </template>
            </ox-list-filters>
        </template>

        <!-- list.table is always provided -->
        <template #views.list.table v-if="!slots['views.list.table']">
            <ox-list-table :headers="headers">
                <template v-for="(_, name) in itemSlots" v-slot:[name]="bind" :key="name">
                    <slot :name="name" v-bind="bind"/>
                </template>
            </ox-list-table>
        </template>

        <template v-for="(name, slot) in viewsListSlots" v-slot:[slot]>
            <slot :name="slot" v-bind="bind"/>
        </template>

        <!-- FIXME: views.detail.edit shall be sloted too, not only nested ones? -->
        <template #views.detail.edit v-if="slots['views.detail.edit'] || editSlots">
            <ox-view :title="t(`models.${panel.model.entity}`)">
                <template v-for="(name, slot) in editSlots" #[name]>
                    <slot :name="slot" :saved="saved" :value="panel.value"/>
                </template>
            </ox-view>
        </template>
    </ox-panel>
</template>
<script setup lang="ts">
import { computed, defineProps, defineExpose, inject, useTemplateRef, useSlots, toRefs, withDefaults, watch } from 'vue'
import { Teleport } from 'vue'

import OxAction from './OxAction.vue'
import OxListFilters from './OxListFilters.vue'
import OxListTable from './OxListTable.vue'
import OxPanel from './OxPanel.vue'
import OxView from './OxView'
import OxModelEdit from './OxModelEdit.vue'

import {t, filterSlots, useModelPanel} from 'ox'
import type {IModelPanelProps} from '../controllers'

const slots = useSlots()
const viewsListSlots = filterSlots(slots, 'views.list.')
const itemSlots = filterSlots(slots, 'item.')
const editSlots = filterSlots(slots, 'views.detail.edit.')

const filters = useTemplateRef('filters')
const props = withDefaults(defineProps<IModelPanelProps>(), {
    index: 'list.table',
    search: 'search',
    fetchRelations: true,
})

const context = inject('context')
const {panel, list, items, next, prev} = inject('panel') ?? useModelPanel({props})
const panels = panel.panels

const canEdit = computed(() =>  context.user.can([panel.model, panel.value?.id ? "change": "add"]))

const {showFilters} = toRefs(panel)

/** List table headers */
const headers = computed(() => [
    ...props.headers,
    {key: 'actions', title: t('actions')},
])

/** This is called by editors once object has been saved */
function saved(item) {
    if(item?.id)
        panel.value = panel.repo.whereId(item.id).first()
    else
        panel.value = item
    list.load()
}

const bind = computed(() => {
    return ({
        panel, panels, list, items, context,
        value: panel.value,
    })
})

watch(() => Object.values(list.filters), () => list.load())

defineExpose({list, panel, items, next, prev})
</script>
