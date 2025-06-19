<template>
    <ox-model-edit v-bind="attrs" :repo="repos.users">
        <template #default="{editor, editable}">
            <v-container>
                <ox-field :editor="editor" name="username" />
                <ox-field :editor="editor" name="first_name" />
                <ox-field :editor="editor" name="last_name" />
                <ox-field :editor="editor" name="email" type="email"
                    :rules="[rules.email]"/>
                <ox-field v-if="props.full && user.can('auth.change_group')"
                    :editor="editor" name="groups" type="select" multiple
                    :items="groups" item-title="name" item-value="id"/>
            </v-container>
            <v-expansion-panels multiple>
                <v-expansion-panel :title="t('models.permission', 2)" value='permissions'
                        v-if="props.full && editor.value.id && user.can('auth.view_permission')">
                    <template #text>
                        <v-expansion-panel-text>
                            <ox-permissions-edit :user="editor.value"
                                v-model="editor.value.permissions"/>
                        </v-expansion-panel-text>
                    </template>
                </v-expansion-panel>
                <v-expansion-panel
                    v-if="(editable && editor.value.id) || user.id == editor.value.id"
                    :title="t('actions.password.reset')">
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
import {inject, useAttrs} from 'vue'

import {rules, t} from 'ox'
import {OxModelEdit, OxField} from 'ox/components'

import {useAuthModels} from '../composables'
import OxPermissionsEdit from './OxPermissionsEdit.vue'
import OxPasswordEdit from './OxPasswordEdit.vue'

const user = inject('user')
const repos = useAuthModels()
const props = defineProps<{
    /** If true, shows permission and group assignement */
    full: boolean
}>()
const attrs = useAttrs()
const groups = repos.groups.all()
</script>
