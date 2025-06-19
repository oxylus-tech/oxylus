<template>
    <ox-model-edit v-bind="attrs" :repo="repos.groups">
        <template #default="{editor, editable}">
            <v-container>
                <ox-field :editor="editor" name="name"/>
            </v-container>
            <v-expansion-panels mandatory multiple>
                <v-expansion-panel :title="t('models.permission', 2)" value='permissions' v-if="editable && editor.value.id && user.can('auth.view_permission')">
                    <template #text>
                        <v-expansion-panel-text>
                            <ox-permissions-edit :group="editor.value"
                                v-model="editor.value.permissions"/>
                        </v-expansion-panel-text>
                    </template>
                </v-expansion-panel>
            </v-expansion-panels>
        </template>
    </ox-model-edit>
</template>
<script setup lang="ts">
import {inject, useAttrs} from 'vue'

import {t} from 'ox'
import {OxModelEdit, OxField} from 'ox/components'

import {useAuthModels} from '../composables'
import OxPermissionsEdit from './OxPermissionsEdit.vue'

const repos = useAuthModels()
const user = inject('user')
const attrs = useAttrs()
</script>
