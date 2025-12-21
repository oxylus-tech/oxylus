<template>
    <v-dialog v-model="dialog.open">
        <v-card>
            <v-card-title v-if="dialog.value">
                <template v-if="dialog.add && props.useModel">
                    {{ t('actions.new_item', {name: props.useModel.meta.verbose_name}) }}
                </template>
                <template v-else-if="dialog.add">{{ t('actions.add_item') }}</template>
                <template v-else>
                    {{ t('actions.edit_item', {name: dialog.value.$title}) }}
                </template>
            </v-card-title>
            <v-card-text>
                <v-form :disabled="!dialog.editable" v-if="dialog.item" v-model="dialog.valid">
                    <slot name="item.form" :item="dialog.value"/>
                </v-form>
            </v-card-text>
            <v-card-actions>
                <v-btn
                    color="error" prepend-icon="mdi-cancel"
                    :aria-label="t('actions.discard')"
                    @click="close()" >
                    {{ t('actions.discard') }}
                </v-btn>
                <v-btn :disabled="!dialog.valid"
                    color="primary" prepend-icon="mdi-content-save"
                    :aria-label="t('actions.save')"
                    @click="save()" >
                    {{ t('actions.save') }}
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
    <v-list v-model:opened="opened">
        <template v-if="items?.length">
            <ox-form-list-item v-for="item, index in items" :key="index" :value="index"
                    :item="item" :remove="can.delete"
                    @remove="removeItem(index)">
                <template #default="bind">
                    <slot name="item" v-bind="bind" :index="index" />
                </template>
                <template #actions="bind">
                    <slot name="item.actions" :item="item" :index="index" :editable="can.change" />

                    <v-btn size="small" color="primary" icon="mdi-pencil" class="ml-1"
                        :title="t('actions.edit')"
                        :aria-label="t('actions.edit')"
                        @click="edit(item)" />
                </template>
            </ox-form-list-item>
        </template>
        <v-list-item v-else :title="t('lists.empty')">
            <template #append v-if="can.add">
                <v-btn size="small" color="primary" prepend-icon="mdi-plus"
                    @click="edit()"
                    :aria-label="t('actions.discard')">
                    {{ t('actions.add_item') }}
                </v-btn>
            </template>
        </v-list-item>
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
import {t, tKey} from "@oxylus/ox"

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
const dialog = reactive({
    open: false,
    item: null,
    add: false
})

if(!items.value?.length)
    opened.value.push(-1)

function edit(item=null) {
    dialog.add = item === null
    dialog.editable = dialog.add ? can.value.add : can.value.change
    dialog.item = item || new props.useModel({})
    dialog.value = new props.useModel({...dialog.item})
    dialog.open = true
}

function close() {
    dialog.open = false
    dialog.item = null
    dialog.value = null
}

function save() {
    if(dialog.add)
        items.value.push(props.useModel({...dialog.value}))
    else
        Object.assign(dialog.item, dialog.value)
    close()
}


function removeItem(index) {
    if(confirm(t('actions.delete.confirm')))
        items.value.splice(index, 1)
}
</script>
