<template>
    <v-expansion-panel :title="t('fields.email', 2)" value="emails">
        <template #text>
            <v-expansion-panel-text>
                <ox-email-form-list v-model="value.emails"/>
            </v-expansion-panel-text>
        </template>
    </v-expansion-panel>
    <v-expansion-panel :title="t('fields.phone', 2)" value="phones">
        <template #text>
            <v-expansion-panel-text>
               <ox-phone-form-list v-model="value.phones"/>
            </v-expansion-panel-text>
        </template>
    </v-expansion-panel>
    <v-expansion-panel :title="t('fields.address', 2)">
        <template #text>
            <v-expansion-panel-text>
               <ox-address-form-list v-model="value.addresses"/>
            </v-expansion-panel-text>
        </template>
    </v-expansion-panel>
    <v-expansion-panel :title="t('models.bankAccount', 2)">
        <template #text>
            <v-expansion-panel-text>
               <ox-bank-account-form-list v-model="value.addresses"/>
            </v-expansion-panel-text>
        </template>
    </v-expansion-panel>
</template>
<script setup lang="ts">
import { defineModel } from 'vue'
import { t } from 'ox'
import { ContactInfo } from '../models'
import OxEmailFormList from './OxEmailFormList'
import OxPhoneFormList from './OxPhoneFormList'
import OxAddressFormList from './OxAddressFormList'
import OxBankAccountFormList from './OxBankAccountFormList'

const value = defineModel()
</script>
