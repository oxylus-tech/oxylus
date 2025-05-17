<template>
    <ox-form-list v-model="items">
        <template #item.title="{item}">
            <v-row>
                <v-col>
                    {{ item.street }}, {{ item.number }}<br>
                    {{ item.postcode }}, {{ item.city }} &mdash; {{ item.country }}
                </v-col>
                <v-col cols="4">{{ ContactInfo.Kind.display(item.kind) }}</v-col>
            </v-row>
        </template>
        <template #item="{item,index}">
            <v-list-item>
                <!-- FIXME -->
                <ox-address-form :item="item"/>
            </v-list-item>
        </template>
    </ox-form-list>
</template>
<script setup lang="ts">
import {defineModel, ref} from 'vue'
import { t } from 'ox'
import {OxFormList} from 'ox/components'

import { ContactInfo } from '../models'
import OxAddressForm from './OxAddressForm'

const items = defineModel()
</script>
