<template>
    <v-container>
        <v-expansion-panels mandatory multiple :model-value="['info']">
            <v-expansion-panel title="Information" value="info">
                <template #text>
                    <v-form ref="form" v-model="editor.valid">
                        <v-text-field variant="underlined" label="User Name"
                            v-model="editor.value.username"
                            :rules="[usernameRule]">
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
                            v-model="editor.value.email">
                            <template #details>
                                <ox-field-details :errors="editor.errors?.email"/>
                            </template>
                        </v-text-field>

                        <v-select multiple
                            label="Groups"
                            v-model="editor.value.groups_id"
                            :items="groups"
                            item-title="name" item-value="id"/>
                    </v-form>
                </template>
            </v-expansion-panel>
            <v-expansion-panel title="User permissions" v-if="editor.value.id">
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
    </v-container>
</template>
<script setup lang="ts">
import {defineProps, defineEmits, inject, toRefs, reactive, useTemplateRef, watch} from 'vue'

import {usernameRule} from 'ox'
import {OxFieldDetails} from 'ox/components'

import OxPermissionsEdit from './OxPermissionsEdit.vue'
import OxPasswordEdit from './OxPasswordEdit.vue'

const repos = inject('repos')
const groups = repos.groups.all()

const form = useTemplateRef('form')
const editor = inject('editor')

</script>
