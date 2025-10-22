<template>
    <ox-form-list v-model="items" v-bind="attrs">
        <template #item="{item}">
            <v-row>
                <v-col>{{ item.email }}</v-col>
                <v-col cols="4">{{ ContactInfo.Kind.toString(item.kind) }}</v-col>
            </v-row>
        </template>
        <template #item.actions="{item}">
            <v-btn size="small" :href="`mailto:${item.email}`" icon="mdi-mail" color="primary"/>
        </template>
        <template #item.form="{item,index}">
            <v-list-item>
                <!-- FIXME -->
                <ox-email-form :item="item"/>
            </v-list-item>
        </template>
    </ox-form-list>
</template>
<script setup lang="ts">
/**
 * Display email form list, wrapping around {@link OxFormList}
 */
import {defineModel, useAttrs} from 'vue'
import { t } from '@oxylus/ox'
import {OxFormList} from '@oxylus/ox/components'

import { ContactInfo } from '../models'
import OxEmailForm from './OxEmailForm.vue'

const items = defineModel()
const attrs = useAttrs()
</script>
