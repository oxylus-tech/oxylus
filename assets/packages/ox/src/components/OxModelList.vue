<template>
    <!--
        @slot Wrap around the `v-list`.
        @binding {ModelList} list the ModelList instance
        @binding {Model[]} items the items of the ModelList
    -->
    <slot name="default" :list="list" :items="items">
        <v-list v-bind="attrs">
            <slot name="prepend" :list="list" :items="items" />
            <!--
                @slot Default slot inside `v-list`
                @binding {ModelList} list the ModelList instance
                @binding {Model[]} items the items of the ModelList
            -->
            <slot name="list" :list="list" :items="items">
                <v-list-item v-for="item in items" :key="item.id">
                    <!--
                        @slot Default slot inside `v-list-item`
                        @binding {Object} item the item being rendered.
                        @binding {Object} list the ModelList instance.
                    -->
                    <slot name="item" :list="list" :item="item"/>

                    <template #append>
                        <!--
                            @slot Extra actions inside `v-list-item`.
                            @binding {Object} item the item being rendered.
                            @binding {Object} list the ModelList instance.
                        -->
                        <slot name="item.actions" :list="list" :item="item" />
                        <v-btn v-if="props.editable"
                            type="button" class="ml-2" size="small" color="error"
                            @click.stop.prevent="remove(item.id)"
                            :aria-label="t('actions.remove')"
                            :title="t('actions.remove')"
                            icon="mdi-delete"/>
                    </template>
                </v-list-item>
                <slot name="append" :list="list" :items="items" />
            </slot>
        </v-list>
    </slot>
</template>
<script setup lang="ts">
/**
 * @component Renders a list of items provided by id using a {@link ModelList}.
 *
 * The default implementation renders a `v-list`.
 *
 * When the list is editable, a remove button is displayed.
 */
import { computed, defineModel, defineExpose, onMounted, watch, useSlots, useAttrs } from 'vue'
import { debounce, isEqual } from 'lodash'
import { useModelList, Query, t, ifNotEqual } from '@oxylus/ox'
import type {IModelListProps} from '@oxylus/ox'

/**
 * @model The list of ids to fetch.
 */
const ids = defineModel([])
const slots = useSlots()

const props = defineProps<IModelListProps & { load: boolean }>()
const attrs = useAttrs()

const {list, items} = useModelList({
    query: new Query(props.repo, props.repos),
    filters: props.filters,
})
const load = debounce((val) => {
    list.query.repo = val[0]
    list.query.repos = val[1]
    list.filters = val[2]
    list.load()
}, 100)

function remove(id) {
    // for some reason, watch isn't triggered on remove
    list.remove(id)
    ids.value = [...list.ids]
}


onMounted(() => (props.load || ids.value?.length) && list.load({id: ids.value}))
watch(ids, (val) => val.length && ifNotEqual(val, list.ids, (val) => val.length && list.load({id: val})))
watch(() => list.ids, (val) => (ids.value = [...val]))


const last = {}

watch(() => [props.repo, props.repos, props.filters],
      (val, old) => !isEqual(val, old) && load() )

defineExpose({
    /** The used {@link ModelList} controller. */
    list,
    /** The actual list of items. */
    items
})
</script>
