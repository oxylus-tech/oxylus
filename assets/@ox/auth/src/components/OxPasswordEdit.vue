<template>
    <ox-state-alert :state="state"/>
    <v-form>
        <v-text-field variant="underlined"
            label="Enter password" v-model="password.value"
            :type="password.show ? 'text' : 'password'"
            :append-icon="password.show ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="password.show = !password.show"
            />
        <v-text-field variant="underlined"
            label="Confirm password" v-model="confirm.value"
            :rules="[samePassword]"
            :type="confirm.show ? 'text' : 'password'"
            :append-icon="confirm.show ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="confirm.show = !confirm.show"
            />
        <div class="text-right mt-3">
            <slot name="default" :valid="valid" :value="password.value">
                <ox-validation-btn v-if="password.value"
                    @validate="save()" @reset="reset()"
                    :state="state" :validate-disabled="!valid"/>
            </slot>
        </div>
    </v-form>
</template>
<style>
.password-error {
    color: rgb(var(--v-theme-error));
}
</style>
<script setup>
import {computed, inject, ref, reactive, defineModel, defineProps} from 'vue'

import {OxStateAlert, OxValidationBtn} from 'ox/components'
import {State, t} from 'ox'

const repos = inject("repos")
const props = defineProps({
    user: {type: Object},
})

const emit = defineEmits(['save', 'saved'])
const password = reactive({ value: '', show: false, })
const confirm = reactive({ value: '', show: false, })
const state = reactive(new State())

const valid = computed(() => (password.value && confirm.value && password.value == confirm.value))

function reset() {
    password.value = "";
    confirm.value = "";
    state.none()
}

function samePassword() {
    return !confirm.value || password.value == confirm.value || t('fields.password.confirm_error')
}

async function save() {
    state.processing()
    try {
        const resp = await repos.users.api().updatePassword(props.user.id, password.value)
        if(resp.response.status == 200) {
            password.value = ""
            confirm.value = ""
            state.ok(resp.response)
        }
        else {
            state.error(resp.response.data)
        }
    }
    catch(error) {
        state.error(error?.message || error)
    }
}
</script>
