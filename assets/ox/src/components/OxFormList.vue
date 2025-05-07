<template>
    <v-list v-model:opened="opened">
        <v-list-group v-for="item, index in items" :key="index" :value="index">
            <template #activator="{props}">
                <v-list-item v-bind="props">
                    <v-list-item-title>
                        <slot name="item.title" :item="item"/>
                    </v-list-item-title>
                    <template #append>
                        <div @click.stop="">
                            <slot name="item.actions" :item="item" :index="index" :editable="editable" />
                            <template v-if="editable">
                                <v-btn type="button" class="ml-2" size="small"
                                    @click.stop.prevent="removeItem(index)" color="error"
                                    :aria-label="t('actions.remove')"
                                    :title="t('actions.remove')"
                                    icon="mdi-delete"/>
                            </template>
                        </div>
                    </template>
                </v-list-item>
            </template>
            <slot name="item" :item="item" :index="index"/>
        </v-list-group>
        <v-divider v-if="items.length"/>
        <template v-if="editable">
            <v-list-group :value="-1">
                <template #activator="{props}">
                    <v-list-item v-bind="props" :title="t('actions.add_item')" prepend-icon="mdi-plus"/>
                </template>
                <slot name="item" :item="newItem" :edit="true"/>
                <v-list-item v-if="newItem">
                    <div class="flex-row justify-right">
                        <v-btn size="small" v-if="newItem" @click="newItem={}"
                            color="secondary" prepend-icon="mdi-backspace"
                            :aria-label="t('actions.discard')">
                            {{ t('actions.discard') }}
                        </v-btn>
                        <v-btn size="small" v-if="newItem" @click="addItem()"
                            color="primary" prepend-icon="mdi-plus"
                            :aria-label="t('actions.add')">
                            {{ t('actions.add') }}
                        </v-btn>
                    </div>
                </v-list-item>
            </v-list-group>
        </template>
    </v-list>
</template>
<style>
.flex-row {

}
</style>
<script setup lang="ts">
/**
 * This component provides simple list rendering and edition.
 */
import {defineModel, defineProps, ref, reactive, provide, useTemplateRef, toRefs} from "vue"
import {t} from "ox"

/** v-model: the list of items. **/
const items = defineModel()
const newItem = ref({})
const props = defineProps({
    /** Allow to add and edit items */
    editable: {type: Boolean, default: true},
})
const {editable} = toRefs(props)

const opened = ref([]);

if(!items.value.length)
    opened.value.push(-1)

function addItem() {
    items.value.push(newItem.value)
    newItem.value = {}
}

function removeItem(index) {
    if(confirm(t('actions.delete.confirm')))
        props.editable && items.value.splice(index)
}
</script>
