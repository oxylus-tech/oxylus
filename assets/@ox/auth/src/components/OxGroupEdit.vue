<template>
    <ox-model-edit v-bind="props" :repo="repos.groups">
        <template #default="{editor, editable}">
            <v-expansion-panels mandatory multiple :model-value="['info']">
                <v-expansion-panel :title="t('views.edit.informations')" value="info">
                    <template #text>
                        <v-text-field variant="underlined" label="Group name"
                            v-model="editor.value.name"
                            :rules="[rules.errors(editor.errors?.name)]" />
                    </template>
                </v-expansion-panel>
                <v-expansion-panel :title="t('models.permissions', 2)" value='permissions' v-if="editable && editor.value.id && user.can('auth.view_permission')">
                    <template #text>
                        <v-expansion-panel-text>
                            <ox-permissions-edit :group="editor.value"
                                v-model="editor.value.permissions_id"/>
                        </v-expansion-panel-text>
                    </template>
                </v-expansion-panel>
            </v-expansion-panels>
        </template>
    </ox-model-edit>
</template>
<script setup lang="ts">
import {inject} from 'vue'

import {t, rules} from 'ox'
import type {IModelEditorProps} from 'ox'
import {OxModelEdit} from 'ox/components'

import {useAuthModels} from '../composables'
import OxPermissionsEdit from './OxPermissionsEdit.vue'

const repos = useAuthModels()
const user = inject('user')
const props = defineProps<IModelEditorProps>()
</script>
