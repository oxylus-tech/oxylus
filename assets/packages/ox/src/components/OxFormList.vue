<template>
    <v-list v-model:opened="opened">
        <template v-if="items?.length">
            <template v-if="can.change">
                 <v-list-group v-for="item, index in items" :key="index" :value="index">
                    <template #activator="{props}">
                        <ox-form-list-item :item="item" v-bind="props"
                                :remove="can.delete"
                                @remove="removeItem(index)">
                            <template #default="{item}">
                                <slot name="item" :item="item" :index="index"/>
                            </template>
                            <template #actions="{item}">
                                <slot name="item.actions" :item="item" :index="index"/>
                            </template>
                        </ox-form-list-item>
                    </template>
                    <v-form :disabled="!can.change">
                        <slot name="item.form" :item="item" :index="index" :editable="can.change"/>
                    </v-form>
                </v-list-group>
            </template>
            <template v-else>
                <template v-for="item, index in items" :key="index">
                    <ox-form-list-item :item="item" v-bind="props"
                            :value="index"
                            :remove="can.delete"
                            @remove="removeItem(index)">
                        <template #default="{item}">
                            <!--
                                @slot Item's content.
                                     @binding {object} item item being displayed
                                     @binding {number} index item's index.
                             -->
                            <slot name="item" :item="item" :index="index"/>
                        </template>
                        <template #actions="{item}">
                            <!-- @slot Item' actions content.
                                 @binding {object} item item being displayed
                                 @binding {number} index item's index. -->
                            <slot name="item.actions" :item="item" :index="index"/>
                        </template>
                    </ox-form-list-item>
                </template>
            </template>
        </template>
        <template v-else>
            <v-list-item :title="t('lists.empty')" />
        </template>
        <template v-if="can.add">
            <v-divider v-if="items.length"/>
            <v-list-group :value="-1">
                <template #activator="{props}">
                    <v-list-item v-bind="props" :title="t('actions.add_item')" prepend-icon="mdi-plus"/>
                </template>
                <v-form>
                    <!-- @slot Item' edit and add form.
                         @binding {object} item item being edited
                         @binding {number} index item's index.
                         @binding {boolean} editable true if content is editable. -->
                    <slot name="item.form" :item="newItem" :edit="true"/>
                </v-form>
                <v-list-item v-if="newItem">
                    <div v-if="Object.values(newItem).length"
                            class="flex-row justify-right">
                        <v-btn size="small" color="secondary" prepend-icon="mdi-backspace"
                            @click="newItem={}"
                            :aria-label="t('actions.discard')">
                            {{ t('actions.discard') }}
                        </v-btn>
                        <v-btn  size="small" color="primary" prepend-icon="mdi-plus" class="ml-2"
                            @click="addItem()"
                            :aria-label="t('actions.add')">
                            {{ t('actions.add') }}
                        </v-btn>
                    </div>
                </v-list-item>
            </v-list-group>
        </template>
    </v-list>
</template>
<script setup lang="ts">
/**
 * @component An editable list of items.
 *
 * It wraps around `v-list` and uses {@link OxFormListItem} as items of the list.
 *
 * In a nutshell:
 * - list can be edited (remove/add item)
 * - items can be edited in place (a form is expanded);
 * - extra actions can be added on the list;
 * - add/change/delete actions will be checked agains't user permissions;
 *
 * Example of a custom form list:
 *
 * ![OxFormList Screenshot](../../../../statics/OxFormList.png)
 */
import {computed, defineModel, defineProps, inject, ref, reactive, provide, toRefs} from "vue"
import {t} from "@oxylus/ox"

import OxFormListItem from './OxFormListItem.vue'

/** @model the list of items. **/
const items = defineModel()
const user = inject('user')
const newItem = ref({})
const props = defineProps<{
    /** Model class Use this model class **/
    useModel: Function,
    /** Content is editable **/
    editable: boolean,
}>()

const can = computed(() => ({
    add: props.editable && user.can([props.useModel, 'add']),
    change: props.editable && user.can([props.useModel, 'change']),
    delete: props.editable && user.can([props.useModel, 'delete']),
}))

const opened = ref([]);

if(!items.value?.length)
    opened.value.push(-1)

function addItem() {
    items.value.push(newItem.value)
    newItem.value = {}
}

function removeItem(index) {
    if(confirm(t('actions.delete.confirm')))
        items.value.splice(index, 1)
}
</script>
