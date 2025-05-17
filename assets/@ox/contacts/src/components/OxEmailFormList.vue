<template>
    <ox-form-list v-model="items">
        <template #item.title="{item}">
            <v-row>
                <v-col>{{ item.email }}</v-col>
                <v-col cols="4">{{ ContactInfo.Kind.display(item.kind) }}</v-col>
            </v-row>
        </template>
        <template #item="{item,index}">
            <v-list-item>
                <!-- FIXME -->
                <ox-email-form :item="item"/>
            </v-list-item>
        </template>
        <template #item.actions="{item}">
            <v-btn size="small" :href="`mailto:${item.email}`" icon="mdi-mail" color="primary"/>
        </template>
    </ox-form-list>
</template>
<script setup lang="ts">
import {defineModel} from 'vue'
import { t } from 'ox'
import {OxFormList} from 'ox/components'

import { ContactInfo } from '../models'
import OxEmailForm from './OxEmailForm'

const items = defineModel()
</script>
