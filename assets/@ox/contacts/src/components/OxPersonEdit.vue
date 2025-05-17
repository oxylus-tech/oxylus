<template>
    <ox-model-edit v-bind="props" :repo="repos.persons">
        <template #default="{editor}">
            <v-expansion-panels mandatory multiple :model-value="['info', 'emails', 'phones']">
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
                                v-model="editor.value.organisations"
                                :items="organisations"
                                item-title="name" item-value="id"/>
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

import { t } from "ox"
import type {User, ModelEditor} from 'ox'
import {OxFieldDetails, OxModelEdit} from 'ox/components'

import OxContactInfos from './OxContactInfos'

const repos = inject('repos')
const organisations = computed(() => repos.organisations.all())

const form = useTemplateRef('form')
const editor = inject('editor')
</script>
