<template>
    <ox-model-edit ref="model-editor" v-bind="props" :repo="repos.users">
        <template #default="{editor}">
            <v-expansion-panels mandatory multiple :model-value="['info']">
                <v-expansion-panel :title="t('views.edit.informations')" value="info">
                    <template #text>
                        <v-form v-model="editor.valid">
                            <v-text-field variant="underlined" label="User Name"
                                v-model="editor.value.username"
                                :rules="[rules.username]">
                                <template #details>
                                    <ox-field-details :errors="editor.errors?.username"/>
                                </template>
                            </v-text-field>
                            <v-text-field variant="underlined" label="First Name"
                                v-model="editor.value.first_name" >
                                <template #details>
                                    <ox-field-details :errors="editor.errors?.first_name"/>
                                </template>
                            </v-text-field>
                            <v-text-field variant="underlined" label="Last Name"
                                v-model="editor.value.last_name" >
                                <template #details>
                                    <ox-field-details :errors="editor.errors?.last_name"/>
                                </template>
                            </v-text-field>
                            <v-text-field variant="underlined" type="email" label="Email"
                                v-model="editor.value.email" :rules="[rules.email]">
                                <template #details>
                                    <ox-field-details :errors="editor.errors?.email"/>
                                </template>
                            </v-text-field>

                            <v-select multiple v-if="props.full && context.user.can('auth.change_group')"
                                label="Groups"
                                v-model="editor.value.groups_id"
                                :items="groups"
                                item-title="name" item-value="id"/>
                        </v-form>
                    </template>
                </v-expansion-panel>
                <v-expansion-panel :title="t('models.permissions', 2)" value='permissions' v-if="editor.value.id">
                    <template #text>
                        <v-expansion-panel-text>
                            <ox-permissions-edit :user="editor.value"
                                v-model="editor.value.permissions_id"/>
                        </v-expansion-panel-text>
                    </template>
                </v-expansion-panel>
                <v-expansion-panel title="Password reset" v-if="editor.value.id">
                    <template #text>
                        <v-expansion-panel-text>
                            <ox-password-edit :user="editor.initial" @saved=""/>
                        </v-expansion-panel-text>
                    </template>
                </v-expansion-panel>
            </v-expansion-panels>
        </template>
    </ox-model-edit>
</template>
<script setup lang="ts">
import {defineProps, inject, reactive, watch, withDefaults} from 'vue'

import {rules, t, useModelEditor} from 'ox'
import {OxFieldDetails, OxModelEdit} from 'ox/components'
import type {IModelEditorProps} from 'ox'

import {useAuthModels} from '../composables'
import OxPermissionsEdit from './OxPermissionsEdit.vue'
import OxPasswordEdit from './OxPasswordEdit.vue'

interface IUserEditProps extends IModelEditorProps {
    /** If true, shows permission and group assignment */
    full: Boolean,
}


const context = inject('context')
const repos = useAuthModels()
const props = defineProps<IUserEditProps>()
const groups = repos.groups.all()
</script>
