<template>
    <ox-form-list v-model="items" v-bind="attrs">
        <template #item="{item}">
            <v-row>
                <v-col>{{ item.number }}</v-col>
                <v-col cols="4">{{ ContactInfo.Kind.toString(item.kind) }}</v-col>
            </v-row>
        </template>
        <template #item.form="{item,index}">
            <v-list-item>
                <!-- FIXME -->
                <ox-phone-form variant="underlined" :item="item"/>
            </v-list-item>
        </template>
        <template #item.actions="{item}">
            <v-btn size="small" :href="`tel:${item.number}`" icon="mdi-phone" color="primary"/>
        </template>
    </ox-form-list>
</template>
<script setup lang="ts">
/**
 * Display phone form list, wrapping around {@link OxFormList}
 */
import {defineModel, useAttrs} from 'vue'
import { t } from '@oxylus/ox'
import {OxFormList} from '@oxylus/ox/components'

import { ContactInfo } from '../models'
import OxPhoneForm from './OxPhoneForm.vue'

const items = defineModel()
const attrs = useAttrs()
</script>
