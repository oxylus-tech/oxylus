<template>
    <v-row>
        <v-col>
            <ox-contact-input ref="input" v-model="selection"
                multiple density="compact" hide-details/>
        </v-col>
        <v-col cols="1">
            <v-btn icon="mdi-plus" size="small" class="mb-3"
                :title="t('actions.add')"
                :aria-label="t('actions.add')"
                @click="add()"/>
        </v-col>
    </v-row>
    <ox-model-list ref="modelList" :repo="repos.contacts" class="grid"
            v-bind="attrs" v-model="ids" editable>
        <template #item="{item}">
            <v-list-item-title>
                <ox-contact-name :item="item"/>
            </v-list-item-title>
        </template>
    </ox-model-list>
</template>
<script setup lang="ts">
import {defineModel, inject, ref, useAttrs} from 'vue'
import { t } from '@oxylus/ox'
import { OxModelList } from '@oxylus/ox/components'
import OxContactInput from './OxContactInput.vue'
import OxContactName from './OxContactName.vue'

const repos = inject('repos')
const ids = defineModel()
const attrs = useAttrs()

const input = ref(null)
const selection = ref([])
const modelList = ref()

function add() {
    modelList.value.list.updateWith(input.value.selected, true)
    selection.value = []
}
</script>
