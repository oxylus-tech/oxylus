<template>
    <div class="text-right">
        <v-btn color="error" class="me-2" :prepend-icon="props.resetIcon"
                @click="emit('reset')"
                :disabled="props.disabled">
            <slot name="discard">{{ props.resetLabel || t('actions.discard') }}</slot>
        </v-btn>
        <v-btn v-if="props.state.isSending || props.state.isProcessing"
                color="primary" :prepend-icon="props.processingIcon" disabled>
            <slot name="processing">{{ props.processingLabel || t('actions.saving') }}</slot>
        </v-btn>
        <v-btn v-else color="primary" :prepend-icon="props.validateIcon"
                @click="emit('validate')"
                :disabled="props.disabled || props.validateDisabled">
            <slot name="validate">{{ props.validateLabel ||  t('actions.save') }}</slot>
        </v-btn>
        </div>
</template>
<script setup>
import {defineEmits, defineProps} from 'vue'
import { t } from '../composables'

const emit = defineEmits(['validate', 'reset'])
const props = defineProps({
    resetLabel: String,
    resetIcon: {type: String, default: "mdi-close-circle"},
    validateLabel: String,
    validateIcon: {type: String, default: "mdi-content-save"},
    processingLabel: String,
    processingIcon: {type: String, default: "mdi-content-save"},
    disabled: {type: Boolean, default: false},
    state: {type: Object, default: () => State.none()},
    validateDisabled: {type: Boolean, default: false},
})
</script>
