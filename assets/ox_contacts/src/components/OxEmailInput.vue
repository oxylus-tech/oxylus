<template>
    <v-text-field v-model="props.item.email" :label="t('fields.email')" :rules="[emailRule]"/>
</template>
<script setup lang="ts">
import {defineProps} from 'vue'
import {t, emailRule, optionalRule} from 'ox'

const props = defineProps({
    item: Object,
})

</script>
