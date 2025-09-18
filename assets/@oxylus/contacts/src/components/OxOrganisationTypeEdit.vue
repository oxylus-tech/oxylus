<template>
    <ox-model-edit ref="model-editor" v-bind="attrs" :repo="repos.organisationTypes">
        <template #default="{editor}">
            <v-row>
                <v-col>
                    <ox-field :editor="editor" name="name" required/>
                </v-col>
                <v-col cols="2">
                    <ox-field :editor="editor" name="abbreviation" required/>
                </v-col>
                <v-col cols="2">
                    <ox-field :editor="editor" name="code" required/>
                </v-col>
            </v-row>
            <ox-field :editor="editor" name="country">
                <template #default="{props}">
                    <ox-country-input v-bind="props"
                        v-model="editor.value.country"
                        @update:modelValue="countryUpdated(editor)" />
                </template>
            </ox-field>
            <ox-field :editor="editor" name="language_code" />
        </template>
    </ox-model-edit>
</template>
<script setup lang="ts">
import { useAttrs } from 'vue'
import {OxModelEdit, OxField} from '@oxylus/ox/components'

import {useContactModels} from '../composables'
import {OxCountryInput} from '@oxylus/locations/components'

const repos = useContactModels()
const attrs = useAttrs()
</script>
