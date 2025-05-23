<template>
    <ox-model-edit ref="model-editor" v-bind="props" :repo="repos.organisations">
        <template #default="{editor, editable}">
            <v-expansion-panels mandatory multiple :model-value="['info', 'emails', 'phones']">
                <v-expansion-panel :title="t('views.edit.informations')" value="info">
                    <template #text>
                        <v-row>
                            <v-col cols="2">
                                <v-text-field :label="t('fields.color')" type="color"
                                    v-model="editor.value.color"
                                    :rules="[rules.errors(editor.errors?.color)]" />
                            </v-col>
                            <v-col>
                                <v-text-field :label="t('fields.name')"
                                    v-model="editor.value.name"
                                    :rules="[rules.errors(editor.errors?.name), rules.required]" />
                                <v-text-field :label="t('fields.short_name')"
                                    v-model="editor.value.short_name"
                                    :rules="[rules.errors(editor.errors?.short_name)]" />
                            </v-col>
                        </v-row>
                        <v-text-field :label="t('fields.reference')"
                            v-model="editor.value.reference"
                            :rules="[rules.errors(editor.errors?.reference)]" />
                        <ox-country-input v-model="editor.value.country"
                            @update:modelValue="countryUpdated(editor)"
                            :label="t('fields.country')"
                            :rules="[rules.errors(editor.errors?.country)]"/>
                        <v-text-field :label="t('fields.vat')"
                            v-model="editor.value.vat"
                            :disabled="!editable || !editor.value.country"
                            :rules="[rules.optional(vatRule), rules.errors(editor.errors?.vat)]"/>
                        <ox-organisation-type-input
                            v-model="editor.value.type"
                            :country="editor.value.country"
                            :disabled="!editor.value.country"
                            :rules="[rules.errors(editor.errors?.type)]"
                            :label="t('fields.company_form')"/>
                    </template>
                </v-expansion-panel>
                <ox-contact-infos v-model="editor.value" :editable="editable" />
            </v-expansion-panels>
        </template>
    </ox-model-edit>
</template>
<script setup lang="ts">
import { t, query, rules} from "ox"
import type {User, IModelEditorProps} from 'ox'
import {OxModelEdit} from 'ox/components'
import {OxCountryInput, OxIbanInput} from '@ox/locations/components'

import {vatRule, useContactModels} from '../composables'
import OxContactInfos from './OxContactInfos'
import OxOrganisationTypeInput from './OxOrganisationTypeInput'

const repos = useContactModels()
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
