<template>
    <v-table>
        <thead>
            <tr>
                <th>Username</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            <template v-for="user in users">
                <tr>
                    <td>{{ user.username }}</td>
                    <td>{{ user.first_name }}</td>
                    <td>{{ user.last_name }}</td>
                    <td>
                        <ox-action button name="edit" :value="user"/>
                    </td>
                </tr>
            </template>
        </tbody>

    </v-table>
</template>
<script setup>
import {computed, inject, defineProps} from 'vue'

import OxAction from 'ox/components/OxAction.vue'

const repos = inject('repos')
const props = defineProps({
    group: Object,
})

const users = computed(() => repos.users.where('groups_id', (k) => k?.includes(props.group?.id)).get())

</script>
