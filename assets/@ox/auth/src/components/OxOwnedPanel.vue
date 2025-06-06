<template>
    <ox-model-panel v-bind="attrs">
        <template v-for="(_, name) in slots" :key="name" #[name]="bind">
            <slot :name="name" v-bind="bind" :owner="agent?.item" v-if="name != 'app-bar-right'"/>
        </template>

        <template #app-bar-right="{panel, list, ...bind}">
            <ox-agent-select ref="agent" v-model="list.filters.owner__uuid" :user="user"
                menu :disabled="panel.view.startsWith('detail')" />
            <slot name="app-bar-right" :panel="panel" :list="list" :owner="agent?.item" v-bind="bind"/>
        </template>
    </ox-model-panel>
</template>
<script setup lang="ts">
import { useAttrs, ref, inject, useSlots, watch } from 'vue'
import {reset} from 'ox'
import {OxModelPanel} from 'ox/components'
import OxAgentSelect from './OxAgentSelect'

const slots = useSlots()
const attrs = useAttrs()
const user = inject('user')
const agent = ref(null)
</script>
