<template>
    <v-container>
        <v-expansion-panels mandatory multiple :model-value="['info', 'email', 'phone']">
            <v-expansion-panel title="Information" value="info">
                <template #text>
                    <v-form v-model="editor.valid">
                        <v-layout>
                            <v-row>
                                <v-col cols="2">
                                    <v-text-field :label="t('fields.color')" type="color"
                                        v-model="editor.value.color" >
                                        <template #details>
                                            <ox-field-details :errors="editor.errors?.color"/>
                                        </template>
                                    </v-text-field>
                                </v-col>
                                <v-col>
                                    <v-text-field :label="t('fields.name')"
                                        v-model="editor.value.name" >
                                        <template #details>
                                            <ox-field-details :errors="editor.errors?.name"/>
                                        </template>
                                    </v-text-field>
                                    <v-text-field :label="t('fields.short_name')"
                                        v-model="editor.value.short_name" >
                                        <template #details>
                                            <ox-field-details :errors="editor.errors?.short_name"/>
                                        </template>
                                    </v-text-field>
                                </v-col>
                            </v-row>
                        </v-layout>
                        <v-text-field :label="t('fields.vat')"
                            v-model="editor.value.vat"
                            :disabled="!editor.value.country"
                            :rules="[optionalRule(vatRule)]">
                            <template #details>
                                <ox-field-details :errors="editor.errors?.vat"/>
                            </template>
                        </v-text-field>
                        <v-text-field :label="t('fields.reference')"
                            v-model="editor.value.reference" >
                            <template #details>
                                <ox-field-details :errors="editor.errors?.reference"/>
                            </template>
                        </v-text-field>
                        <v-select
                            v-model="editor.value.type" :items="types"
                            :label="t('fields.company_form')"
                            item-title="name" item-value="id">
                            <template #details>
                                <ox-field-details :errors="editor.errors?.type"/>
                            </template>
                        </v-select>
                        <ox-country-input v-model="editor.value.country"
                            :label="t('fields.country')">
                            <template #details>
                                <ox-field-details :errors="editor.errors?.country"/>
                            </template>
                        </ox-country-input>
                    </v-form>
                </template>
            </v-expansion-panel>
            <v-expansion-panel :title="t('fields.email', 2)" value="email">
                <template #text>
                    <v-expansion-panel-text>
                        <ox-email-form-list v-model="editor.value.emails"/>
                    </v-expansion-panel-text>
                </template>
            </v-expansion-panel>
            <v-expansion-panel :title="t('fields.phone', 2)" value="phone">
                <template #text>
                    <v-expansion-panel-text>
                       <ox-phone-form-list v-model="editor.value.phones"/>
                    </v-expansion-panel-text>
                </template>
            </v-expansion-panel>
            <v-expansion-panel :title="t('fields.address', 2)">
                <template #text>
                    <v-expansion-panel-text>
                       <ox-address-form-list v-model="editor.value.addresses"/>
                    </v-expansion-panel-text>
                </template>
            </v-expansion-panel>
        </v-expansion-panels>
    </v-container>
</template>
<script setup lang="ts">
import {computed, defineProps, defineEmits, inject, toRefs, reactive, useTemplateRef, watch} from 'vue'

import { t, query, optionalRule } from "ox"
import type {User, ModelEditor} from 'ox'
import {OxFieldDetails} from 'ox/components'
import OxCountryInput from '@ox_locations/components/OxCountryInput'

import {vatRule} from '../composables'
import OxEmailFormList from './OxEmailFormList'
import OxPhoneFormList from './OxPhoneFormList'
import OxAddressFormList from './OxAddressFormList'

const editor = inject('editor')
const repos = inject('repos')

// --- Organisation type
var tried = null // used by types to avoid looping
const types = computed(() => {
    const country = editor.value.country
    if(!country)
        return []

    const items = repos.organisationtypes.where("country", country).get()
    if(!items.length && tried != country) {
        tried = country // this avoids looping
        query(repos.organisationtypes).all({params: {country__uuid__exact: country}})
        return repos.organisationtypes.where("country", country).get()
    }
    return items
})
const type = computed(() => editor.value.type && repos.organisationtypes.find(editor.value.type))

watch(() => editor.value.country, (val) => {
    // reset organisation type when country changes
    if(type.value && type.value.country != editor.value.country)
        editor.value.type = null
})

// function vatCountryRule(value) {
//    if(value && editor.value.country)
// }
</script>
