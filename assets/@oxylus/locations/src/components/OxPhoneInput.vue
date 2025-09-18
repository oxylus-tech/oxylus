<template>
    <v-phone-input v-model="props.item.number" :label="t('fields.phone')"/>
</template>
<script setup lang="ts">
import {defineProps} from 'vue'
// import 'flag-icons/css/flag-icons.min.css';
import 'v-phone-input/dist/v-phone-input.css';
import { VPhoneInput } from 'v-phone-input';

import {t} from '@oxylus/ox'

const props = defineProps({ item: Object })
</script>
