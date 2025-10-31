<template>
    <ox-state-alert :state="state">
        <template #none="{state}">
            <p>Please enter your credentials in order too proceed...</p>
        </template>
        <template #ok-detail="{state}">
            <p v-if="props.next">You soon will be redirected to <i>{{ props.next }}</i></p>
        </template>
        <!--
        <template #error="{state}">
            <ox-field-details :errors="state.data?.username"/>
            <ox-field-details :errors="state.data?.password"/>
        </template>-->
    </ox-state-alert>
    <template v-if="!state.isOk">
        <v-text-field variant="underlined"
                label="Enter login" v-model="credentials.username"
                @keyup.enter.stop="passwordInput.focus()"
                >
        </v-text-field>
        <v-text-field variant="underlined" ref="password"
                label="Enter password" v-model="credentials.password"
                :type="showPassword ? 'text' : 'password'"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="showPassword = !showPassword"
                @keyup.enter.stop="login()"
                >
        </v-text-field>
        <div class="text-right mt-3">
            <!-- @slot Bottom of the form.
                 @binding {string} password entered password
                 @binding {string} username entered username
                 @binding {async (): void} login run login
                 @binding {Function} reset reset form
                  -->
            <slot name="bottom" :password="credentials.password" :username="credentials.username" :login="login" :reset="reset">
                <ox-validation-btn v-if="credentials.username && credentials.password"
                    validate-label="Login!"
                    @validate="login()" @reset="reset()"
                    :state="state"/>
            </slot>
        </div>
    </template>
</template>
<script setup>
/**
 * @component A form handling user login.
 */

import {computed, inject, ref, reactive, defineModel, defineProps} from 'vue'

import OxStateAlert from './OxStateAlert.vue'
import OxValidationBtn from './OxValidationBtn.vue'
import config from '../config'

import State from '../utils/state'
import {reset as $reset} from '../utils'
import {User} from '../models/auth'


const passwordInput = ref('passwordInput')

const props = defineProps({
    /** Url to go once logged in. */
    next: {type: String},
    /** API url to call to log in. */
    url: {type: String},
})

const credentials = reactive({
    username: '',
    password: '',
})
const showPassword = ref(false)
const state = reactive(new State())

/** Reset credentials */
function reset(resetState=true) {
    $reset(credentials, {"username": "", password: ""})
    resetState && state.none()
}

/** Run login and redirect to the next page if succeed. */
async function login() {
    state.processing()

    try {
        const resp = await fetch(props.url, {
            method: "POST",
            headers: config.axiosConfig.headers,
            body: JSON.stringify(credentials),
        })
        if(resp.status == 200) {
            credentials.credentials = ""
            credentials.password = ""
            state.ok(await resp.json())

            if(props.next)
                window.location.href = props.next
        }
        else
            state.error(await resp.json())
    }
    catch(error) {
        state.error(error?.message || error)
    }
}

defineExpose({
    /** Run login. */
    login,
    /** Reset login form. */
    reset,
    /** Current state. */
    state
})
</script>
