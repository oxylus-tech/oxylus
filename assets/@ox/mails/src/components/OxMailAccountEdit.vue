<template>
    <ox-model-edit v-bind="attrs" :repo="repos.mailAccounts" :initial="initial">
        <template #default="{editor, editable, edited, save}">
            <v-text-field v-model="editor.value.name"
                :label="t('fields.name')"
                :rules="[rules.required]"
                :error-messages="editor.error('name')"
                />
            <ox-agent-select v-model="editor.value.owner"
                :disabled="editor.value.id"/>

            <v-expansion-panels :model-value="['smtp']">
                <v-expansion-panel :title="t('views.edit.smtp')" value="smtp">
                    <template #text>
                        <v-row>
                            <v-col>
                                <v-text-field
                                    :label="t('fields.host')"
                                    :rules="[rules.required]"
                                    :error-messages="editor.error('smtp_host')"
                                    v-model="editor.value.smtp_host"/>
                            </v-col>
                            <v-col cols="2">
                                <v-text-field type="number"
                                    :label="t('fields.port')"
                                    :rules="[rules.required]"
                                    :error-messages="editor.error('smtp_port')"
                                    v-model="editor.value.smtp_port"/>
                            </v-col>
                        </v-row>
                        <v-text-field
                            :label="t('fields.username')"
                            :rules="[rules.required]"
                            :error-messages="editor.error('smtp_username')"
                            v-model="editor.value.smtp_username"/>
                        <v-text-field type="password"
                            :label="t('fields.password')"
                            :rules="[rules.required]"
                            :error-messages="editor.error('smtp_password')"
                            v-model="editor.value.smtp_password"/>
                        <v-select
                            :label="t('fields.encryption')"
                            :rules="[rules.required]"
                            :error-messages="editor.error('smtp_encryption')"

                            :items="MailAccount.Encryption.items"
                            v-model="editor.value.smtp_encryption"/>
                    </template>
                </v-expansion-panel>
            </v-expansion-panels>
        </template>
    </ox-model-edit>
</template>
<script setup lang="ts">
import { computed, ref, watch, onMounted, useAttrs } from 'vue'
import { t, query, rules} from "ox"
import {OxModelEdit} from 'ox/components'
import {OxAgentSelect} from '@ox/auth/components'

import {MailAccount} from '../models'
import {useMailModels} from '../composables'

const repos = useMailModels()
const props = defineProps({
    owner: Object
})
const attrs = useAttrs()
const initial = computed(() =>
    (props.initial?.id) ? props.initial : {
        ...attrs.initial, owner: props.owner,
    }
)
</script>
