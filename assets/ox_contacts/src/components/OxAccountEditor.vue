<template>
    <v-container>
        <ox-state-alert :state="editor.state"/>
        <div class="mb-3">
            <ox-validation-btn v-if="editor.edited"
                @validate="editor.save()" @reset="editor.reset()" :state="editor.state" :validate-disabled="!form.isValid"/>
        </div>
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
                        <ox-edit-permissions :user="editor.value"
                            v-model="editor.value.permissions_id"/>
                    </v-expansion-panel-text>
                </template>
            </v-expansion-panel>
            <v-expansion-panel title="Password reset" v-if="editor.value.id">
                <template #text>
                    <v-expansion-panel-text>
                        <ox-edit-password :user="props.initial" @saved=""/>
                    </v-expansion-panel-text>
                </template>
            </v-expansion-panel>
        </v-expansion-panels>
    </v-container>
</template>
<script setup>
import {defineProps, defineEmits, inject, toRefs, reactive, useTemplateRef, watch} from 'vue'

import OxFieldDetails from 'ox/components/OxFieldDetails.vue'
import OxStateAlert from 'ox/components/OxStateAlert.vue'
import OxValidationBtn from 'ox/components/OxValidationBtn.vue'
import OxEditPermissions from './OxEditPermissions.vue'
import OxEditPassword from './OxEditPassword.vue'

import { modelEditor } from "ox/composables/edit"


const emits = defineEmits(['saved',])
const repos = inject('repos')
const groups = repos.groups.all()

const props = defineProps({
    initial: Object,
})
const {initial} = toRefs(props)
const form = useTemplateRef('form')

const panel = inject("panel")
const editor = modelEditor({
    name: "account-editor",
    panel, initial, emits,
    repo: repos.users,
})

function usernameRule(value) {
    const allowed = /^[A-Za-z0-9@.+\-_]+$/
    return allowed.test(value) || "Username must not be empty. It only can contain letters, numbers and @/+/./- special characters"
}
</script>
