<template>
    <ox-form-list v-model="items" v-bind="attrs">
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
import {defineModel, useAttrs} from 'vue'
import {OxFormList} from 'ox/components'
import OxBankAccountForm from './OxBankAccountForm'

const items = defineModel()
const attrs = useAttrs()
</script>
