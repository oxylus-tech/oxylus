<template>
    <v-select v-model="value"
        :placeholder="t('fields.kind')"
        :items="ContactInfo.Kind.items" />
</template>
<script setup lang="ts">
import { defineModel } from 'vue'
import { t } from '@oxylus/ox'
import { ContactInfo } from '../models'

const value = defineModel()

</script>
