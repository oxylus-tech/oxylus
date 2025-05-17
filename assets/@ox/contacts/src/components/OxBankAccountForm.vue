<template>
    <v-container>
        <v-row>
            <v-col>
                <v-text-field v-model="props.item.name"
                     :label="t('fields.name')"/>
             </v-col>
        </v-row>
        <v-row>
            <v-col >
                <ox-iban-input v-model="props.item.iban"
                    :label="t('fields.iban')"/>
            </v-col>
            <v-col cols="2">
                <v-text-field v-model="props.item.bic"
                     :label="t('fields.bic')"/>

            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-text-field v-model="props.item.address"
                     :label="t('fields.address')"/>
             </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-text-field v-model="props.item.bank_name"
                     :label="t('fields.bank_name')"/>
            </v-col>
        </v-row>
    </v-container>
</template>
<script setup lang="ts">
import {defineProps, inject} from 'vue'
import {t} from 'ox'
import {OxIbanInput} from '@ox/locations/components'

const props = defineProps({
    item: Object,
})
</script>
