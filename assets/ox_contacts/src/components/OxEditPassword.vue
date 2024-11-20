<template>
    <ox-state-alert :state="state"/>
    <v-text-field variant="underlined"
        label="Enter password" v-model="password.value"
        :type="password.value ? 'text' : 'password'"
        :append-icon="password.value ? 'mdi-eye' : 'mdi-eye-off'"
        @click:append="password.value = !password.value"
        />
    <v-text-field variant="underlined"
        label="Confirm password" v-model="confirm.value"
        :color="valid ? 'success' : 'error'"
        :type="confirm.show ? 'text' : 'password'"
        :append-icon="confirm.show ? 'mdi-eye' : 'mdi-eye-off'"
        @click:append="confirm.show = !confirm.show"
        >
        <template v-if="(password.value || confirm.value) && !valid" #details>
            <div class="password-error">Provided passwords are not the same.</div>
        </template>
    </v-text-field>
    <div class="text-right mt-3">
        <slot name="default" :valid="valid" :value="password.value">
            <ox-validation-btn v-if="password.value"
                @validate="save()" @reset="reset()"
                :state="state" :validate-disabled="!valid"/>
        </slot>
    </div>
</template>
<style>
.password-error {
    color: rgb(var(--v-theme-error));
}
</style>
<script setup>
import {computed, inject, ref, reactive, defineModel, defineProps} from 'vue'

import OxStateAlert from 'ox/components/OxStateAlert'
import OxValidationBtn from 'ox/components/OxValidationBtn.vue'

import {State} from 'ox/utils'
import {User} from 'ox/models/auth'

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
