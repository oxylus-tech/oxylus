<template>
    <div class="d-flex h-100" :style="{'flex-direction': props.reverse ? 'column-reverse': 'column'}">
        <div class="overflow-y-auto flex-grow">
            <ox-model-list ref="modelList" v-bind="attrs"
                    :filters="{thread__uuid: props.thread}"
                    load>
                <template #default="{items}">
                    <ox-message v-for="item in items"
                        :key="item.id" :item="item" :value="item.id" >

                        <template #actions="{item}">
                            <template v-if="props.canSend">
                                <v-btn v-if="props.canUpdate && item.author == props.author"
                                    icon="mdi-pencil" variant="text" size="small" />
                                <v-btn
                                    icon="mdi-reply" variant="text" size="small"
                                    @click="state.source = item"/>
                            </template>
                        </template>
                    </ox-message>
                </template>

            </ox-model-list>
        </div>
        <v-card elevation="10" v-if="props.canSend"
                :class="[props.reverse ? 'mb-5': 'mt-3']">
            <v-card-text>
                <h4>{{ t('ox_content.message.actions.post') }}</h4>
                <ox-message v-if="state.source"
                        :item="state.source" variant="flat" color="secondary"
                        nested>
                    <template #title.append>
                        <v-btn icon="mdi-close" color="error" size="xsmall"
                            :label="t('actions.remove')"
                            :aria-label="t('actions.remove')"
                            @click="state.source = null"/>
                    </template>
                </ox-message>
                <v-form ref="form" class="mt-3 d-flex flex-row align-start ga-7 justify-center"
                        :disabled="state.loading"
                        @submit.prevent="submit">
                    <slot name="form.start" :state="state"/>
                    <input type="hidden" v-if="state.source" name="source"
                        :value="state.source.id" />
                    <div class="flex-grow-1">
                        <div class="d-flex flex-row">
                            <slot name="editor.prepend" :state="state"/>
                            <ox-rich-editor v-model="state.content"
                                name="content" class="h-100"
                                height="100%" max-height="100%" hide-toolbar/>
                            <slot name="editor.append" :state="state"/>
                        </div>
                    </div>
                    <v-btn
                        type="submit" icon="mdi-send" color="primary" size="small"
                        :title="t('actions.send')"
                        :aria-label="t('actions.send')"
                       />
                    <slot name="form.end" :state="state"/>
                </v-form>
            </v-card-text>
        </v-card>
    </div>
</template>
<script setup="ts">
/**
 * @component Display a list of message and optional editor.
 *
 * Takes {@link OxModelList} properties as input.
 */
import { reactive, ref, useAttrs } from 'vue'
import { t, formToJson } from '@oxylus/ox'
import { OxModelList } from '@oxylus/ox/components'
import OxRichEditor from './OxRichEditor'
import OxMessage from './OxMessage'

const attrs = useAttrs()
const props = defineProps({
    /** Current author id */
    author: {type: [String, Number]},
    /** Current thread id. Used for message load and post. **/
    thread: String,
    /** Hidden fields to add to form **/
    hiddenFields: Object,
    /** URL used to POST data */
    postURL: String,
    /** User can send messages **/
    canSend: Boolean,
    /** User can edit his messages **/
    canUpdate: Boolean,
    /** Editor is displayed at the top of the comment list */
    reverse: Boolean,
})
const modelList = ref(null)
const form = ref(null)
const state = reactive({
    loading: false,
    content: "",
    source: null,
})

async function submit(event) {
    state.loading = true

    const data = formToJson(event.target)
    if(props.thread)
        data.thread = props.thread

    const resp = await modelList.value.list.query.post(data)
    state.loading = false

    // TODO: list.append(id, append) => requires commit results
    modelList.value.list.load()
    state.content = ''

}
</script>
