<template>
    <v-list v-if="owner || folder" class="mt-6">
        <v-list-group v-if="folder && user.can('ox_files.change_folder', folder)" >
            <template #activator="{props: props_}">
                <v-list-item v-if="folder" :title="folder.name" prepend-icon="mdi-folder" v-bind="props_"/>
            </template>
            <ox-model-editor :repo="repos.folders" :initial="folder">
                <template #default="{editor, edited}">
                    <v-list-item v-if="folder">
                        <v-text-field :label="t('fields.name')"
                            v-model="editor.value.name"/>
                        <div class="text-right mb-1" v-if="edited">
                            <v-btn :text="t('actions.save')" size="small"
                                prepend-icon="mdi-content-save"
                                @click.stop="editor.save()"/>
                        </div>
                    </v-list-item>
                </template>
            </ox-model-editor>
        </v-list-group>
        <v-list-group v-if="user.can('ox_files.add_folder', folder)">
            <template #activator="{props}">
                <v-list-item :title="t('models._.title.new', {model: t('models.folders')})"
                        prepend-icon="mdi-plus" v-bind="props"/>
            </template>
            <v-list-item>
                <v-text-field :placeholder="t('fields.name')" v-model="newFolder.name"/>
                <div class="text-right">
                    <v-btn prepend-icon="mdi-plus" size="small"
                        :disabled="!newFolder.name"
                        :text="t('actions.add')"
                        @click="newFolder.save()"/>
                </div>
            </v-list-item>
        </v-list-group>
    </v-list>
</template>
<script setup lang="ts">
import {computed, inject, reactive, onMounted} from 'vue'
import {query, t} from 'ox'
import {OxModelEditor} from 'ox/components'

import {useFolders} from '../composables'
import OxFolderInput from './OxFolderInput'

const props = defineProps({
    owner: String,
    folder: String,
})

const repos = useFolders()
const user = inject('user')
const owner = computed(() => {
    if(props.owner) {
        const res = repos.agents.whereId(props.owner).first()
        if(!res)
            query(repos.agents).fetch({id: props.owner})
        return res
    }
})
const folder = computed(() => props.folder && repos.folders.whereId(props.folder).first())

onMounted(() => {
    if(!owner.value && props.owner)
        query(repos.agents).fetch({id: props.owner})
})

const newFolder = reactive({
    name: '',

    async save() {
        try {
            const resp = await repos.folders.api().post(repos.folders.use.meta.url, {
                parent: props.folder, name: this.name,
                owner: props.owner
            })
            newFolder.value = null;
            items.push(resp.entities[0])
        }
        catch(err) {
            throw t("fields.folder.add_error")
        }
    }
})
</script>
