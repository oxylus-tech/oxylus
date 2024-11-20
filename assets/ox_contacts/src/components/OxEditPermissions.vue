<template>
    <v-table class="mb-2 " density="compact">
        <thead>
            <tr class="border-b-md font-weight-bold">
                <th class="font-weight-bold">Element</th>
                <template v-for="label of crudLabels">
                    <th>{{ label }}</th>
                </template>
            </tr>
        </thead>
        <tbody>
            <template v-for="(cts, label) in contentTypes">
                <tr>
                   <th colspan="6">{{ label }}</th>
                </tr>
                <template v-for="ct in cts">
                    <tr>
                        <td class="text-top">{{ ct.model_verbose }}</td>
                        <template v-for="perm in ctPermissions[ct.id].crud">
                            <td>
                                <v-checkbox-btn color="primary" class="mb-2 d-inline"
                                    v-model="model" :value="perm.id">
                                </v-checkbox-btn>
                                <template v-if="user">
                                    <template v-if="groupPermissions[perm.id]">
                                        <template v-for="group of groupPermissions[perm.id]">
                                            <v-chip size="x-small" density="comfortable" prepend-icon="mdi-check" class="mb-2" color="primary">
                                                {{ group.name }}
                                            </v-chip>
                                        </template>
                                    </template>
                                    <template v-if="user.is_superuser">
                                        <v-chip size="x-small" density="comfortable" prepend-icon="mdi-check" class="mb-2" color="primary">
                                            Super User
                                        </v-chip>

                                    </template>
                                </template>
                            </td>
                        </template>
                    </tr>
                    <template v-if="ctPermissions[ct.id].extra">
                        <tr>
                            <td></td>
                            <td colspan="4">
                                <template v-for="perm in ctPermissions[ct.id].extra">
                                    <div>
                                        <v-checkbox-btn color="primary" class="mb-2"
                                            :label="perm.name"
                                            v-model="value" :value="perm.id">
                                        </v-checkbox-btn>
                                        <template v-if="user && groupPermissions[perm.id]">
                                            <template v-for="group of groupPermissions[perm.id]">
                                                <v-chip size="x-small" density="comfortable" prepend-icon="mdi-check" class="mb-2" color="primary">
                                                    {{ group.name }}
                                                </v-chip>
                                            </template>
                                        </template>
                                    </div>
                                </template>
                            </td>
                        </tr>
                    </template>
                </template>
            </template>
        </tbody>
    </v-table>
</template>
<style scoped>
tbody th { font-weight: 600 !important; }
tbody td { vertical-align: baseline; }
tbody td:not(:first-child) {
    border-left: 2px rgba(var(--v-border-color), var(--v-border-opacity)) solid;
}

</style>
<script setup>
import { inject, computed, ref, defineProps, defineModel, toRefs } from 'vue'
import { VChip } from 'vuetify/components/VChip'
import { VTable } from 'vuetify/components/VTable'
import { VCheckboxBtn } from 'vuetify/components/VCheckbox'
import { VSpacer } from 'vuetify/components'

import { collectionEditor} from "ox/composables/edit"


const repos = inject("repos")
const models = inject("models")


const model = defineModel()
const {user, group} = defineProps({
    /**
    * User model instance to edit permissions from.
    * It must be loaded with `groups`.
    */
    user: {type: Object, default: null},
    /**
    * Group model instance to edit permissions from when `user` is not provided.
    */
    group: {type: Object, default: null},
})


const cts = repos.contentTypes.with("permissions").get()

/**
 * All models that are linked to permissions grouped by application `verbose_name`.
 */
const contentTypes = Object.groupBy(cts, (ct) => ct.app_verbose)


/**
 * When `user` is provided, a dict of `{permission_id: [...group]}`.
 * Give info from which group user has the permission from.
 */
const groupPermissions = computed(() => {
    if(!user)
        return null

    const results = {}
    const groups = repos.groups.whereId(user.groups_id).get()
    for(var group of groups)
        for(var id of group.permissions_id)
            results[id] = [...(results[id] || []), group]
    return results
})


const crudLabels = ["View", "Add", "Change", "Delete"]
const crudActions = ["view", "add", "change", "delete"]
const ctPermissions = computed(() => {
    const result = []
    for(var ct of cts) {
        const crud = crudActions.map(a => ct.getPermission(a))
        const extra = ct.permissions.filter(p => !crudActions.includes(p.action))

        result[ct.id] = {crud, extra}
    }
    return result
})


</script>
