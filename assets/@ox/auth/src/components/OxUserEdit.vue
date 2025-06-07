<template>
    <ox-model-edit v-bind="props" :repo="repos.users">
        <template #default="{editor, editable}">
            <v-expansion-panels mandatory multiple :model-value="['info']">
                <v-expansion-panel :title="t('views.edit.informations')" value="info">
                    <template #text>
                        <v-text-field variant="underlined" label="User Name"
                            v-model="editor.value.username"
                            :rules="[rules.errors(editor.errors?.username)]"/>
                        <v-text-field variant="underlined" label="First Name"
                            v-model="editor.value.first_name"
                            :rules="[rules.errors(editor.errors?.first_name)]"/>
                        <v-text-field variant="underlined" label="Last Name"
                            v-model="editor.value.last_name"
                            :rules="[rules.errors(editor.errors?.last_name)]"/>
                        <v-text-field variant="underlined" type="email" label="Email"
                            v-model="editor.value.email"
                            :rules="[rules.errors(editor.errors?.email)]"/>
                        <v-select multiple v-if="props.full && user.can('auth.change_group')"
                            label="Groups"
                            v-model="editor.value.groups_id"
                            :rules="[rules.errors(editor.errors?.groups_id)]"
                            :items="groups"
                            item-title="name" item-value="id"/>
                    </template>
                </v-expansion-panel>
                <v-expansion-panel :title="t('models.permissions', 2)" value='permissions'
                        v-if="props.full && editor.value.id && user.can('auth.view_permission')">
                    <template #text>
                        <v-expansion-panel-text>
                            <ox-permissions-edit :user="editor.value"
                                v-model="editor.value.permissions_id"/>
                        </v-expansion-panel-text>
                    </template>
                </v-expansion-panel>
                <v-expansion-panel title="Password reset" v-if="(editable && editor.value.id) || user.id == editor.value.id">
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
import {inject} from 'vue'

import {rules, t} from 'ox'
import {OxModelEdit} from 'ox/components'
import type {IModelEditorProps} from 'ox'

import {useAuthModels} from '../composables'
import OxPermissionsEdit from './OxPermissionsEdit.vue'
import OxPasswordEdit from './OxPasswordEdit.vue'

interface IUserEditProps extends IModelEditorProps {
    /** If true, shows permission and group assignment */
    full: Boolean,
}


const user = inject('user')
const repos = useAuthModels()
const props = defineProps<IUserEditProps>()
const groups = repos.groups.all()
</script>
