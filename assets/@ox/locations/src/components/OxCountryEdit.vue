<template>
    <ox-model-edit ref="model-editor" v-bind="props" :repo="repos.countries">
        <template #default="{editor}">
            <v-form v-model="editor.valid">
                <v-layout>
                    <v-row>
                        {{ editor.value.flag }}
                        <v-col>
                            <v-text-field :label="t('fields.name')"
                                :rules="[rules.required]"
                                v-model="editor.value.name" >
                                <template #details>
                                    <ox-field-details :errors="editor.errors?.name"/>
                                </template>
                            </v-text-field>
                        </v-col>
                        <v-col cols="2">
                            <v-text-field :label="t('fields.code')"
                                :rules="[rules.required]"
                                v-model="editor.value.code">
                                <template #details>
                                    <ox-field-details :errors="editor.errors?.code"/>
                                </template>
                            </v-text-field>
                        </v-col>
                        <v-col cols="2">
                            <v-text-field :label="t('fields.code_3')"
                                :rules="[rules.required]"
                                v-model="editor.value.code_3">
                                <template #details>
                                    <ox-field-details :errors="editor.errors?.code_3"/>
                                </template>
                            </v-text-field>
                        </v-col>
                    </v-row>
                </v-layout>
                <ox-continent-input class="ml-3"
                    v-model="editor.value.continent"
                    :label="t('fields.continent')">
                    <template #details>
                        <ox-field-details :errors="editor.errors?.continent"/>
                    </template>
                </ox-continent-input>
                <v-text-field :label="t('fields.phone_prefix')"
                    v-model="editor.value.phone" prepend-icon="mdi-phone">
                    <template #details>
                        <ox-field-details :errors="editor.errors?.phone"/>
                    </template>
                </v-text-field>
                <ox-currency-input :label="t('fields.currency')"
                    v-model="editor.value.currency" />
            </v-form>
        </template>
    </ox-model-edit>
</template>
<script setup lang="ts">
// import {computed, defineProps, } from 'vue'

import { t, query, rules} from "ox"
import type {IModelEditorProps} from 'ox'
import {OxFieldDetails, OxModelEdit} from 'ox/components'

import {useLocationModels} from '../composables'
import OxContinentInput from './OxContinentInput.vue'
import OxCurrencyInput from './OxCurrencyInput'

const repos = useLocationModels()
const props = defineProps<IModelEditorProps>()
</script>
