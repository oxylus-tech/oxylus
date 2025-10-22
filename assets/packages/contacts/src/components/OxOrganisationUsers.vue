<template>
    <v-table>
        <thead>
            <tr>
                <th>{{ t('fields.username') }}</th>
                <th>{{ t('fields.first_name') }}</th>
                <th>{{ t('fields.last_name') }}</th>
                <th>{{ t('fields.actions') }}</th>
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

import {t, query} from '@oxylus/ox'
import {OxAction} from '@oxylus/ox/components'

const repos = inject('repos')
const props = defineProps({
    group: Object,
})

const users = computed(() => repos.users.where('groups_id', (k) => k?.includes(props.group?.id)).get())

</script>
