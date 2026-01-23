<template>
    <v-tabs-window-item v-if="view.sections.size>1" :value="section.name">
        <slot name="default" v-bind="infos" :view="view" :section="section" />
    </v-tabs-window-item>
    <template v-else>
        <slot name="default" v-bind="infos" :view="view" :section="section" />
    </template>
</template>
<script setup lang="ts">
/**
 * @component A section in a view.
 */
import { withDefaults } from 'vue'
import { useSection, type SectionDefinition  } from '@oxylus/ox'

const props = defineProps<SectionDefinition>()
const {view, section, ...infos} = useSection({name: props.name, title: props.title })
</script>
