<template>
    <v-list v-model:opened="opened">
        <template v-if="items?.length">
             <v-list-group v-for="item, index in items" :key="index" :value="index">
                <template #activator="{props}">
                    <v-list-item v-bind="props">
                        <v-list-item-title>
                            <slot name="item.title" :item="item"/>
                        </v-list-item-title>
                        <template #append>
                            <div @click.stop="">
                                <slot name="item.actions" :item="item" :index="index" v-bind="props" />
                                <template v-if="can.delete">
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
                <v-form :disabled="!can.change">
                    <slot name="item" :item="item" :index="index" :editable="can.change"/>
                </v-form>
            </v-list-group>
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
                    <slot name="item" :item="newItem" :edit="true"/>
                </v-form>
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
<script setup lang="ts">
/**
 * This component provides simple list rendering and edition.
 */
import {computed, defineModel, defineProps, inject, ref, reactive, provide, useTemplateRef, toRefs} from "vue"
import {t} from "ox"

/** v-model: the list of items. **/
const items = defineModel()
const user = inject('user')
const newItem = ref({})
const props = defineProps({
    useModel: Function,
    editable: Boolean,
})

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
        props.delete && items.value.splice(index)
}
</script>
