<template>
    <v-app>
        <v-snackbar v-model="context.showState" :color="context.state.color" multi-line>
            {{ context.state.data }}
        </v-snackbar>
        <v-app-bar color="primary">
            <template v-slot:prepend>
                <v-app-bar-nav-icon icon="mdi-apps"
                    :title="t('nav.panels')" :aria-label="t('nav.panels')"
                    @click.stop="nav.drawer = !nav.drawer"/>
                <v-app-bar-nav-icon v-if="slots['app-nav'] && !nav.drawer2"
                    icon="mdi-menu"
                    @click="nav.drawer2 = true; nav.drawer = false"/>
            </template>
            <v-app-bar-title id="app-bar-sheet-title"/>
            <v-app-bar-title id="app-bar-title">
                <slot name="title" :context="context"/>
            </v-app-bar-title>
            <v-spacer/>
            <slot name="app-bar-left" :context="context"></slot>
            <div id="app-bar-right" class="mr-3"></div>
            <slot name="app-bar-right" :context="context"></slot>
        </v-app-bar>
        <v-navigation-drawer theme="dark" v-model="nav.drawer">
            <a class="nav-home">
                <v-img v-if="logo" :src="logo" class="logo"/>
            </a>
            <slot name="nav-start" :context="context"></slot>
            <slot name="nav-list" :context="context"></slot>
            <template #append v-if="slots['nav-end']">
                <slot name="nav-end" :context="context"></slot>
            </template>
        </v-navigation-drawer>
        <v-main>
            <slot name="main">
                <v-tabs-window v-model="panels.panel">
                    <template #default="bind">
                        <slot name="default" v-bind="bind" :context="context"></slot>
                    </template>
                </v-tabs-window>
            </slot>
        </v-main>
    </v-app>
</template>
<style>
.nav-home {
    display: block;
    text-align: left;
}
.nav-home .logo {
    max-height: 4em;
    margin: 1em 1em 0.4em 1em;
}
</style>
<script setup lang="ts">
import { useSlots, withDefaults, onErrorCaptured, onMounted } from 'vue'
import { computed, defineProps, inject, provide, reactive, watch } from 'vue'

import {useAppContext, usePanels} from 'ox'
import type {Model} from '../models'

import { t } from 'ox'

const slots = useSlots()

interface Props {
    apiUrl?: string
    logo?: string
    dataEl?: string
    models?: Model[]
    data?: object
}

const props = withDefaults(defineProps<Props>(), {
    dataEl: document.body.dataset?.appData
})

const nav = reactive({drawer: true})

const context = useAppContext(props)
const panels = usePanels()

onMounted(() => { panels.panel = context.data.panel })

watch(() => [context.state.state, context.state.data], () => {
    context.showState = true
})

onErrorCaptured((err, instance, info) => {
    context.state.error(`${err}`)
})


</script>
