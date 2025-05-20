<template>
    <ox-model-edit ref="model-editor" v-bind="props" :repo="repos.organisationTypes">
        <template #default="{editor}">
            <v-form v-model="editor.valid">
                <v-row>
                    <v-col>
                        <v-text-field :label="t('fields.name')"
                            :rules="[rules.errors(editor.errors?.name), rules.required]"
                            v-model="editor.value.name" />
                    </v-col>
                    <v-col cols="2">
                        <v-text-field :label="t('fields.abbreviation')"
                            :rules="[rules.errors(editor.errors?.abbreviation)]"
                            v-model="editor.value.abbreviation"/>
                    </v-col>
                    <v-col cols="2">
                        <v-text-field :label="t('fields.code')"
                            :rules="[rules.errors(editor.errors?.code), rules.required]"
                            v-model="editor.value.code"/>
                    </v-col>
                </v-row>
                <ox-country-input v-model="editor.value.country"
                    @update:modelValue="countryUpdated(editor)"
                    :label="t('fields.country')"
                    :rules="[rules.errors(editor.errors?.country)]"/>
                <v-text-field :label="t('fields.language_code')"
                    v-model="editor.value.language_code"
                    :rules="[rules.errors(editor.errors?.language_code)]"/>
            </v-form>
        </template>
    </ox-model-edit>
</template>
<script setup lang="ts">
import { t, query, rules} from "ox"
import type {IModelEditorProps} from 'ox'
import {OxModelEdit} from 'ox/components'

import {useContactModels} from '../composables'
import {OxCountryInput} from '@ox/locations/components'

const repos = useContactModels()
const props = defineProps<IModelEditorProps>()
</script>
