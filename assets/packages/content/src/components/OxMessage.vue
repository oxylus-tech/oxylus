<template>
    <v-list-item :value="props.item.id" v-bind="attrs" class="pa-3"
            base-color="primary">
        <v-list-item-title v-if="!slots.title"
                class="d-flex flex-row">
            <span class="flex-grow-1 text-bold">{{ item.author_name }}</span>
            <time :datetime="item.updated" :title="item.updated">
                <v-icon v-if="item.created != item.updated">mdi-pencil</v-icon>
                {{ item.created }}
            </time>
        </v-list-item-title>

        <v-list-item-text>
            <v-card class="mt-3 pa-3">
                <v-card-text>
                    <div class="ox-message-content" v-html="item.content" />
                </v-card-text>
            </v-card>

            <div v-if="slots.actions || slots.info" class="d-flex flex-row pt-2">
                <div class="flex-grow-1">
                    <slot name="info" :item="props.item"/>
                </div>
                <div>
                    <slot name="actions" :item="props.item"/>
                </div>
            </div>
        </v-list-item-text>
    </v-list-item>
</template>
<script setup lang="ts">
import { useSlots, useAttrs } from 'vue'

const slots = useSlots()
const attrs = useAttrs()
const props = defineProps({
    item: Object,
})
</script>
