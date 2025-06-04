<template>
    <ox-autocomplete :repo="repos.folders" lookup="search"
        item-value="id" item-title="path"
        v-model="value" v-bind="attrs"
        :filters="{owner__uuid: props.owner}"
        >
        <template v-for="_, slot in slots" #[slot]="bind">
            <slot :name="slot" v-bind="bind"/>
        </template>
    </ox-autocomplete>
</template>
<script setup lang="ts">
import {useAttrs, useSlots, defineModel, defineProps} from 'vue'
import {query} from 'ox'
import {OxAutocomplete} from 'ox/components'
import {useFolders} from '../composables'

const slots = useSlots()
const attrs = useAttrs()
const props = defineProps({
    owner: String
})
const value = defineModel()
const repos = useFolders()
</script>
