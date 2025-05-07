<template>
    <v-container>
        <v-expansion-panels mandatory multiple :model-value="['info', 'email', 'phone']">
            <v-expansion-panel title="Information" value="info">
                <template #text>
                    <v-form v-model="editor.valid">
                        <v-text-field :label="t('fields.first_name')"
                            v-model="editor.value.first_name" >
                            <template #details>
                                <ox-field-details :errors="editor.errors?.first_name"/>
                            </template>
                        </v-text-field>
                        <v-text-field :label="t('fields.last_name')"
                            v-model="editor.value.last_name" >
                            <template #details>
                                <ox-field-details :errors="editor.errors?.last_name"/>
                            </template>
                        </v-text-field>
                        <v-select multiple
                            :label="t('fields.organisations')"
                            v-model="editor.value.organisation_ids"
                            :items="organisations"
                            item-title="name" item-value="id"/>
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
import {defineProps, defineEmits, inject, toRefs, reactive, useTemplateRef, watch} from 'vue'

import { t } from "ox"
import type {User, ModelEditor} from 'ox'
import {OxFieldDetails} from 'ox/components'
import OxEmailFormList from './OxEmailFormList'
import OxPhoneFormList from './OxPhoneFormList'
import OxAddressFormList from './OxAddressFormList'

const repos = inject('repos')
const organisations = repos.organisations.all()

const form = useTemplateRef('form')
const editor = inject('editor')
</script>
