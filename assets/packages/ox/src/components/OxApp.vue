<template>
    <v-app>
        <v-snackbar v-model="context.showState" :color="context.state.color" multi-line>
            {{ context.state.toString() }}
        </v-snackbar>
        <v-app-bar color="primary">
            <!-- @slot Prepend on app bar -->
            <template v-slot:prepend>
                <v-app-bar-nav-icon v-if="slots['nav-start'] || slots['nav-end']" icon="mdi-apps"
                    :title="t('nav.panels')" :aria-label="t('nav.panels')"
                    @click.stop="nav.drawer = !nav.drawer"/>
            </template>
            <v-app-bar-title id="app-bar-sheet-title"/>
            <v-app-bar-title id="app-bar-title">
                <!-- @slot App bar bar title -->
                <slot name="title"/>
            </v-app-bar-title>
            <!-- @slot Left side of app bar -->
            <slot name="app-bar-left"></slot>
            <div id="app-bar-right" class="mr-3"></div>
            <!-- @slot Right side of app bar -->
            <slot name="app-bar-right"></slot>
            <v-menu v-if="context.data?.languages?.length">
                <template #activator="{props}">
                    <v-btn icon="mdi-translate" v-bind="props"
                        :title="t('actions.select.translation')"
                        :aria-label="t('actions.select.translation')"/>
                </template>

                <v-list>
                    <v-list-item v-for="lang in context.data.languages"
                        :title="lang[1]" :aria-label="lang[1]"
                        :value="lang[0]"
                        @click="setLanguage(lang[0])">
                        <template #prepend>
                            <span class="mr-2">
                                {{ getCountryFlag(lang[0]) }}
                            </span>
                        </template>
                    </v-list-item>
                </v-list>
            </v-menu>
        </v-app-bar>
        <ox-app-nav v-if="slots['nav-start'] || slots['nav-end']" v-model:drawer="nav.drawer" :items="context.data.nav">
            <template #prepend>
                <a class="nav-home" href="/">
                    <v-img v-if="logo" :src="logo" class="logo"/>
                </a>
                <!-- @slot Top of navigation drawer -->
                <slot name="nav-start" :context="context"></slot>
            </template>
            <template #append v-if="slots['nav-end']">
                <v-list v-model:opened="nav.opened">
                    <!-- @slot Bottom of navigation drawer -->
                    <slot name="nav-end" :context="context"></slot>
                </v-list>
            </template>
        </ox-app-nav>
        <v-main>
            <!-- @slot Inside `v-main` -->
            <slot name="main">
                <v-tabs-window v-model="panels.panel">
                    <template #default="bind">
                        <!-- @slot Inside `v-tabs-window` -->
                        <slot name="default" v-bind="bind" :context="context"></slot>

                        <v-tabs-window-item v-for="(name, slot) in panelsSlots" :key="slot" :value="name">
                            <!-- @slot Each slot declared with prefix `panels.` will be put in a `v-tabs-window-item`. -->
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
/**
 * @component Application component, handling navigation and page layout.
 *
 * This is the main component loading application data and context, while
 * providing the page layout.
 *
 * Provide: `context`, `user`.
 *
 * ## Application layout
 *
 * **App bar**: bar at the top of the page, using `v-app-bar` and friends;
 *
 * **Sidebar**: uses {@link OxAppNav}
 *
 * **Main**: a `v-main` which has by default a `v-tabs-window` in which each panel
 * will be put. To add a panel, use template prefix `panels.`
 *
 * ```xml
 * <ox-app>
 *     <template #panels.custom="{}">
 *         <!-- my-custom-panel -->
 *     </template>
 * </ox-app>
 *
 * ```
 */

import { useSlots, withDefaults, onErrorCaptured, onMounted } from 'vue'
import { computed, defineProps, inject, provide, reactive, watch } from 'vue'

import {useAppContext, usePanels, t, filterSlots, getCountryFlag} from '@oxylus/ox'
import type {Model} from '../models'
import config from '../config'
import OxAppNav from './OxAppNav.vue'

const slots = useSlots()
const panelsSlots = filterSlots(slots, "panels.")

interface Props {
    /** Base url for API **/
    apiUrl?: string
    /** Sidebar logo **/
    logo?: string
    dataEl?: string
    models?: Model[]
    /** Data to load **/
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


async function setLanguage(lang) {
    const resp = await fetch(`${props.apiUrl}ox/core/conf/set-language/`, {
        method: "POST",
        headers: config.axiosConfig.headers,
        body: JSON.stringify({"language": lang})
    })
    window.location.reload()
}

</script>
