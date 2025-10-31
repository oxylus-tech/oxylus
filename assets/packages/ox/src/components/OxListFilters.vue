<template>
    <form @submit.prevent="list.load()" class="ox-list-filters width-full">
        <v-toolbar dense color="transparent">
            <v-app-bar-nav-icon :icon="icon" readonly/>
            <v-text-field v-if="props.search && list.filters"
                :label="t('filters.search')" density="compact" class="ml-2"
                v-model="list.filters[props.search]"
                hide-details/>
            <!-- @slot Filters objects inside a `<form>` tag
                 @binding {ModelList} list the model list controller
                 @binding {Object} filters the actual filters (as list filters, an object with key-value parameters -->
            <slot :list="list" :filters="list.filters"/>
            <v-btn @click.stop="list.load()" class="ml-2" icon="mdi-check"
                :aria-label="$t('filters.apply')"
                :title="t('filters.apply')"
            />
            <v-btn v-if="hasFilters" @click.stop="reset" icon="mdi-backspace"
                :aria-label="t('filters.reset')"
                :title="t('filters.reset')"
            />
        </v-toolbar>
    </form>
</template>
<script setup>
/**
 * @component A form filled with filters for list views (see {@link OxModelPanel}).
 *
 * You might want to add for `hide-details` on the nested input fields.
 *
 * Required injections: `list`
 */
// TODO: pass list as props.
import { computed, defineProps, defineExpose, inject } from 'vue'
import { t } from '@oxylus/ox'

const list = inject('list')
const props = defineProps({
    /** Search GET parameter. If provided, display search field. */
    search: String,
})

const hasFilters = computed(() => {
    const filters = list.filters
    return filters && Object.entries(filters).some(
        ([k,v]) => !k.startsWith('page') && !k.startsWith('ordering') && !!v
    )
})
const icon = computed(() => hasFilters.value ? 'mdi-filter-check' : 'mdi-filter-outline')

function reset() {
    list.filters = {}
    list.load()
}

defineExpose({
    // FIXME: remove icon ?
    /** Current computed icon */
    icon,
    /** Computed value indicating whether there are filters */
    hasFilters,
    /** Reset filters function. */
    reset
})
</script>
