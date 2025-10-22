<template>
    <ox-model-edit ref="model-editor" v-bind="attrs" :repo="repos.countries">
        <template #default="{editor, editable}">
            <v-row>
                {{ editor.value.flag }}
                <v-col>
                    <ox-field :editor="editor" name="name" required />
                </v-col>
                <v-col cols="2">
                    <ox-field :editor="editor" name="code" required />
                </v-col>
                <v-col cols="2">
                    <ox-field :editor="editor" name="code_3" required />
                </v-col>
            </v-row>

            <ox-field :editor="editor" name="continent">
                <template #default="{props}">
                    <ox-continent-input v-bind="props"
                        v-model="editor.value.continent" />
                </template>
            </ox-field>

            <ox-field :editor="editor" name="phone"
                prepend-icon="mdi-phone" />

            <ox-field :editor="editor" name="currency">
                <template #default="{props}">
                    <ox-currency-input v-bind="props"
                        v-model="editor.value.currency" />
                </template>
            </ox-field>
        </template>
    </ox-model-edit>
</template>
<script setup lang="ts">
import { useAttrs } from 'vue'
import {OxModelEdit, OxField} from '@oxylus/ox/components'

import {useLocationModels} from '../composables'
import OxContinentInput from './OxContinentInput.vue'
import OxCurrencyInput from './OxCurrencyInput.vue'

const repos = useLocationModels()
const attrs = useAttrs()
</script>
