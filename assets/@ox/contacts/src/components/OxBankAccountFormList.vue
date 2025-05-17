<template>
    <ox-form-list v-model="items">
        <template #item.title="{item}">
            {{ item.iban }}
        </template>
        <template #item="{item,index}">
            <v-list-item>
                <!-- FIXME -->
                <ox-bank-account-form :item="item"/>
            </v-list-item>
        </template>
    </ox-form-list>
</template>
<script setup lang="ts">
import {defineModel} from 'vue'
import {OxFormList} from 'ox/components'
import OxBankAccountForm from './OxBankAccountForm'

const items = defineModel()
</script>
