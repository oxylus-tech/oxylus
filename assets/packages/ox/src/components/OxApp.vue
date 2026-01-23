<template>
    <v-app>
        <v-snackbar v-model="app.state.show" :color="app.state.color" multi-line>
            {{ app.state.toString() }}
        </v-snackbar>
        <ox-app-bar color="primary">
            <!-- @slot Prepend on app bar -->
            <template #prepend>
                <v-app-bar-nav-icon v-if="slots['nav-start'] || slots['nav-end']" icon="mdi-apps"
                    :title="t('nav.panels')" :aria-label="t('nav.panels')"
                    @click.stop="nav.drawer = !nav.drawer"/>
            </template>

            <template #append>
                <v-menu v-if="app.data?.languages?.length">
                    <template #activator="{props}">
                        <v-btn icon="mdi-translate" class="ml-2"
                            v-bind="props"
                            :title="t('actions.select.translation')"
                            :aria-label="t('actions.select.translation')"/>
                    </template>

                    <v-list>
                        <v-list-item v-for="lang in app.data.languages"
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
            </template>
        </ox-app-bar>
        <ox-app-nav v-if="slots['nav-start'] || slots['nav-end']" v-model:drawer="nav.drawer" :items="app.data.nav">
            <template #prepend>
                <a class="nav-home" href="/">
                    <v-img v-if="logo" :src="logo" class="logo"/>
                </a>
                <!-- @slot Top of navigation drawer -->
                <slot name="nav-start" :app="app"></slot>
            </template>
            <template #append v-if="slots['nav-end']">
                <v-list v-model:opened="nav.opened">
                    <!-- @slot Bottom of navigation drawer -->
                    <slot name="nav-end" :app="app"></slot>
                </v-list>
            </template>
        </ox-app-nav>
        <v-main>
            <!-- @slot Inside `v-main`. -->
            <slot name="default">
                <v-window v-model="router.location.panel" crossfade>
                    <template v-for="(node, index) in panelNodes" :key="node.key ?? index">
                        <v-window-item :value="node.props?.name || node.key || index">
                            <component :is="node"/>
                        </v-window-item>
                    </template>
                </v-window>
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
 * This is the main component loading application data and app, while
 * providing the page layout.
 *
 * Provide: `state`, `user`, `appData`.
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

import {useApp, t, filterSlots, getCountryFlag, createRouter} from '@oxylus/ox'
import type {Model} from '../models'
import config from '../config'
import OxAppNav from './OxAppNav.vue'
import OxAppBar from './OxAppBar.vue'

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

const app = useApp(props)
const router = createRouter()

onErrorCaptured((err, instance, info) => {
    app.state.error(`${err}`)
})


const panelNodes = computed(() => {
    const slotFn = slots.panels
    return slotFn ? slotFn() : []
})


/** Change current language **/
async function setLanguage(lang: string) {
    const resp = await fetch(`${props.apiUrl}ox/core/conf/set-language/`, {
        method: "POST",
        headers: config.axiosConfig.headers,
        body: JSON.stringify({"language": lang})
    })
    window.location.reload()
}


onMounted(() => { router.location.panel ??= app.data.panel })
</script>
