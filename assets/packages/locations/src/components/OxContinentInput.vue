<template>
    <v-select v-model="value" v-bind="attrs"
        :placeholder="t('fields.continent')"
        :items="Country.Continent.items">
        <template #detail="bind">
            <slot name="detail" v-bind="bind"/>
        </template>
    </v-select>
</template>
<script setup lang="ts">
import { defineModel, defineProps, useAttrs } from 'vue'
import { t } from '@oxylus/ox'
import { Country } from '../models'

const value = defineModel()
const attrs = useAttrs()
</script>
