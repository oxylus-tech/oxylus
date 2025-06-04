<template>
    <ox-model-edit ref="model-editor" v-bind="props" :repo="repos.files">
        <template #default="{editor, editable}">
            <v-row class="mb-3">
                <v-col cols="3" v-if="editor.value.file">
                    <figure class="preview">
                        <img :src="editor.value.preview" aria-hidden="true"/>
                    </figure>

                    <v-btn :href="editor.value.file" target="_blank"
                        prepend-icon="mdi-download" :text="t('actions.download')" />
                </v-col>
                <v-col cols="3" v-else>
                    <ox-file-upload/>
                </v-col>
                <v-col>
                    <v-text-field :label="t('fields.name')"
                        :rules="[rules.errors(editor.errors?.name), rules.required]"
                        v-model="editor.value.name" />
                    <v-row>
                        <v-col cols="4">
                            <ox-agent-select v-model="editor.value.owner"
                                :disabled="editor.value.id" />
                        </v-col>
                        <v-col>
                            <ox-folder-input v-model="editor.value.folder"
                                :disabled="!editor.value.owner"
                                :owner="editor.value.owner"
                                :rules="[rules.errors(editor.errors?.folder)]"
                                :label="t('fields.folder')" />
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
            <v-expansion-panels>
                <v-expansion-panel :title="t('views.edit.informations')">
                    <template #text>
                        <v-text-field
                            :label="t('fields.caption')"
                            :hint="t('fields.caption.help')"
                            :rules="[rules.errors(editor.errors?.caption)]"
                            v-model="editor.value.caption"/>
                        <v-text-field
                            :label="t('fields.alternate')"
                            :hint="t('fields.alternate.help')"
                            :rules="[rules.errors(editor.errors?.alternate)]"
                            v-model="editor.value.alternate"/>
                        <v-textarea variant="outlined"
                            :label="t('fields.description')"
                            :rules="[rules.errors(editor.errors?.description)]"
                            v-model="editor.value.description"/>
                        <v-textarea variant="outlined"
                            :label="t('fields.ariaDescription')"
                            :hint="t('fields.ariaDescription.help')"
                            :rules="[rules.errors(editor.errors?.ariaDescription)]"
                            v-model="editor.value.ariaDescription"/>
                    </template>
                </v-expansion-panel>
            </v-expansion-panels>
        </template>
    </ox-model-edit>
</template>
<script setup lang="ts">
// TODO: reset folder when owner changes
import { t, query, rules} from "ox"
import type {IModelEditorProps} from 'ox'
import {OxModelEdit} from 'ox/components'
import {OxAgentSelect} from '@ox/auth/components'

import {useFilesModels} from '../composables'
import OxFolderInput from './OxFolderInput'
import OxFileUpload from './OxFileUpload'

const repos = useFilesModels()
const props = defineProps<IModelEditorProps>()
</script>
