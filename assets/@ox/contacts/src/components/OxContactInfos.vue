<template>
    <v-expansion-panel :title="t('fields.email', 2)" value="emails"
            v-if="user.can('ox_contacts.view_email')">
        <template #text>
            <ox-email-form-list v-model="value.emails"
                :use-model="Email"
                :editable="props.editable"/>
        </template>
    </v-expansion-panel>
    <v-expansion-panel :title="t('fields.phone', 2)" value="phones"
            v-if="user.can('ox_contacts.view_phone')">
        <template #text>
            <ox-phone-form-list v-model="value.phones"
                :use-model="Phone"
                :editable="props.editable"/>
        </template>
    </v-expansion-panel>
    <v-expansion-panel :title="t('fields.address', 2)"
            v-if="user.can('ox_contacts.view_address')">
        <template #text>
            <ox-address-form-list v-model="value.addresses"
                :use-model="Address"
                :editable="props.editable"/>
        </template>
    </v-expansion-panel>
    <v-expansion-panel :title="t('models.bankAccount', 2)"
            v-if="user.can('ox_contacts.view_bankaccount')">
        <template #text>
            <ox-bank-account-form-list v-model="value.addresses"
                :use-model="BankAccount"
                :editable="props.editable"/>
        </template>
    </v-expansion-panel>
</template>
<script setup lang="ts">
import { defineModel, inject } from 'vue'
import { t } from 'ox'
import { ContactInfo, Email, Phone, Address, BankAccount } from '../models'
import OxEmailFormList from './OxEmailFormList'
import OxPhoneFormList from './OxPhoneFormList'
import OxAddressFormList from './OxAddressFormList'
import OxBankAccountFormList from './OxBankAccountFormList'

const value = defineModel()
const user = inject('user')
const props = defineProps({
    editable: Boolean
})

</script>
