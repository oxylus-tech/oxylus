<template>
    <ox-form-list v-model="items">
        <template #item.title="{item}">
            {{ item.street }}, {{ item.number }}<br>
            {{ item.postcode }}, {{ item.city }} &mdash; {{ item.country }}
        </template>
        <template #item="{item,index}">
            <v-list-item>
                <!-- FIXME -->
                <ox-address-input :item="item"/>
            </v-list-item>
        </template>
    </ox-form-list>
</template>
<script setup lang="ts">
import {defineModel, ref} from 'vue'
import {OxFormList} from 'ox/components'
import OxAddressInput from './OxAddressInput'

const items = defineModel()
</script>
