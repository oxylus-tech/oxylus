<template>
    <v-list v-bind="attrs" selectable v-model:selected="selected" class="grow-1">
        <v-list-item :value="{}" :title="props.owner?.name || '/'"
                prepend-icon="mdi-account-key"
                :nav="!!item" :active="!item"/>
        <v-list-item v-for="item, id in parents" :key="item.id"
            :title="item.name" :value="item"
            prepend-icon="mdi-folder-upload" nav/>
        <v-list-item v-if="item"
            :title="item.name" :value="item" active
            prepend-icon="mdi-folder-open"/>
        <v-list-item v-for="item in items" :key="item.id"
            :title="item.name" :value="item" class="ml-3"
            prepend-icon="mdi-folder" nav/>
    </v-list>
    <v-list v-if="props.owner || item" class="mt-6">
        <v-list-group>
            <template #activator="{props: props_}">
                <v-list-item v-if="item" :title="item.name" prepend-icon="mdi-folder" v-bind="props_"/>
                <v-list-item v-else :title="props.owner?.name || '/'"
                        prepend-icon="mdi-account-key" v-bind="props_"/>
            </template>
            <template v-if="user.can('ox_files.add_folder', item)">
                <v-list-subheader :title="t('models._.title.new', {model: t('models.folders')})"
                        prepend-icon="mdi-plus"/>
                <v-list-item>
                    <v-text-field :placeholder="t('fields.name')" v-model="newFolder.name"/>
                    <div class="text-right">
                        <v-btn prepend-icon="mdi-plus" size="small"
                            :disabled="!newFolder.name"
                            :text="t('actions.add')"
                            @click="newFolder.save()"/>
                    </div>
                </v-list-item>
            </template>
        </v-list-group>
    </v-list>
</template>
<script setup lang="ts">
import { ref, reactive, defineModel, defineEmits, inject, onMounted, useAttrs, watch } from 'vue'

import {query, t} from 'ox'
import { useFolders } from '../composables'

const emits = defineEmits('selected')

const props = defineProps({
    /** Folder id to list children **/
    folder: String,
    /** Owner */
    owner: Object,
})
const repos = useFolders()
const user = inject('user')

const item = ref(props.folder)
const items = reactive([])
const parents = reactive([])
const selected = ref(props.folder)

const findIndex = (list, id) => list.findIndex((v) => v.id == id)


/**
 * Select a folder, by object or uuid
 * It fetches parents and children from API when required.
 */
async function select(folder) {
    if(typeof folder == "string") {
        if(folder == item.value)
            return
        const resp = await query(repos.folders).fetch({id: folder})
        folder = resp.entities[0]
    }
    else if(folder && folder.id == item.id)
        return

    item.value = folder

    if(folder) {
        // remove folder from parents
        const idx = findIndex(parents, folder.id)
        idx != -1 && parents.splice(idx)
    }
    await loadParents(folder)

    const params = { owner__uuid: props.owner?.id }
    if(folder?.id)
        params.parent__uuid = folder.id
    else
        params.root = "true"

    const resp = await query(repos.folders).all({params})
    items.splice(0, items.length, ...resp.entities)
}

/**
 * Sync folder's ancestors to parents list.
 */
async function loadParents(folder) {
    if(!folder?.parent)
        return parents.splice(0)

    if(folder.parent == item.value?.id)
        parents.push(item.value)
    else {
        const idx = findIndex(parents, folder.parent)
        // load parents if not found
        if(idx == -1) {
            const params = { ancestors: folder.id }
            const resp = await query(repos.folders).fetch({params})
            parents.splice(0, parents.length, ...resp.entities)
        }
        // otherwise, splice
        else if(idx < parents.length-1)
            parents.splice(idx+1)
    }
}


const newFolder = reactive({
    name: '',

    async save() {
        try {
            const resp = await repos.folders.api().post(repos.folders.use.meta.url, {
                parent: item.value?.id, name: this.name,
                owner: props.owner.id
            })
            newFolder.value = null;
            items.push(resp.entities[0])
        }
        catch(err) {
            throw t("fields.folder.add_error")
        }
    }
})

watch(selected, (val) => {
    val = val?.[0]
    val && emits('selected', val)
    select(val)
})

onMounted(() => props.owner && select(props.folder))
watch(() => props.owner, () => {
    parents.splice(0)
    item.value = null
    items.splice(0)
    emits('selected', null)
    select()
})
watch(() => props.folder, () => {
    selected.value = null
    props.owner && select(props.folder)
})
</script>
