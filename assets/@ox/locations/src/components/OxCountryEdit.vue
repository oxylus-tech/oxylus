<template>
    <ox-model-edit ref="model-editor" v-bind="props" :repo="repos.countries">
        <template #default="{editor}">
            <v-form v-model="editor.valid">
                <v-row>
                    {{ editor.value.flag }}
                    <v-col>
                        <v-text-field :label="t('fields.name')"
                            :rules="[rules.errors(editor.errors?.name), rules.required]"
                            v-model="editor.value.name" />
                    </v-col>
                    <v-col cols="2">
                        <v-text-field :label="t('fields.code')"
                            :rules="[rules.errors(editor.errors?.code), rules.required]"
                            v-model="editor.value.code"/>
                    </v-col>
                    <v-col cols="2">
                        <v-text-field :label="t('fields.code_3')"
                            :rules="[rules.errors(editor.errors?.code_3), rules.required]"
                            v-model="editor.value.code_3"/>
                    </v-col>
                </v-row>
                <ox-continent-input
                    v-model="editor.value.continent"
                    :label="t('fields.continent')"
                    :rules="[rules.errors(editor.errors?.continent)]"/>
                <v-text-field :label="t('fields.phone_prefix')"
                    v-model="editor.value.phone" prepend-icon="mdi-phone"
                    :rules="[rules.errors(editor.errors?.phone)]"/>
                <ox-currency-input :label="t('fields.currency')"
                    v-model="editor.value.currency"
                    :rules="[rules.errors(editor.errors?.continent)]"/>
            </v-form>
        </template>
    </ox-model-edit>
</template>
<script setup lang="ts">
import { t, query, rules} from "ox"
import type {IModelEditorProps} from 'ox'
import {OxModelEdit} from 'ox/components'

import {useLocationModels} from '../composables'
import OxContinentInput from './OxContinentInput.vue'
import OxCurrencyInput from './OxCurrencyInput'

const repos = useLocationModels()
const props = defineProps<IModelEditorProps>()
</script>
