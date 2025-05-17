<template>
    <ox-model-edit v-bind="props" :repo="repos.groups">
        <template #default="{editor}">
            <v-expansion-panels mandatory multiple :model-value="['info']">
                <v-expansion-panel :title="t('views.edit.informations')" value="info">
                    <template #text>
                        <v-form ref="form" v-model="editor.valid">
                            <v-text-field variant="underlined" label="Group name"
                                v-model="editor.value.name">
                                <template #details>
                                    <ox-field-details :errors="editor.errors?.name"/>
                                </template>
                            </v-text-field>
                        </v-form>
                    </template>
                </v-expansion-panel>
                <v-expansion-panel :title="t('models.permissions', 2)" value='permissions' v-if="editor.value.id">
                    <template #text>
                        <v-expansion-panel-text>
                            <ox-permissions-edit :group="editor.value"
                                v-model="editor.value.permissions_id"/>
                        </v-expansion-panel-text>
                    </template>
                </v-expansion-panel>
            </v-expansion-panels>
        </template>
    </ox-model-edit>
</template>
<script setup>
import {defineProps, defineEmits, inject, toRefs, useTemplateRef} from 'vue'

import {t} from 'ox'
import {OxFieldDetails} from 'ox/components'
import OxPermissionsEdit from './OxPermissionsEdit.vue'


const emits = defineEmits(['saved',])
const repos = inject('repos')

const props = defineProps({
    initial: Object,
})
const {initial} = toRefs(props)
const form = useTemplateRef('form')

const panels = inject("panels")
const editor = inject("editor")
</script>
