<template>
    <v-container>
        <ox-state-alert :state="editor.state"/>
        <div class="mb-3">
            <ox-validation-btn v-if="editor.edited"
                @validate="editor.save()" @reset="editor.reset()" :state="editor.state" :validate-disabled="!form.isValid"/>
        </div>
        <v-expansion-panels mandatory multiple :model-value="['info']">
            <v-expansion-panel title="Information" value="info">
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
            <v-expansion-panel title="Permissions" v-if="editor.value.id">
                <template #text>
                    <v-expansion-panel-text>
                        <ox-edit-permissions :group="editor.value"
                            v-model="editor.value.permissions_id"/>
                    </v-expansion-panel-text>
                </template>
            </v-expansion-panel>
        </v-expansion-panels>
    </v-container>
</template>
<script setup>
import {defineProps, defineEmits, inject, toRefs, reactive, useTemplateRef} from 'vue'

import OxFieldDetails from 'ox/components/OxFieldDetails.vue'
import OxStateAlert from 'ox/components/OxStateAlert.vue'
import OxValidationBtn from 'ox/components/OxValidationBtn.vue'

import { modelEditor } from "ox/composables/edit"


const emits = defineEmits(['saved',])
const repos = inject('repos')

const props = defineProps({
    initial: Object,
})
const {initial} = toRefs(props)
const form = useTemplateRef('form')

const panel = inject("panel")
const editor = modelEditor({
    name: "group-editor",
    panel, initial, emits,
    repo: repos.groups,
})
</script>
