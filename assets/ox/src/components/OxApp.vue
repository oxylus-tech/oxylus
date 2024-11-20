<template>
    <v-app>
        <v-app-bar color="primary">
            <template v-slot:prepend>
                <v-app-bar-nav-icon icon="mdi-apps"
                    :title="t('nav.panels')" :aria-label="t('nav.panels')"
                    @click.stop="nav.drawer = !nav.drawer"/>
                <v-app-bar-nav-icon v-if="slots['app-nav'] && !nav.drawer2"
                    icon="mdi-menu"
                    @click="nav.drawer2 = true; nav.drawer = false"/>
            </template>
            <v-app-bar-title>
                <template v-if="context.panel?.title">
                    <v-icon v-if="context.panel.icon" :icon="context.panel.icon" />

                    {{ context.panel.title }}
                </template>
                <template v-else>
                    <slot name="title" :context="context"/>
                </template>
            </v-app-bar-title>
            <v-spacer/>
            <div id="app-bar-right" class="mr-3"></div>
            <slot name="app-bar-right" :context="context"></slot>
        </v-app-bar>
        <v-navigation-drawer theme="dark" v-model="nav.drawer" v-if="slots['nav-list']">
            <slot name="nav-start" :context="context"></slot>
            <slot name="nav-list" :context="context"></slot>
            <slot name="nav-end" :context="context"></slot>
            <template #append v-if="slots['app-nav']">
                <div class="text-right pa-3">
                </div>
            </template>
        </v-navigation-drawer>
        <v-main>
            <v-tabs-window v-model="context.panel.name">
                <slot name="default" :context="context"></slot>
            </v-tabs-window>
        </v-main>
    </v-app>
</template>
<script setup lang="ts">
import { useSlots, withDefaults } from 'vue'
import { computed, defineProps, inject, provide, reactive, watch } from 'vue'

import {useAppContext} from '../composables'
import type {Model} from '../models'

// we force ox_core locales to be loaded
import { useI18n } from '../composables'
const { t } = useI18n()

const slots = useSlots()

interface Props {
    apiUrl?: string
    dataEl?: string
    models?: Model[]
    data?: object
}

const props = withDefaults(defineProps<Props>(), {
    dataEl: document.body.dataset?.appData
})

const nav = reactive({
    drawer: true,
})

const context = useAppContext(props)
</script>
