<template>
    <ox-state-alert :state="state">
        <template #none="{state}">
            <p>Please enter your credentials in order too proceed...</p>
        </template>
        <template #ok-detail="{state}">
            <p v-if="props.next">You soon will be redirected to <i>{{ props.next }}</i></p>
        </template>
        <template #error="{state}">
            <ox-field-details :errors="state.data?.username"/>
            <ox-field-details :errors="state.data?.password"/>
        </template>
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
            <slot name="default" :value="credentials.password">
                <ox-validation-btn v-if="credentials.username && credentials.password"
                    validate-label="Login!"
                    @validate="login()" @reset="reset()"
                    :state="state"/>
            </slot>
        </div>
    </template>
</template>
<script setup>
import {computed, inject, ref, reactive, defineModel, defineProps, useTemplateRef} from 'vue'

import OxStateAlert from './OxStateAlert'
import OxValidationBtn from './OxValidationBtn.vue'
import OxFieldDetails from './OxFieldDetails.vue'
import config from '../config'

import State from '../utils/state'
import {reset as $reset} from '../utils'
import {User} from '../models/auth'


const passwordInput = useTemplateRef('password')

const props = defineProps({
    next: {type: String},
    url: {type: String},
})

const emit = defineEmits(['save', 'saved'])
const credentials = reactive({
    username: '',
    password: '',
})
const showPassword = ref(false)
const state = reactive(new State())

function reset(resetState=true) {
    $reset(credentials, {"username": "", password: ""})
    resetState && state.none()
}

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
        state.ok(error?.message || error)
    }
}
</script>
