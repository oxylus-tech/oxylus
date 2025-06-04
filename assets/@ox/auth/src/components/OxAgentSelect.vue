<template>
    <template v-if="props.menu">
        <v-menu>
            <template #activator="{props: $props}">
                <v-btn v-bind="$props" :prepend-icon="props.icon" :text="item?.name"  />
            </template>
            <v-list :items="items" item-title="name" item-value="id"
                selectable v-model:selected="value"
                />
        </v-menu>
    </template>
    <template v-else>
        <v-select :items="items" item-title="name" item-value="id"
            :prepend-icon="props.icon"
            v-model="value" v-bind="attrs"/>
    </template>
</template>
<script setup lang="ts">
/**
 * This component displays a v-select box containing available agents
 * for the provided user (if none provided, use `inject("user")` to get
 * current user.
 */
import { computed, defineModel, defineExpose, inject, useAttrs, onMounted, ref, watch} from 'vue'
import { query } from 'ox'
import { useAgents } from '../composables'

const attrs = useAttrs()
const props = defineProps({
    /** Get agents for this user */
    user: {type: Object, default: null},
    /** If True, use v-menu instead */
    menu: Boolean,
    /** Prepend icon */
    icon: {type: String, default: "mdi-account-key"},
})
const value = defineModel()
const repos = useAgents()
const items = ref([])
const item = ref(null)

var last = null

const user = inject('user')

async function fetch(userId) {
    if(userId && userId != last) {
        last = userId
        const resp = await query(repos.agents).fetch({path: '/user', params: {user: userId}})
        items.value = resp.response.data
        item.value = items.value.find((v) => v.user == userId)
        value.value = item.value.id
    }
}

onMounted(() => fetch(props.user?.id || user.id))
watch(() => props.user, (val) => fetch(val?.id || user.id))
watch(value, (val) => {
    item.value = items.value.find((v) => v.id == val)
})

defineExpose({ value, item, items })
</script>
