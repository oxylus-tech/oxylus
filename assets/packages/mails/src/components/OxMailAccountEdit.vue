<template>
    <ox-model-edit v-bind="attrs" :repo="repos.mailAccounts" :initial="initial">
        <template #default="{editor, editable, edited, save}">
            <ox-field :editor="editor" name="name" required />
            <ox-agent-select v-model="editor.value.owner"
                :disabled="editor.value.id"/>

            <v-expansion-panels :model-value="['settings', 'smtp']">
                <v-expansion-panel :title="t('views.edit.mail.settings')" value="settings">
                    <template #text>
                        <ox-field :editor="editor" name="mail_header" type="custom">
                            <template #default="{props}">
                                <ox-component src="../ox_content/OxRichEditor.js" v-bind="props"
                                    height="150px"
                                     v-model="editor.value.mail_header"/>
                            </template>
                        </ox-field>

                        <ox-field :editor="editor" name="mail_signature" type="custom">
                            <template #default="{props}">
                                <ox-component src="../ox_content/OxRichEditor.js" v-bind="props"
                                    height="150px"
                                     v-model="editor.value.mail_signature"/>
                            </template>
                        </ox-field>

                        <ox-field :editor="editor" name="mail_subscription_footer" type="custom">
                            <template #default="{props}">
                                <ox-component src="../ox_content/OxRichEditor.js" v-bind="props"
                                    height="150px"
                                     v-model="editor.value.mail_subscription_footer"/>
                            </template>
                        </ox-field>

                        <!--
                        <ox-component src="../ox_content/OxRichEditor.js"
                            v-model="editor.value.mail_signature"/>

                        <ox-component src="../ox_content/OxRichEditor.js"
                            v-model="editor.value.mail_subscription_footer"/> -->
                    </template>
                </v-expansion-panel>
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
import { t, query, rules} from "@oxylus/ox"
import {OxModelEdit, OxField, OxComponent} from '@oxylus/ox/components'
import {OxAgentSelect} from '@oxylus/auth/components'

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
