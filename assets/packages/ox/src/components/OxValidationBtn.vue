<template>
    <div class="text-right">
        <v-btn color="error" class="me-2" :prepend-icon="props.resetIcon"
                @click="emit('reset')"
                :disabled="props.disabled">
            <!-- @slot Discard button default slot. -->
            <slot name="discard">{{ props.resetLabel || t('actions.discard') }}</slot>
        </v-btn>
        <v-btn v-if="props.state.isSending || props.state.isProcessing"
                color="primary" :prepend-icon="props.processingIcon" disabled>
            <!-- @slot Processing button default slot. -->
            <slot name="processing">{{ props.processingLabel || t('actions.saving') }}</slot>
        </v-btn>
        <v-btn v-else color="primary" :prepend-icon="props.validateIcon"
                @click="emit('validate')"
                :disabled="props.disabled || props.validateDisabled">
            <!-- @slot Validate button default slot. -->
            <slot name="validate">{{ props.validateLabel ||  t('actions.save') }}</slot>
        </v-btn>
        </div>
</template>
<script setup>
/**
 * @component A component displaying buttons for validating or discard something, based
 * on a provided {@link State} (for processing state).
 */
// TODO: provide more coherent names between slots, props and events.
import {defineEmits, defineProps} from 'vue'
import { t } from '../composables'

const emit = defineEmits([
    /** Validate button has been clicked */
    'validate',
    /** Reset button has been clicked */
    'reset'
])
const props = defineProps({
    /** The state object used. */
    state: {type: Object, default: () => State.none()},
    /** Button label for reset/discard */
    resetLabel: String,
    /** Button label for reset/discard */
    resetIcon: {type: String, default: "mdi-close-circle"},
    /** Button label for validation/save */
    validateLabel: String,
    /** Button label for validation/save */
    validateIcon: {type: String, default: "mdi-content-save"},
    /** Button label for processing */
    processingLabel: String,
    /** Button label for processing */
    processingIcon: {type: String, default: "mdi-content-save"},
    /** Disable buttons */
    disabled: {type: Boolean, default: false},
    /** Disable validation button */
    validateDisabled: {type: Boolean, default: false},
})
</script>
