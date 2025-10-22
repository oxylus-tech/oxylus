<template>
    <v-text-field
        v-model="displayIban"
        :label="props.label || 'IBAN'"
        :rules="[validateIban]"
    >
        <template #prepend-inner v-if="country">
            {{ country.flag }}
        </template>
        <template #append v-if="country && country.$currency">
            {{ country.$currency.code }}
        </template>
    </v-text-field>
    <p v-if="country" class="v-messages">
        <div v-if="country.iban_sample">
            <v-icon icon="mdi-help-circle-outline"/>
            {{ t('fields.iban.help', {'name': country.name, 'sample': country.iban_sample || '...' }) }}
        </div>
        <div v-else class="text-warning">
            <v-icon icon="mdi-alert-circle-outline"/>
            {{ t('fields.iban.country_without_iban', {'name': country.name}) }}
        </div>
    </p>
</template>

<script setup lang="ts">
import { computed, defineProps, defineModel, ref, watch } from 'vue';
import { t, query } from '@oxylus/ox'
import { useLocationModels } from '../composables';

const {countries, currencies} = useLocationModels()
query(countries).allOnce()
query(currencies).allOnce()

const props = defineProps({
    label: String,
})
const rawIban = defineModel({type: String, default: ''});
const displayIban = ref('');
const countryCode = computed(() =>
  rawIban.value.length >= 2 ? rawIban.value.substring(0, 2).toUpperCase() : ''
);

const country = computed(() => countryCode.value && countries.where('code', countryCode.value).with('$currency').first() || null)

watch(displayIban, (val, old) => {
    if(val != old) {
        const raw = toRaw(val)
        if(rawIban.value != raw)
            rawIban.value = raw
    }
})

watch(rawIban, (val, old) => {
    if(val != old) {
        const display = toDisplay(val)
        if(displayIban.value != display)
            displayIban.value = display
    }
})


function toRaw(value) {
    return value.replace(/\s+/g, '').toUpperCase();
}


function toDisplay(value) {
  return value
    .replace(/\s+/g, '')
    .replace(/[^A-Z0-9]/gi, '')
    .toUpperCase()
    .match(/.{1,4}/g)
    ?.join(' ') || '';
}


function validateIban(value) {
  const cleaned = value.replace(/\s+/g, '').toUpperCase();

  const expectedLen = country.value?.iban_length
  if (cleaned.length < 15)
      return t('fields.iban.too_short');

  const rearranged = cleaned.slice(4) + cleaned.slice(0, 4);
  const expanded = rearranged
    .split('')
    .map(ch => (isNaN(ch) ? ch.charCodeAt(0) - 55 : ch))
    .join('');

  const mod = BigInt(expanded) % 97n;
  return mod === 1n || t('fields.iban.invalid_checksum');
}
</script>
