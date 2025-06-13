<template>
    <ox-model-edit v-bind="attrs" :repo="repos.persons">
        <template #default="{editor, editable, disabled}">
            <v-container>
                <v-text-field :label="t('fields.first_name')"
                    :error-messages="editor.error('first_name')"
                    v-model="editor.value.first_name" />
                <v-text-field :label="t('fields.last_name')"
                    :error-messages="editor.error('last_name')"
                    v-model="editor.value.last_name" />
                <v-text-field
                    v-model="editor.value.email"
                    :label="t('fields.email')"
                    :error-messages="editor.error('email')"
                    :rules="[rules.email]"
                    :disabled="disabled || editor.value.user" >
                    <template #details v-if="editor.value.user">
                        {{ t('fields._.from_user') }}
                    </template>
                </v-text-field>
                <v-select multiple
                    :label="t('fields.organisations')"
                    :error-messages="editor.error('organisations')"
                    v-model="editor.value.organisations"
                    :items="organisations"
                    item-title="name" item-value="id"/>
            </v-container>
            <v-expansion-panels multiple :model-value="['emails', 'phones']">
                <ox-contact-infos v-model="editor.value" :editable="editable" />
            </v-expansion-panels>
        </template>
    </ox-model-edit>
</template>
<script setup lang="ts">
import {computed, useAttrs} from 'vue'
import { t, rules } from "ox"
import {OxModelEdit} from 'ox/components'

import { useContactModels } from '../composables'
import OxContactInfos from './OxContactInfos'

const repos = useContactModels()
const attrs = useAttrs()
const organisations = computed(() => repos.organisations.all())
</script>
