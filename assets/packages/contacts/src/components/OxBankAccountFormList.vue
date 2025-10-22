<template>
    <ox-form-list v-model="items" v-bind="attrs">
        <template #item="{item}">
            {{ item.iban }}
        </template>
        <template #item.form="{item,index}">
            <v-list-item>
                <!-- FIXME -->
                <ox-bank-account-form :item="item"/>
            </v-list-item>
        </template>
    </ox-form-list>
</template>
<script setup lang="ts">
/**
 * Display bank account form list, wrapping around {@link OxFormList}
 */
import {defineModel, useAttrs} from 'vue'
import {OxFormList} from '@oxylus/ox/components'
import OxBankAccountForm from './OxBankAccountForm.vue'

const items = defineModel()
const attrs = useAttrs()
</script>
