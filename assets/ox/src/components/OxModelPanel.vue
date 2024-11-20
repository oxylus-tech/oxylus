<template>
    <ox-panel :name="props.name" :title="title" :icon="icon"
            :state="list.state" :tabbed="props.tabbed">
        <template #append-title>
            <slot name="append-title" v-bind="bind"/>

            <template v-if="panel.view.startsWith('list.')">
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
            <template v-else-if="panel.view.startsWith('detail.') && panel.value?.id">
                <v-btn-group class="ml-3" color="secondary" density="compact" variant="tonal">
                    <slot name="nav.item" v-bind="bind"/>

                    <template v-if="panel.view == 'detail.edit'">
                        <v-menu>
                            <template #activator="{props}">
                                <v-btn prepend-icon="mdi-dots-vertical" v-bind="props">
                                    {{ t('actions') }}
                                </v-btn>
                            </template>
                            <v-list>
                                <slot name="item.actions" v-bind="bind"/>
                            </v-list>
                        </v-menu>
                    </template>

                    <v-btn :disabled="!list.prev"
                            :title="t('prev')" :aria-label="t('prev')"
                            @click.stop="panel.value = list.prev">
                        <v-icon icon="mdi-chevron-left"/>
                    </v-btn>
                    <v-btn :disabled="!list.next"
                            :title="t('next')" :aria-label="t('next')"
                            @click.stop="panel.value = list.next">
                        <v-icon icon="mdi-chevron-right"/>
                    </v-btn>
                </v-btn-group>
            </template>

            <v-btn-toggle class="ml-3" color="secondary" v-model="panel.view" density="compact" variant="tonal">
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
                        @click.stop="create()"
                        :title="t('panels.nav.add')"
                        :aria-label="t('panels.nav.add')">
                    <v-icon>mdi-plus-box</v-icon>
                </v-btn>
                <v-btn value="detail.edit" v-if="slots['views.detail.edit'] || editSlots"
                        :disabled="!panel.value?.id"
                        :title="t('panels.nav.edit')"
                        :aria-label="t('panels.nav.edit')">
                    <v-icon>mdi-pencil</v-icon>
                </v-btn>
                <slot name="nav.views" v-bind="bind"/>
            </v-btn-toggle>
        </template>

        <template #default>
            <ox-list-filters ref="filters"
                    v-show="panel.view.startsWith('list.') && showFilters"
                    :list="list" :search="props.search"
                    teleport-to="#panel-list-actions">
                <template #default="bind">
                    <slot name="list.filters" v-bind="bind"/>
                </template>
            </ox-list-filters>

            <v-window v-model="panel.view">
                <!-- list.table is always provided -->
                <v-window-item value="list.table" v-if="!slots['views.list.table']">
                    <ox-list-table :list="list" :headers="headers" edit>
                        <template v-for="(_, name) in itemSlots" v-slot:[name]="bind" :key="name">
                            <slot :name="name" v-bind="bind"/>
                        </template>
                    </ox-list-table>
                </v-window-item>

                <template v-for="(name, slot) in viewsListSlots">
                    <v-window-item :value="'list.' + name">
                        <slot :name="slot" v-bind="bind"/>
                    </v-window-item>
                </template>

                <v-window-item value="detail.edit" v-if="slots['views.detail.edit'] || editSlots">
                    <ox-model-edit v-model:value="panel.value">
                        <template v-for="(name, slot) in editSlots" #[name]="bind">
                            <slot :name="slot" v-bind="bind"/>
                        </template>
                    </ox-model-edit>
                </v-window-item>

                <v-window-item value="detail.add" v-if="slots['views.detail.add']">
                    <slot name="views.detail.add" v-bind="bind"
                        :saved="(item) => created(item)"/>
                </v-window-item>
            </v-window>
        </template>
    </ox-panel>
</template>
<script setup lang="ts">
import { computed, defineProps, inject, ref, toRefs, useTemplateRef, useSlots, unref, watch } from 'vue'
import { Teleport } from 'vue'
import { useI18n } from 'vue-i18n'

import OxAction from './OxAction.vue'
import OxListFilters from './OxListFilters.vue'
import OxListTable from './OxListTable.vue'
import OxPanel from './OxPanel.vue'
import OxModelEdit from './OxModelEdit.vue'

import {mapToObject} from '../utils'
import {filterSlots} from '../utils/vue'
import {useApiListProps, useApiList} from '../composables/list'
import {panelProps} from '../composables/panel'
import {Permissions} from '../models'

const { t } = useI18n()

const slots = useSlots()
const viewsListSlots = filterSlots(slots, 'views.list.')
const itemSlots = filterSlots(slots, 'item.')
const editSlots = filterSlots(slots, 'views.detail.edit.')


const props = defineProps({
    ...useApiListProps(),
    ...panelProps,
    search: String,
    view: String,
    headers: Array,
    showFilters: {type: Boolean, default: false},
})

const repos = inject('repos')
const panel = inject('panel')
const {value} = toRefs(panel)

// ---- list
const filters = useTemplateRef('filters')
const listProps = computed(() => mapToObject(useApiListProps(), props))
const list = computed(() => useApiList(
    {...listProps.value, value},
    {repos},
))
const items = computed(() => list.value?.items || [])
const showFilters = ref(props.showFilters)

// FIXME: move into OxPanel? More generaly move views handling into panel
watch(() => panel.view, (value) => {
    if(!value)
        panel.view = props.view || 'list.table'
})

function create(path='.detail.add') { panel.reset(path, new props.repo.use()) }
function created(item) {
    panel.reset('.detail.edit', item, {force:true})
    list.value?.fetch()
}


// ---- panel
const title = computed(() => {
    if(props.title)
        return props.title

    const model = unref(list).repo.use
    if(model === null)
        return ""

    // many items
    if(panel.view.startsWith('list.'))
        return t(`models.${model.entity}`, 3)

    if(!panel.value)
        return ""

    const title = panel.value.$title
    if(title)
        return title

    const name = t(`models.${model.entity}`)
    return (panel.value.id) ? t(`models._.title`, {model: name, id: panel.value.id})
                            : t(`models._.title.new`, {model: name})
})
const icon = computed(() =>
    props.icon ? props.icon : (props.repo.use?.meta?.icon || null)
)

const bind = computed(() => {
    return ({
        panel,
        list: unref(list),
        items: unref(list).items,
        value: panel.value
    })
})

</script>
