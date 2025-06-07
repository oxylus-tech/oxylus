<template>
    <ox-model-edit ref="modelEdit" v-bind="props" :repo="repos.files"
            :initial="initial"
            :hide-validation-btn="!props.initial?.id"
            :send-form-data="!props.initial?.id"
            >
        <template #default="{editor, editable, edited, save}">
            <v-row class="mb-3">
                <v-col cols="3" v-if="editor.value?.preview" class="text-center">
                    <figure class="mb-3">
                        <v-img :src="editor.value.preview" aria-hidden="true"/>
                    </figure>

                    <v-btn :href="editor.value.file" target="_blank"
                        prepend-icon="mdi-download" :text="t('actions.download')" />
                </v-col>
                <v-col cols="3" v-else>
                    <ox-file-upload name="file" v-model="editor.value.file"
                        @change="editor.value.name = $event.name"/>
                </v-col>
                <v-col>
                    <v-text-field name="name"
                        :label="t('fields.name')"
                        :rules="[rules.errors(editor.errors?.name), rules.required]"
                        v-model="editor.value.name" />
                    <v-row>
                        <v-col cols="4">
                            <ox-agent-select name="owner" v-model="editor.value.owner"
                                :disabled="editor.value.id" />
                        </v-col>
                        <v-col>
                            <ox-folder-input
                                name="folder"
                                v-model="editor.value.folder"
                                :disabled="!editor.value.owner"
                                :owner="editor.value.owner"
                                :rules="[rules.errors(editor.errors?.folder)]"
                                :label="t('fields.folder')" />
                        </v-col>
                    </v-row>

                    <div class="text-right">
                        <v-btn v-if="!editor.value?.id" color="primary"
                            :disabled="!editor.value?.file"
                            :text="t('actions.upload')" prepend-icon="mdi-upload"
                            @click="save()"/>
                    </div>
                </v-col>
            </v-row>
            <v-expansion-panels>
                <v-expansion-panel :title="t('views.edit.informations')">
                    <template #text>
                        <v-text-field
                            name="caption"
                            :label="t('fields.caption')"
                            :hint="t('fields.caption.help')"
                            :rules="[rules.errors(editor.errors?.caption)]"
                            v-model="editor.value.caption"/>
                        <v-text-field
                            name="alternate"
                            :label="t('fields.alternate')"
                            :hint="t('fields.alternate.help')"
                            :rules="[rules.errors(editor.errors?.alternate)]"
                            v-model="editor.value.alternate"/>
                        <v-textarea variant="outlined"
                            name="description"
                            :label="t('fields.description')"
                            :rules="[rules.errors(editor.errors?.description)]"
                            v-model="editor.value.description"/>
                        <v-textarea variant="outlined"
                            name="ariaDescription"
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
import { computed, ref, watch, onMounted } from 'vue'
import { t, query, rules} from "ox"
import type {IModelEditorProps} from 'ox'
import {OxModelEdit, OxValidationBtn} from 'ox/components'
import {OxAgentSelect} from '@ox/auth/components'

import {useFilesModels} from '../composables'
import OxFolderInput from './OxFolderInput'
import OxFileUpload from './OxFileUpload'

interface IFileEditProps extends IModelEditorProps {
    owner: Object
    folder: Object
}

const repos = useFilesModels()
const props = defineProps<IFileEditProps>()
const modelEdit = ref(null)
const initial = computed(() =>
    (props.initial?.id) ? props.initial : {
        ...props.initial, owner: props.owner, folder: props.folder
    }
)
</script>
