<template>
    <v-list-item v-bind="attrs">
        <v-list-item-title>
            <!--
                @slot Item title
                @binding {Object} item - item currently displayed
            -->
            <slot name="default" :item="props.item">
                {{ props.title }}
            </slot>
        </v-list-item-title>
        <template #append>
            <div @click.stop="">
                <!--
                    @slot Item action
                    @binding {Object} item - item currently displayed
                -->
                <slot name="actions" :item="props.item"/>
                <template v-if="props.remove">
                    <v-btn type="button" class="ml-1" size="small"
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
 * @component An element inside an {@link OxFormList}.
 *
 * Attributes are bounded to inner `v-list-item`.
 */
import { defineModel, defineEmits, useAttrs } from 'vue'
import { t } from '@oxylus/ox'

const props = defineProps<{
    /** Item being displayed. **/
    item: object,
    /** Display remove button. **/
    remove: boolean,
    /** List item title */
    title: string,
}>()
console.log(props.item)
const emits = defineEmits([
    /**
     * Remove item button has been clicked. The click event data is passed along.
     */
    'remove'
])

const attrs = useAttrs()
</script>
