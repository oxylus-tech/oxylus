<template>
    <ox-model-edit v-bind="attrs" :repo="repos.contactLists">
        <template #default="{editor, editable}">
            <v-container>
                <v-row>
                    <v-col cols="2">
                        <ox-field :editor="editor" name="color" type="color"/>
                    </v-col>
                    <v-col>
                        <ox-field :editor="editor" name="name" required/>
                    </v-col>
                </v-row>
                <ox-field :editor="editor" name="description" type="textarea"/>
                <ox-field :editor="editor" name="is_subscription" type="checkbox"
                    v-if="!editor.value.group && !editor.value.organisation"/>
            </v-container>
        </template>
    </ox-model-edit>
</template>
<script setup lang="ts">
import {inject, useAttrs} from 'vue'

import {t} from 'ox'
import {OxModelEdit, OxField} from 'ox/components'

import {useContactList} from '../composables'

const repos = useContactList()
const user = inject('user')
const attrs = useAttrs()
</script>
