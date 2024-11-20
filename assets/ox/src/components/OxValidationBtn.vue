<template>
    <div class="text-right">
        <v-btn color="error" class="me-2" :prepend-icon="props.resetIcon"
                @click="emit('reset')"
                :disabled="props.disabled">
            <slot name="reset">{{ props.resetLabel }}</slot>
        </v-btn>
        <v-btn v-if="props.state.isSending"
                color="primary" prepend-icon="mdi-content-save" disabled>
            Saving
        </v-btn>
        <v-btn v-else color="primary" :prepend-icon="props.validateIcon"
                @click="emit('validate')"
                :disabled="props.disabled || props.validateDisabled">
            <slot name="validate">{{ props.validateLabel }}</slot>
        </v-btn>
        </div>
</template>
<script setup>
import {defineEmits, defineProps} from 'vue'
import {VBtn} from 'vuetify/components/VBtn'

const emit = defineEmits(['validate', 'reset'])
const props = defineProps({
    resetLabel: {type: String, default: "Reset"},
    resetIcon: {type: String, default: "mdi-close-circle"},
    validateLabel: {type: String, default: "Save"},
    validateIcon: {type: String, default: "mdi-content-save"},
    disabled: {type: Boolean, default: false},
    state: {type: Object, default: () => State.none()},
    validateDisabled: {type: Boolean, default: false},
})
</script>
