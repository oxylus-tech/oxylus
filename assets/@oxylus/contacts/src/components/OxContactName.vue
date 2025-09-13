<template>
    <v-chip v-if="props.item.organisation" prepend-icon="mdi-domain"
        :color="props.item.organisation.color || 'secondary'" v-bind="attrs">
        {{ props.item.name }}
    </v-chip>
    <v-chip v-else prepend-icon="mdi-card-account-details" :color="infos" v-bind="attrs">
        {{ props.item.name }}
    </v-chip>
</template>
<script setup lang="ts">
/**
 * Simple component for displaying a Contact's name.
 *
 * Name changes depending whether the item is linked to a group or organisation.
 */
import { useAttrs } from 'vue'

const attrs = useAttrs()
const props = defineProps({
    item: Object,
})

</script>
