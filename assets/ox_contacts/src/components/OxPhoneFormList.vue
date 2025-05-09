<template>
    <ox-form-list v-model="items">
        <template #item.title="{item}">
            {{ item.number }}
        </template>
        <template #item="{item,index}">
            <v-list-item>
                <!-- FIXME -->
                <ox-phone-form variant="underlined" :item="item"/>
            </v-list-item>
        </template>
        <template #item.actions="{item}">
            <v-btn size="small" :href="`tel:${item.number}`" icon="mdi-phone" color="primary"/>
        </template>
    </ox-form-list>
</template>
<script setup lang="ts">
import {defineModel} from 'vue'
import {OxFormList} from 'ox/components'
import OxPhoneForm from './OxPhoneForm'

const items = defineModel()
</script>
