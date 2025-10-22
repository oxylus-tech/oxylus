<template>
    <ox-model-edit ref="model-editor" v-bind="attrs" :repo="repos.organisations">
        <template #default="{editor, editable}">
            <v-container>
                <v-row>
                    <v-col cols="2">
                        <ox-field :editor="editor" name="color" type="color"/>
                    </v-col>
                    <v-col>
                        <ox-field :editor="editor" name="name" required/>
                        <ox-field :editor="editor" name="short_name" />
                    </v-col>
                </v-row>
                <ox-field :editor="editor" name="email" type="email"/>
                <ox-field :editor="editor" name="reference" />
                <ox-field :editor="editor" name="country">
                    <template #default="{props}">
                        <ox-country-input v-bind="props"
                            v-model="editor.value.country"
                            @update:modelValue="countryUpdated(editor)" />
                    </template>
                </ox-field>
                <ox-field :editor="editor" name="vat"
                    :disabled="!editable || !editor.value.country"
                    :rules="[rules.optional(vatRule)]"/>
                <ox-field :editor="editor" name="type">
                    <template #default="{props}">
                        <ox-organisation-type-input v-bind="props"
                            v-model="editor.value.type"
                            :country="editor.value.country"
                            :disabled="!editor.value.country"/>
                    </template>
                </ox-field>
            </v-container>
            <v-expansion-panels multiple :model-value="['emails', 'phones']">
                <ox-contact-infos v-model="editor.value" :editable="editable" />
            </v-expansion-panels>
        </template>
    </ox-model-edit>
</template>
<script setup lang="ts">
import { useAttrs } from 'vue'
import { query, rules} from "@oxylus/ox"
import {OxModelEdit, OxField} from '@oxylus/ox/components'
import {OxCountryInput} from '@oxylus/locations/components'

import {vatRule, useContactModels} from '../composables'
import OxContactInfos from './OxContactInfos.vue'
import OxOrganisationTypeInput from './OxOrganisationTypeInput.vue'

const repos = useContactModels()
const attrs = useAttrs()

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
