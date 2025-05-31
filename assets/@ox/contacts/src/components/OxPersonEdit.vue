<template>
    <ox-model-edit v-bind="props" :repo="repos.persons">
        <template #default="{editor, disabled}">
            <v-expansion-panels mandatory multiple :model-value="['info', 'emails', 'phones']">
                <v-expansion-panel :title="t('views.edit.informations')" value="info">
                    <template #text>
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
                            <v-text-field
                                v-model="editor.value.email"
                                :label="t('fields.email')"
                                :rules="[rules.email]"
                                :disabled="disabled || editor.value.user">
                                <template #details v-if="editor.value.user">
                                    {{ t('fields._.from_user') }}
                                </template>
                            </v-text-field>
                            <v-select multiple
                                :label="t('fields.organisations')"
                                v-model="editor.value.organisations"
                                :items="organisations"
                                item-title="name" item-value="id"/>
                    </template>
                </v-expansion-panel>
                <ox-contact-infos v-model="editor.value" />
            </v-expansion-panels>
        </template>
    </ox-model-edit>
</template>
<script setup lang="ts">
import {computed, defineProps, defineEmits, inject, toRefs, reactive, useTemplateRef, watch} from 'vue'

import { t, rules } from "ox"
import type {User, IModelEditorProps} from 'ox'
import {OxFieldDetails, OxModelEdit} from 'ox/components'

import OxContactInfos from './OxContactInfos'

const repos = inject('repos')
const props = defineProps<IModelEditorProps>()

const organisations = computed(() => repos.organisations.all())
</script>
