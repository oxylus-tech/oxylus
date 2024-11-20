<template>
    <template v-if="props.errors">
        <div class="password-error" v-for="error in props.errors">
            <v-icon icon="mdi-alert-circle-outline"/>
            {{ error }}
        </div>
    </template>
</template>
<script setup>
import {defineProps} from 'vue'

const props = defineProps({
    state: Object,
    errors: Array
})
</script>
