<template>
    <ox-model-edit ref="modelEdit" v-bind="props" :repo="repos.files"
            :initial="initial"
            :hide-validation-btn="!props.initial?.id"
            send-form-data
            @saved="onSaved"
            >
        <template #default="{editor, editable, edited, save}">
            <input v-if="editor.value.id" type="hidden" name="id" :value="editor.value.id"/>
            <v-row class="mb-3">
                <v-col cols="3" v-if="editor.value?.id && !openUpload" class="text-center">
                    <figure class="mb-3">
                        <v-img min-height="400" :src="editor.value.preview" aria-hidden="true">
                            <template v-slot:placeholder>
                                <div class="d-flex align-center justify-center fill-height">
                                    <v-progress-circular
                                    color="grey-lighten-4"
                                    indeterminate/>
                                    >
                                </div>
                            </template>
                        </v-img>
                    </figure>

                    <v-btn :href="editor.value.file" target="_blank"
                        prepend-icon="mdi-download" :text="t('actions.download')" />
                    <v-btn target="_blank" class="ml-1"
                        size="small" color="secondary"
                        @click="openUpload=true"
                        icon="mdi-upload" :title="t('actions.upload_new_file')" />
                </v-col>
                <v-col cols="3" v-else>
                    <v-btn v-if="editor.value.id" class="float-right"
                        icon="mdi-close" size="small" color="secondary"
                        :title="t('actions.close')"
                        :aria-label="t('actions.close')"
                        @click="openUpload=false"
                        />
                    <ox-file-upload name="file"
                        @change="onFileChange($event, editor)"/>
                </v-col>
                <v-col>
                    <v-text-field name="name"
                        :label="t('fields.name')"
                        :rules="[rules.required]"
                        :error-messages="editor.error('name')"
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
                                :error-messages="editor.error('folder')"
                                :label="t('fields.folder')" />
                        </v-col>
                    </v-row>

                    <div class="text-right">
                        <v-btn v-if="!editor.value?.id" color="primary"
                            :disabled="!editor.valid"
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
                            :message-errors="editor.error('caption')"
                            v-model="editor.value.caption"/>
                        <v-text-field
                            name="alternate"
                            :label="t('fields.alternate')"
                            :hint="t('fields.alternate.help')"
                            :message-errors="editor.error('alternate')"
                            v-model="editor.value.alternate"/>
                        <v-textarea variant="outlined"
                            name="description"
                            :label="t('fields.description')"
                            :message-errors="editor.error('description')"
                            v-model="editor.value.description"/>
                        <v-textarea variant="outlined"
                            name="ariaDescription"
                            :label="t('fields.ariaDescription')"
                            :hint="t('fields.ariaDescription.help')"
                            :message-errors="editor.error('ariaDescription')"
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
const openUpload = ref(false)
const initial = computed(() =>
    (props.initial?.id) ? props.initial : {
        ...props.initial, owner: props.owner, folder: props.folder
    }
)


function onFileChange(event, editor) {
    editor.value.file = event
    if(editor.value.name && !confirm(t('fields.name.update_filename')))
        return
    event?.name && (editor.value.name = event.name)
}


function onSaved(editor) {
    openUpload.value = false
    refresh(editor, editor.initial)
}


function refresh(editor, item) {
    if(item.id && !item.preview)
        query(repos.files).fetch({id: item.id}).then(r => {
            const obj = r.entities?.[0]
            if(!obj.preview)
                window.setTimeout(() => refresh(editor, obj), 2000)
            else
                editor.value.preview = obj.preview
        })
}

</script>
