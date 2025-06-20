<template>
    <slot name="default" :props="fieldProps" :editor="props.editor">
        <template v-if="props.type == 'select'">
            <v-select v-bind="fieldProps" v-model="props.editor.value[props.name]" />
        </template>
        <template v-else-if="props.type == 'textarea'">
            <v-textarea v-bind="fieldProps" v-model="props.editor.value[props.name]" />
        </template>
        <template v-else-if="props.type == 'checkbox'">
            <v-checkbox v-bind="fieldProps"
                v-model="props.editor.value[props.name]"/>
        </template>
        <template v-else-if="props.type == 'date'">
            <v-date-input v-bind="fieldProps"
                v-model="props.editor.value[props.name]"/>
        </template>
        <template v-else>
            <v-text-field v-bind="fieldProps" v-model="props.editor.value[props.name]"  :type="props.type"/>
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
 */

import {computed, useAttrs} from 'vue'
import {t, te, rules} from 'ox'


const attrs = useAttrs()
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
     * - any other value: `v-text-field` with supplied type;
     */
    type: String,
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
        ...attrs
    }

    if(te(helpKey)) {
        obj["hint"] = t(helpKey)
        obj["aria-description"] = t(helpKey)
    }

    if(props.required)
        obj['rules'].push(rules.required)
    return obj
})

</script>
