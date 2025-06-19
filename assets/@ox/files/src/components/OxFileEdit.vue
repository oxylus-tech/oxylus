<template>
    <ox-model-edit ref="modelEdit" v-bind="attrs" :repo="repos.files"
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
                    <ox-field :editor="editor" name="name" required />
                    <v-row>
                        <v-col cols="4">
                            <ox-field :editor="editor" name="owner">
                                <template #default="{props}">
                                    <ox-agent-select v-bind="props"
                                        v-model="editor.value.owner"
                                        :disabled="editor.value.id" />
                                </template>
                            </ox-field>
                        </v-col>
                        <v-col>
                            <ox-field :editor="editor" name="folder">
                                <template #default="{props}">
                                    <ox-folder-input v-bind="props"
                                        v-model="editor.value.folder"
                                        :disabled="!editor.value.owner"
                                        :owner="editor.value.owner" />
                                </template>
                            </ox-field>
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
                        <ox-field :editor="editor" name="caption" />
                        <ox-field :editor="editor" name="alternate" />
                        <ox-field :editor="editor" name="description" type="textarea" />
                        <ox-field :editor="editor" name="ariaDescription" type="textarea" />
                    </template>
                </v-expansion-panel>
            </v-expansion-panels>
        </template>
    </ox-model-edit>
</template>
<script setup lang="ts">
// TODO: reset folder when owner changes
import { computed, ref, watch, onMounted, useAttrs } from 'vue'
import { t, query} from "ox"
import {OxModelEdit, OxField, OxValidationBtn} from 'ox/components'
import {OxAgentSelect} from '@ox/auth/components'

import {useFilesModels} from '../composables'
import OxFolderInput from './OxFolderInput'
import OxFileUpload from './OxFileUpload'

const repos = useFilesModels()
const props = defineProps({
    owner: Object
    folder: Object
})
const attrs = useAttrs()

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
