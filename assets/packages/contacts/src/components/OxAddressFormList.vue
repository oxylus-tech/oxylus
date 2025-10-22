<template>
    <ox-form-list v-model="items" v-bind="attrs">
        <template #item="{item}">
            <v-row>
                <v-col>
                    {{ item.street }}, {{ item.number }}<br>
                    {{ item.postcode }}, {{ item.city }} &mdash; {{ item.country }}
                </v-col>
                <v-col cols="4">{{ ContactInfo.Kind.toString(item.kind) }}</v-col>
            </v-row>
        </template>
        <template #item.form="{item,index}">
            <v-list-item>
                <!-- FIXME -->
                <ox-address-form :item="item"/>
            </v-list-item>
        </template>
    </ox-form-list>
</template>
<script setup lang="ts">
/**
 * Display address form list, wrapping around {@link OxFormList}
 */
import {defineModel, ref, useAttrs} from 'vue'
import { t } from '@oxylus/ox'
import {OxFormList} from '@oxylus/ox/components'

import { ContactInfo } from '../models'
import OxAddressForm from './OxAddressForm.vue'

const items = defineModel()
const attrs = useAttrs()
</script>
