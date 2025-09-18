<template>
    <ox-autocomplete :repo="repos.persons"
        item-value="id" item-title="full_name"
        lookup="search" v-model="value" v-bind="attrs"
        >
        <template v-for="_, slot in slots" #[slot]="bind">
            <slot :name="slot" v-bind="bind"/>
        </template>
    </ox-autocomplete>
</template>
<script setup lang="ts">
import {useAttrs, useSlots, defineModel} from 'vue'
import {useModels} from '@oxylus/ox'
import {OxAutocomplete} from '@oxylus/ox/components'
import {Person} from '../models'

const slots = useSlots()
const attrs = useAttrs()
const value = defineModel()
const repos = useModels([Person])
</script>
