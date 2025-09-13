<template>
    <v-list-item v-bind="attrs">
        <v-list-item-title>
            <!--
                @slot Item title
                @binding {Object} item - item currently displayed
            -->
            <slot name="default" :item="item"/>
        </v-list-item-title>
        <template #append>
            <div @click.stop="">
                <!--
                    @slot Item action
                    @binding {Object} item - item currently displayed
                -->
                <slot name="actions" :item="item"/>
                <template v-if="props.remove">
                    <v-btn type="button" class="ml-2" size="small"
                        @click.stop.prevent="emits('remove', $events)" color="error"
                        :aria-label="t('actions.remove')"
                        :title="t('actions.remove')"
                        icon="mdi-delete"/>
                </template>
            </div>
        </template>
    </v-list-item>
</template>
<script setup lang="ts">
/**
 * An element inside an {@link OxFormList}.
 *
 * Attributes will be forwarded to inner `v-list-item`.
 */
import { defineModel, defineEmits, useAttrs } from 'vue'
import { t } from '@oxylus/core'

const props = defineProps({
    /** Item being displayed. **/
    item: Object,
    /** Display remove button. **/
    remove: Boolean,
})
/**
 * Remove item button has been clicked. The click event data is passed along.
 * @event remove
 */
const emits = defineEmits('remove')

const attrs = useAttrs()
</script>
