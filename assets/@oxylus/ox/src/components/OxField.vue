<template>
    <!-- @slot default slot providing all values for custom field.
        @binding {String} props field props as used by Vuetify
        @binding {ModelEditor} editor the editor
        -->
    <slot name="default" :props="fieldProps" :editor="props.editor">
        <template v-if="props.type == 'select'">
            <v-select v-bind="fieldProps"
                v-model="props.editor.value[props.name]"/>
        </template>
        <template v-else-if="props.type == 'textarea'">
            <v-textarea v-bind="fieldProps"
                v-model="props.editor.value[props.name]"/>
        </template>
        <template v-else-if="props.type == 'checkbox'">
            <v-checkbox v-bind="fieldProps"
                v-model="props.editor.value[props.name]"/>
        </template>
        <template v-else-if="props.type == 'autocomplete'">
            <ox-autocomplete v-bind="fieldProps"
                v-model="props.editor.value[props.name]">
                <template v-for="_, name in slots" :key="slot"
                    #[name]="bind">
                    <slot :name="name" v-bind="bind"/>
                </template>
            </ox-autocomplete>
        </template>
        <template v-else>
            <v-text-field v-bind="fieldProps" :type="props.type"
                v-model="props.editor.value[props.name]"/>
        </template>
    </slot>
</template>
<script setup lang="ts">
/**
 * This is a simple wrapper around form input in order to ease integration
 * with {@link Editor}, translation.
 *
 * Slots:
 * - `default`: props, editor
 *
 * Event:
 * - `update:modelValue`: value has changed
 */

import {computed, defineEmits, defineAsyncComponent, useAttrs, useSlots} from 'vue'
import {t, rules} from '@oxylus/ox'

const OxAutocomplete = defineAsyncComponent(() => import('./OxAutocomplete.vue'))

const emits = defineEmits(['update:modelValue'])
const attrs = useAttrs()
const slots = useSlots()
const props = defineProps({
    /** Field or attribute name */
    name: String,
    /** Editor to use **/
    editor: Object,
    /** If true, add a required rule */
    required: Boolean,
    /**
     * If provided, will by default generate a field depending on the value:
     *
     * - `textarea`: creates a `v-textarea`;
     * - `select`: creates a `v-select`;
     * - `checkbox`: create a `v-checkbox`;
     * - `date`: create a `v-date-input`;
     * - `autocomplete`: create a `ox-autocomplete`;
     * - any other value: `v-text-field` with supplied type;
     */
    type: String,
    /**
     * Field rules as provided to Vuetify field inputs.
     */
    rules: Array
})

const fieldProps = computed(() => {
    const helpKey = `fields.${props.name}.help`
    const obj = {
        "name": props.name,
        "label": t(`fields.${props.name}`),
        "aria-label": t(`fields.${props.name}`),
        "error-messages": props.editor.error(props.name),
        "rules": props.rules || [],
        "onUpdate:modelValue": (...args) => emits('update:modelValue', ...args),
        ...attrs
    }

    const helpText = t(helpKey)
    if(helpText != helpKey) {
        obj["hint"] = helpText
        obj["aria-description"] = helpText
    }

    if(props.required)
        obj['rules'].push(rules.required)
    return obj
})

</script>
