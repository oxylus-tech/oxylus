<template>
    <ox-model-edit v-bind="attrs" :repo="repos.contactLists">
        <template #default="{editor, editable}">
            <v-row>
                <v-col cols="2">
                    <ox-field :editor="editor" name="color" type="color" :disabled="editor.value.organisation"/>
                </v-col>
                <v-col>
                    <ox-contact-list-name v-if="editor.value.group || editor.value.organisation"
                        :item="editor.value" class="mt-4"/>

                    <ox-field v-else :editor="editor" name="name" required />
                </v-col>
            </v-row>
            <ox-field :editor="editor" name="description" type="textarea"/>
            <ox-field :editor="editor" name="is_subscription" type="checkbox"
                v-if="!editor.value.group && !editor.value.organisation"/>

            <v-expansion-panels v-if="attrs.initial.id" multiple :modelValue="['contacts']">
                <v-expansion-panel :title="t('models.contact', 2)" value="contacts" >
                    <template #text>
                        <v-row>
                            <v-col>
                                <ox-contact-input v-bind="props" multiple density="compact" hide-details/>
                            </v-col>
                            <v-col cols="2">
                                <v-btn icon="mdi-plus" size="x-small"
                                    :title="t('actions.add')"
                                    :aria-label="t('actions.add')"
                                    @click=""/>
                            </v-col>
                        </v-row>
                    </template>
                </v-expansion-panel>
            </v-expansion-panels>
        </template>
    </ox-model-edit>
</template>
<script setup lang="ts">
import {inject, useAttrs, watch, onMounted} from 'vue'

import {query, t, useModelList} from 'ox'
import {OxAutocomplete, OxModelEdit, OxField, OxListTable} from 'ox/components'

import {useContactList} from '../composables'
import OxContactInput from './OxContactInput'
import OxContactListName from './OxContactListName'

const repos = useContactList()
const user = inject('user')
const attrs = useAttrs()

const {list, items} = useModelList({
    query: query(repos.contacts)
})

watch(() => attrs.initial?.id, (id) => {
    list.filters.contact_lists__uuid = id
    id && list.load()
})
onMounted(() => {
    const id = attrs.initial?.id
    list.filters.contact_lists__uuid = id
    id && list.load()
})
</script>
