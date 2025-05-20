<template>
    <ox-model-edit ref="model-editor" v-bind="props" :repo="repos.currencies">
        <template #default="{editor}">
            <v-form v-model="editor.valid">
                <v-row>
                    <v-col>
                        <v-text-field :label="t('fields.name')"
                            :rules="[rules.required, rules.errors(editor.errors?.name)]"
                            v-model="editor.value.name" />
                    </v-col>
                    <v-col cols="2">
                        <v-text-field :label="t('fields.code')"
                            :rules="[rules.required, rules.errors(editor.errors?.code)]"
                            v-model="editor.value.code"/>
                    </v-col>
                    <v-col cols="2">
                        <v-text-field :label="t('fields.numeric')"
                            :rules="[rules.errors(editor.errors?.numeric)]"
                            v-model="editor.value.numeric"/>
                    </v-col>
                </v-row>
                <v-checkbox :label="t('fields.is_iso')"
                    :rules="[rules.errors(editor.errors?.is_iso)]"
                    v-model="editor.value.is_iso"/>
                <v-date-input :label="t('fields.valid_to')"
                    :rules="[rules.errors(editor.errors?.valid_to)]"
                    v-model="editor.value.valid_to"/>
            </v-form>
        </template>
    </ox-model-edit>
</template>
<script setup lang="ts">
import { t, query, rules} from "ox"
import type {IModelEditorProps} from 'ox'
import {OxModelEdit} from 'ox/components'

import {useCurrencies} from '../composables'

const repos = useCurrencies()
const props = defineProps<IModelEditorProps>()
</script>
