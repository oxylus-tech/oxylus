<template>
    <v-app-bar color="primary" v-bind="attrs">
        <slot name="prepend" />
        <v-app-bar-title>
            <template v-if="title">
                <v-icon v-if="icon" :icon="icon"/>
                {{ title }}
            </template>
            <slot v-else name="title" />
        </v-app-bar-title>

        <div id="app-bar-after-title"/>
        <div id="app-bar-actions">&nbsp;</div>
        <slot name="actions" />


        <!-- views navigation -->
        <template v-if="views && views.size > 1">
            <v-btn-toggle
                    class="ml-3" color="secondary" density="compact" variant="tonal"
                    v-model="router.location.view" mandatory>
                <template v-for="([category, items], index) of byCategories">
                    <v-divider v-if="index != 0" />
                    <v-btn v-for="view of items"
                        :value="view.name"
                        :disabled="view.disabled === true"
                        :title="view.title" :aria-label="view.title">
                        <v-icon v-if="view.icon">{{ view.icon }}</v-icon>
                        <template v-else>{{ view.title }}</template>
                    </v-btn>
                </template>
            </v-btn-toggle>

            <!-- <v-btn v-if="props.help" class="ml-3"
                :href="props.help" target="new"
                icon="mdi-information-outline" /> -->

        </template>

        <slot name="append" />
    </v-app-bar>
</template>
<script setup lang="ts">
import { computed, unref, useAttrs } from 'vue'
import { useRouter } from '@oxylus/ox'
import { viewCategories } from '../composables/router'

const attrs = useAttrs()
const router = useRouter()

const title = computed(() => {
    const val = router.panel.value?.title
    return val && unref(val) || null
})
const icon = computed(() => {
    const val = router.panel.value?.icon
    return val && unref(val) || null
})


const views = computed(() => router.panel?.value?.views)
const byCategories = computed(() => {
    if(!views?.value.size)
        return

    const cats = {}
    for(var view of views.value.values()) {
        cats[view.category] ??= []
        cats[view.category].push(view)
    }
    return viewCategories.filter(k => cats[k])
                         .map((k) => [k, cats[k]])
})

</script>
