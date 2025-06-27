<template>
    <v-chip v-if="props.item.group" prepend-icon="mdi-account-multiple" :color="props.item.color || 'info'" v-bind="attrs">
        {{ props.item.name }}
    </v-chip>
    <v-chip v-else-if="props.item.organisation" prepend-icon="mdi-domain"
        :color="props.item.color || 'secondary'" v-bind="attrs">
        {{ props.item.name }}
    </v-chip>
    <template v-else>
        <v-icon :color="props.item.color">mdi-card-account-details-star</v-icon>
        {{ props.item.name }}
    </template>
</template>
<script setup lang="ts">
/**
 * Simple component for displaying a ContactList's name.
 *
 * Name changes depending whether the item is linked to a group or organisation.
 */
import { useAttrs } from 'vue'

const attrs = useAttrs()
const props = defineProps({
    item: Object,
})

</script>
