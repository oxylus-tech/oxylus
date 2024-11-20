<template>
    <v-sheet>
    <v-slide-group>
        <v-slide-group-item v-for="(header, idx) in props.headers" :key="header.value"
            v-slot="{selectedClass}">
            <v-card width="400" :class="['ma-3', selectedClass]"
                    :color="color(idx)" lines="two">
                <v-card-title>{{ header.title }}</v-card-title>
                <v-list :bg-color="color(idx)">
                    <template v-if="sorted && sorted[header.value]">
                        <template v-for="item in sorted[header.value]" :key="item.id">
                            <slot name="item" :header="header" :item="item">
                                <v-list-item :title="item[props.itemTitle]"
                                        :value="props.itemValue && item[props.itemValue]"
                                        @click="emits('click', item)">
                                    <template #append>
                                        <slot name="item.action"></slot>
                                    </template>
                                </v-list-item>
                            </slot>
                        </template>
                    </template>
                </v-list>
            </v-card>
        </v-slide-group-item>
    </v-slide-group>
    </v-sheet>
</template>
<script setup>
import { computed, defineEmits, defineProps } from 'vue'

const emits = defineEmits(['click'])
const props = defineProps({
    items: Array,
    itemTitle: String,
    itemValue: String,
    field: String,
    headers: Array,
    colors: {type: Array, default: () => [
        'purple', 'blue', 'teal', 'lime', 'orange', 'blue-gray',
        'pink', 'indigo', 'cyan', 'light-green', 'amber', 'brown',
        'red', 'deep-purple', 'light-blue', 'green', 'yellow', 'deep-orange'
    ]},
    colorVariant: {type: String, default: 'lighten-2'},
})


function color(idx) {
    idx = idx % props.colors.length
    if(props.colorVariant)
        return props.colors[idx] + '-' + props.colorVariant
    return props.colors[idx]
}


function assign(result, item, val) {
    if(result[val])
        !result[val].includes(item) && result[val].push(item)
    else
        result[val] = [item]
}

const sorted = computed(() => {
    const result = {}
    if(props.items)
        for(var item of props.items) {
            const vals = item[props.field]
            if(Array.isArray(vals)) {
                if(vals.length)
                    for(var val of vals)
                        assign(result, item, val)
                else
                    assign(result, item, null)
            }
            else
                assign(result, item, vals)
        }
    return result
})
</script>
