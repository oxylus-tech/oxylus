<template>
    <v-menu>
        <template #activator="{props: props_}">
            <v-btn v-bind="props_" variant="text" size="small"
                :title="props.label"
                :aria-label="props.label"
                :icon="props.icon"/>
        </template>
        <v-list
            density="compact" size="small"
            :menu-icon="props.icons"
            return-object
            @click:select="emits('click:select', $event.id)">
            <v-list-item v-for="(item, i) in items"
                :key="i" :value="item">
                <v-list-item-title v-text="item.label"/>
                <v-list-item-subtitle>
                    {{ item.description }}
                    <v-chip size="small" density="compact" color="primary">
                        {{ item.name }}
                    </v-chip>
                    <v-chip v-if="item.optional"
                            size="small" density="compact" color="info"
                            prepend-icon="mdi-information-outline"
                            :title="t('content.variables.optional.description')"
                            >
                        {{ t('content.variables.optional.label') }}
                    </v-chip>
                </v-list-item-subtitle>
            </v-list-item>
        </v-list>
    </v-menu>
</template>
<script setup lang="ts">
import { defineEmits } from 'vue'
import { t } from "@oxylus/ox"

const emits = defineEmits(["click:select"])
const props = defineProps({
    icon: String,
    label: String,
    items: Array,
})
</script>
