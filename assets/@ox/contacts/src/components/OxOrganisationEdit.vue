<template>
    <ox-model-edit ref="model-editor" v-bind="props" :repo="repos.organisations">
        <template #default="{editor}">
            <v-expansion-panels mandatory multiple :model-value="['info', 'emails', 'phones']">
                <v-expansion-panel :title="t('views.edit.informations')" value="info">
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
                                            :rules="[rules.required]"
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
                            <v-text-field :label="t('fields.reference')"
                                v-model="editor.value.reference" >
                                <template #details>
                                    <ox-field-details :errors="editor.errors?.reference"/>
                                </template>
                            </v-text-field>
                            <ox-country-input v-model="editor.value.country"
                                @update:modelValue="countryUpdated(editor)"
                                :label="t('fields.country')">
                                <template #details>
                                    <ox-field-details :errors="editor.errors?.country"/>
                                </template>
                            </ox-country-input>
                            <v-text-field :label="t('fields.vat')"
                                v-model="editor.value.vat"
                                :disabled="!editor.value.country"
                                :rules="[rules.optional(vatRule)]">
                                <template #details>
                                    <ox-field-details :errors="editor.errors?.vat"/>
                                </template>
                            </v-text-field>
                            <v-select
                                v-model="editor.value.type" :items="types(editor)"
                                :disabled="!editor.value.country"
                                :label="t('fields.company_form')"
                                item-title="name" item-value="id">
                                <template #details>
                                    <ox-field-details :errors="editor.errors?.type"/>
                                </template>
                            </v-select>
                        </v-form>
                    </template>
                </v-expansion-panel>
                <ox-contact-infos v-model="editor.value" />
            </v-expansion-panels>
        </template>
    </ox-model-edit>
</template>
<script setup lang="ts">
import {computed, defineProps, defineEmits, inject, toRefs, reactive, useTemplateRef, watch} from 'vue'

import { t, query, rules} from "ox"
import type {User, IModelEditorProps} from 'ox'
import {OxFieldDetails, OxModelEdit} from 'ox/components'
import {OxCountryInput, OxIbanInput} from '@ox/locations/components'

import {vatRule} from '../composables'
import OxContactInfos from './OxContactInfos'

const repos = inject('repos')
const props = defineProps<IModelEditorProps>()

// --- Organisation type
var tried = null // used by types to avoid looping
function types(editor) {
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
}

function countryUpdated(editor) {
    const type = editor.value.type && repos.organisationtypes.find(editor.value.type)
    // reset organisation type when country changes
    if(type && type.country != editor.value.country)
        editor.value.type = null
}
</script>
