<template>
    <ox-model-edit v-bind="attrs" :repo="repos.currencies">
        <template #default="{editor}">
            <v-row>
                <v-col>
                    <ox-field :editor="editor" name="name" required/>
                </v-col>
                <v-col cols="2">
                    <ox-field :editor="editor" name="code" required/>
                </v-col>
                <v-col cols="2">
                    <ox-field :editor="editor" name="numeric" />
                </v-col>
            </v-row>
            <ox-field :editor="editor" name="is_iso" type="checkbox"/>
            <ox-field :editor="editor" name="valid_to" type="date"/>
        </template>
    </ox-model-edit>
</template>
<script setup lang="ts">
import { useAttrs } from 'vue'
import {OxModelEdit, OxField} from '@oxylus/ox/components'

import {useCurrencies} from '../composables'

const repos = useCurrencies()
const attrs = useAttrs()
</script>
