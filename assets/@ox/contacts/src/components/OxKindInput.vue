<template>
    <v-select v-model="value"
        :placeholder="t('enums.contactinfo_kind')"
        :items="ContactInfo.kindItems">
        <template #item="{item, props}">
            <v-list-item v-bind="props"
                :title="t(ContactInfo.Kind.display(item.raw))"
                :value="item.raw"/>
        </template>
        <template #selection="{item}">
            {{ t(ContactInfo.Kind.display(item.value)) }}
        </template>
    </v-select>
</template>
<script setup lang="ts">
import { defineModel } from 'vue'
import { t } from 'ox'
import { ContactInfo } from '../models'

const value = defineModel()

</script>
