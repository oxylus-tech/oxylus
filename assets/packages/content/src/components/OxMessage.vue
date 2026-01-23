<template>
    <v-hover>
        <template #default="{ isHovering, props: $props }">
            <v-list-item :value="props.item.id" v-bind="attrs"
                        :class="listItemClass">
                <div v-if="!slots.title"
                        class="d-flex flex-row ga-1 text-caption">
                    <span class="flex-grow-1 text-bold">
                        {{ item.author == props.userAuthor ? t('labels.you') : item.author_name }}
                    </span>
                    <v-tooltip>
                        <template #activator="{props: $props}">
                            <time v-bind="$props" :datetime="item.updated">
                                <span v-natural-time="item.updated" class="mr-2"/>
                                <v-icon v-if="item.created != item.updated" size="small" class="pb-1">mdi-pencil</v-icon>
                            </time>
                        </template>

                        <div>
                            <div>
                                <v-icon class="mr-3">mdi-plus-box</v-icon>
                                <b>{{ t('labels.created') }}:</b>
                                {{ item.created }}
                            </div>
                            <div v-if="item.updated && item.updated != item.created">
                                <v-icon class="mr-3">mdi-pencil</v-icon>
                                <b>{{ t('labels.updated') }}:</b>
                                {{ item.updated }}
                            </div>
                        </div>
                    </v-tooltip>
                    <slot name="title.append"/>
                </div>

                <v-card v-bind="$props"
                        :color="props.color"
                        :variant="props.variant || 'outlined'"
                        :rounded="!props.nested">
                    <ox-message v-if="!props.nested && props.item.source?.id"
                        :item="props.item.source"
                        :current-author="props.currentAuthor"
                        variant="flat" color="secondary" nested />
                    <v-card-text class="pa-2">
                        <div class="ox-message-content overflow-y-hidden" v-html="item.content"
                            :style="{'max-height': props.nested ? '6rem' : null}"/>

                        <v-overlay v-if="isHovering && (slots.actions || slots.info)"
                                :scrim="false"
                                content-class="w-100 bottom-0 d-flex flex-row pointer-pass-through pa-2"
                                contained model-value no-click-animation persistent>
                        </v-overlay>
                    </v-card-text>
                </v-card>
                <div :style="{visibility: true || isHovering ? 'visible':'hidden'}" class="d-flex flex-row">
                    <div class="d-flex flex-row ga-1">
                        <slot name="info" :item="props.item"/>
                    </div>
                    <v-spacer/>
                    <div class="d-flex flex-row ga-1">
                        <slot name="actions" :item="props.item"/>
                    </div>
                </div>
            </v-list-item>
        </template>
    </v-hover>
</template>
<script setup lang="ts">
import { computed, useSlots, useAttrs } from 'vue'
import { t } from '@oxylus/ox'

const slots = useSlots()
const attrs = useAttrs()
const props = defineProps({
    item: Object,
    variant: {type: String},
    color: {type: String, default: 'primary'},
    userAuthor: {type: [String,Number]},
    nested: Boolean,
})

const listItemClass = computed(() => ({
    'position-relative': true,
    'pa-2': props.nested,
    'pa-0': !props.nested,
    //'ml-10': !props.nested && props.userAuthor == props.item?.author,
}))
</script>
