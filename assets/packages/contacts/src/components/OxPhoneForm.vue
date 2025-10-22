<template>
    <v-row>
        <v-col>
            <v-phone-input v-model="props.item.number" :label="t('fields.phone')"/>
        </v-col>
        <v-col cols="4">
            <ox-kind-input v-model="props.item.kind" />
        </v-col>
    </v-row>
</template>
<script setup lang="ts">
import {defineProps} from 'vue'
// import 'flag-icons/css/flag-icons.min.css';
import 'v-phone-input/dist/v-phone-input.css';
import { VPhoneInput } from 'v-phone-input';

import {t} from '@oxylus/ox'
import OxKindInput from './OxKindInput.vue'

const props = defineProps({
    item: Object
})
</script>
