<template>
    <ox-model-edit v-bind="attrs" :repo="repos.mailAccounts" :initial="initial">
        <template #default="{editor, editable, edited, save}">
            <ox-field :editor="editor" name="name" required />
            <ox-agent-select v-model="editor.value.owner"
                :disabled="editor.value.id"/>

            <v-expansion-panels :model-value="['smtp']">
                <v-expansion-panel :title="t('views.edit.smtp')" value="smtp">
                    <template #text>
                        <v-row>
                            <v-col>
                                <ox-field :editor="editor" name="smtp_host" type="text" required/>
                            </v-col>
                            <v-col>
                                <ox-field :editor="editor" name="smtp_encryption" type="select" required
                                    @update:modelValue="editor.value.smtp_port = ports[editor.value.smtp_encryption]"
                                    :items="MailAccount.Encryption.items"
                                    />
                            </v-col>
                            <v-col cols="2">
                                <ox-field :editor="editor" name="smtp_port" type="number" required/>
                            </v-col>
                        </v-row>
                        <ox-field :editor="editor" name="smtp_username" required/>
                        <ox-field :editor="editor" name="smtp_password" type="password"/>
                    </template>
                </v-expansion-panel>
            </v-expansion-panels>
        </template>
    </ox-model-edit>
</template>
<script setup lang="ts">
import { computed, ref, watch, onMounted, useAttrs } from 'vue'
import { t, query, rules} from "ox"
import {OxModelEdit, OxField} from 'ox/components'
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

const ports = {
    [MailAccount.Encryption.NONE]: 25,
    [MailAccount.Encryption.SSL]: 465,
    [MailAccount.Encryption.TLS]: 587,
}
</script>
