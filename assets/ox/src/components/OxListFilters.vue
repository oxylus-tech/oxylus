<template>
    <form @submit.prevent="list.fetch()" class="width-full">
        <v-toolbar dense color="transparent">
            <v-app-bar-nav-icon :icon="icon" readonly/>
            <v-text-field v-if="props.search && props.list.filters"
                :label="t('filters.search')" density="compact" class="ml-2"
                v-model="props.list.filters[props.search]"
                hide-details/>
            <slot :list="list" :filters="list.filters"/>
            <v-btn @click.stop="list.fetch()" class="ml-2" icon="mdi-check"
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
import { computed, defineProps, defineExpose } from 'vue'
import { useI18n } from '../composables'
const { t } = useI18n()

const props = defineProps({
    search: String,
    list: Object,
})

const hasFilters = computed(() => {
    return props.list.filters && Object.entries(props.list.filters).some(([k,v]) => !k.startsWith('page') && !k.startsWith('ordering') && !!v)
})
const icon = computed(() => hasFilters.value ? 'mdi-filter-check' : 'mdi-filter-outline')

function reset() {
    props.list.filters = {}
    props.list.fetch()
}

defineExpose({ icon, hasFilters, reset})
</script>
