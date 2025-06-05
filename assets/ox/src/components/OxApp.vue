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
            </template>
            <v-app-bar-title id="app-bar-sheet-title"/>
            <v-app-bar-title id="app-bar-title">
                <slot name="title" :context="context"/>
            </v-app-bar-title>
            <slot name="app-bar-left" :context="context"></slot>
            <div id="app-bar-right" class="mr-3"></div>
            <slot name="app-bar-right" :context="context"></slot>
        </v-app-bar>
        <ox-app-nav v-model:drawer="nav.drawer" :items="context.data.nav">
            <template #prepend>
                <a class="nav-home">
                    <v-img v-if="logo" :src="logo" class="logo"/>
                </a>
                <slot name="nav-start" :context="context"></slot>
            </template>
            <template #append v-if="slots['nav-end']">
                <v-list v-model:opened="nav.opened">
                    <slot name="nav-end" :context="context"></slot>
                </v-list>
            </template>
        </ox-app-nav>
        <v-main>
            <slot name="main">
                <v-tabs-window v-model="panels.panel">
                    <template #default="bind">
                        <slot name="default" v-bind="bind" :context="context"></slot>

                        <v-tabs-window-item v-for="(name, slot) in panelsSlots" :key="slot" :value="name">
                            <slot :name="slot" v-bind="bind" :context="context"/>
                        </v-tabs-window-item>
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

import {useAppContext, usePanels, t, filterSlots} from 'ox'
import type {Model} from '../models'
import OxAppNav from './OxAppNav'

const slots = useSlots()
const panelsSlots = filterSlots(slots, "panels.")

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
