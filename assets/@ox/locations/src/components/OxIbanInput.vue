<template>
    <v-text-field
        v-model="formattedIban"
        label="IBAN"
        :rules="[validateIban]"
        @input="onInput"
        :placeholder="`e.g. ${exampleIban}`"
    />
    <p v-if="countryCode" class="text-caption mt-1">
        Detected country: <strong>{{ countryCode }}</strong>
    </p>
</template>

<script setup lang="ts">
import { defineModel, ref, computed } from 'vue';

const ibanRaw = defineModel({type: String, default: ''});
const formattedIban = ref('');
const countryCode = computed(() =>
  ibanRaw.value.length >= 2 ? ibanRaw.value.substring(0, 2).toUpperCase() : ''
);

// Example IBANs for UX help
const exampleIbanByCountry = {
  DE: 'DE89 3704 0044 0532 0130 00',
  FR: 'FR14 2004 1010 0505 0001 3M02 606',
  IT: 'IT60 X054 2811 1010 0000 0123 456',
  NL: 'NL91 ABNA 0417 1643 00',
  ES: 'ES91 2100 0418 4502 0005 1332',
};

const exampleIban = computed(() => exampleIbanByCountry[countryCode.value] || '');

// IBAN input formatter
function formatIban(value) {
  return value
    .replace(/\s+/g, '')
    .replace(/[^A-Z0-9]/gi, '')
    .toUpperCase()
    .match(/.{1,4}/g)
    ?.join(' ') || '';
}

// Handle input & formatting
function onInput({target}) {
  ibanRaw.value = target.value.replace(/\s+/g, '').toUpperCase();
  formattedIban.value = formatIban(ibanRaw.value);
}

// IBAN checksum validator (mod 97)
function validateIban(value) {
  const cleaned = value.replace(/\s+/g, '').toUpperCase();
  if (cleaned.length < 15) return 'IBAN too short';

  const rearranged = cleaned.slice(4) + cleaned.slice(0, 4);
  const expanded = rearranged
    .split('')
    .map(ch => (isNaN(ch) ? ch.charCodeAt(0) - 55 : ch))
    .join('');

  const mod = BigInt(expanded) % 97n;
  return mod === 1n || 'Invalid IBAN checksum';
}
</script>
