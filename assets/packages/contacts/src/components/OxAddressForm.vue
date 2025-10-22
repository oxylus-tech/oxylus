<template>
    <v-container>
        <v-row>
            <v-col>
                <ox-kind-input v-model="props.item.kind" />
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-text-field v-model="props.item.street"
                     :label="t('fields.street')"/>
             </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-text-field v-model="props.item.street_2"
                     :label="t('fields.street_2')"/>
             </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-text-field v-model="props.item.number"
                     :label="t('fields.number')"/>
            </v-col>
            <v-col>
                <v-text-field v-model="props.item.box"
                     :label="t('fields.box')"/>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-text-field v-model="props.item.postcode" type="number"
                     :label="t('fields.postcode')"/>
            </v-col>
            <v-col>
                <v-text-field v-model="props.item.city"
                     :label="t('fields.city')"/>
            </v-col>
            <v-col>
                <ox-country-input v-model="props.item.country"
                    :label="t('fields.country')"/>
            </v-col>
        </v-row>
    </v-container>
</template>
<script setup lang="ts">
import {defineProps, inject} from 'vue'
import {t} from '@oxylus/ox'
import {OxCountryInput} from '@oxylus/locations/components'
import OxKindInput from './OxKindInput.vue'

const props = defineProps({
    item: Object,
})
</script>
