<template>
    <ox-form-list v-model="items">
        <template #item.title="{item}">
            {{ item.email }}
        </template>
        <template #item="{item,index}">
            <v-list-item>
                <!-- FIXME -->
                <ox-email-input :item="item"/>
            </v-list-item>
        </template>
        <template #item.actions="{item}">
            <v-btn size="small" :href="`mailto:${item.email}`" icon="mdi-mail" color="primary"/>
        </template>
    </ox-form-list>
</template>
<script setup lang="ts">
import {defineModel} from 'vue'
import {OxFormList} from 'ox/components'
import OxEmailInput from './OxEmailInput'

const items = defineModel()
</script>
