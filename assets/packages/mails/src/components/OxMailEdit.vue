<template>
    <ox-model-edit ref="modelEditor" v-bind="attrs" :repo="repo">
        <template #default="{editor, editable}">
            <ox-field :editor="editor" name="account" required>
                <template #default="{props: props_}">
                    <ox-autocomplete v-bind="props_"
                        :filters="{owner__uuid: props.owner}"
                        :repo="repos.mailAccounts"
                        item-title="name" item-value="id"
                        v-model="editor.value.account"
                        />
                </template>
            </ox-field>
            <!--
                @slot Place the field for recipients list here.
                @binding {ModelEditor} editor the model editor
            -->
            <slot name="recipients" :editor="editor" :editable="editable">
                <ox-field :editor="editor" name="recipients" />
            </slot>

            <v-row>
                <v-col>
                    <ox-field :editor="editor" name="subject"/>
                </v-col>
                <v-col cols="1" align-self="center">
                    <ox-variables-menu v-if="renderer?.blocks?.variable"
                        :label="renderer.blocks.variable.label"
                        :icon="renderer.blocks.variable.icon"
                        :items="renderer.variables"
                        @click:select="editor.value.subject += `{{ ${$event.name} }}`"/>
                </v-col>
            </v-row>

            <ox-field :editor="editor" name="content" type="custom">
                <template #default="{props: fieldProps}">
                    <ox-component src="../content/OxBlockEditor.js" v-bind="fieldProps"
                        :renderer="renderer"
                        v-model="editor.value.content"/>
                </template>
            </ox-field>

            <v-expansion-panels multiple class="mt-3">
                <v-expansion-panel :title="t('fields.attachments', 2) + ` (${editor.value.attachments?.length || 0})`">
                    <template #text>
                        <ox-file-list :owner="props.owner" v-model="editor.value.attachments"/>
                    </template>
                </v-expansion-panel>
            </v-expansion-panels>

        </template>
    </ox-model-edit>
</template>
<script setup lang="ts">
/**
 * @component Edit interface for mail.
 *
 * It defaults to {@link Mail} model if `repo` is not provided.
 */
import { computed, reactive, ref, useAttrs, watch } from 'vue'
import { t, rules } from "@oxylus/ox"
import {OxModelEdit, OxField, OxAutocomplete, OxComponent} from '@oxylus/ox/components'

import {asyncLoadRenderer} from '@oxylus/content/composables'
import {OxVariablesMenu} from '@oxylus/content/components'

import {useMailModels} from '../composables'
import OxFileList from './OxFileList.vue'

const repos = useMailModels()
const attrs = useAttrs()
const props = defineProps({
    /** Owner uuid **/
    owner: String,
    /**
     * Use this mail model repo instead of {@link Mail}.
     * It is assumed that this property wont change.
     **/
    repo: {type: Object, default: null}
})

const repo = props.repo || repos.mails
const renderer = asyncLoadRenderer(
    repo.use.meta.getUrl({path: '/renderer', abs:true})
)
const modelEditor = ref(null)


const files = reactive({
    selected: [],
    show: false,
})

</script>
