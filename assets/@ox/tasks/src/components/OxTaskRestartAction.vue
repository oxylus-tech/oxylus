<template>
    <ox-action
        icon="mdi-restart" :title="t('actions.task.restart')"
        v-bind="attrs"
        :run="run"/>
</template>
<script setup lang="ts">
import { inject, useAttrs } from "vue"
import { t } from "ox"
import {OxAction} from "ox/components"

import {useTasksModels} from "../composables"

const repos = inject("repos")
const attrs = useAttrs()

async function run(user, item) {
    const repo = repos[item.constructor.entity]
    return await repo.api().post(item.$url("restart"), {}, {save:true})
}

</script>
