<template>
    <v-input v-bind="attrs" :modelValue="props.modelValue"
            :focused="focused"
            @update:modelValue="modelValueUpdated">
        <template #default>
            <v-container>
                <v-row>
                    <v-label :text="attrs.label"/>
                </v-row>
                <v-row>
                    <template v-for="group, index in menu" :key="index">
                        <div class="button-group d-inline-block mr-3">
                            <template v-for="info, index in group" :key="index">
                                <v-btn
                                    variant="text" size="small"
                                    :title="t(info.label)" :aria-label="t(info.label)"
                                    :icon="info.icon"
                                    @click="actions.edit(info.action, ...(info.args || []))" />
                            </template>
                        </div>
                    </template>

                    <v-btn v-if="!editor.isActive('link')"
                        variant="text" size="small"
                        :title="t('actions.format.set_link')"
                        :aria-label="t('actions.format.set_link')"
                        icon="mdi-link-variant-plus"
                        @click="actions.setLink()"/>
                    <v-btn v-else
                        variant="text" size="small"
                        :title="t('actions.format.set_link')"
                        :aria-label="t('actions.format.set_link')"
                        icon="mdi-link-variant-minus"
                        @click="editor.chain().focus().unsetLink().run()" />

                    <v-menu v-if="placeholders?.length">
                        <template #activator="{props}">
                            <v-btn v-bind="props"
                                variant="text" size="small"
                                :title="t('actions.content.placeholder')"
                                :aria-label="t('actions.content.placeholder')"
                                icon="mdi-variable"/>
                        </template>
                        <v-list
                            density="compact" size="small" menu-icon="mdi-variable"
                            :items="props.placeholders"
                            :itemProps="placeholderProps"
                            return-object
                            @click:select="actions.insertPlaceholder($event.id)">
                        </v-list>
                    </v-menu>
                </v-row>
                <v-row>
                    <editor-content class="editor" :editor="editor"
                        :style="`height: ${props.height}`"
                        @focusin="focused = true" @focusout="focused = false"/>
                </v-row>
            </v-container>
        </template>
    </v-input>
</template>
<style>
.editor {
    width: 100%;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
}

.editor .tiptap:focus {
    border-style: solid;
}

.editor .tiptap {
    padding: 0.3em;
    border: 1px black dotted;
    flex-grow: 1;
}
.editor .tiptap ul, .editor .tiptap ol {
    margin-left: 1.3em;
}

.editor .tiptap ul { list-style: disc }


.tiptap-placeholder-node-view {
    background: #e5f4ff;
    padding: 0.2rem;
    border-radius: 0.2rem;
    color: #0072b1;
    font-weight: 500;
}

.tiptap-placeholder-node {
    color: transparent; /* hide backend text in editor */
}
</style>
<script setup lang="ts">
import { defineEmits, reactive, ref, onUnmounted, useAttrs, watch } from 'vue'
import { t, rules } from '@oxylus/ox'

import { Editor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import Link from '@tiptap/extension-link'
import TextAlign from '@tiptap/extension-text-align'
import Table from '@tiptap/extension-table'
import TableRow from '@tiptap/extension-table-row'
import TableHeader from '@tiptap/extension-table-header'
import TableCell from '@tiptap/extension-table-cell'

import {Placeholder} from '../tiptap'


const emits = defineEmits(['update:modelValue'])
const attrs = useAttrs()
const props = defineProps({
    modelValue: {type: String, default: ''},
    height: {type: String, default: "300px;"},
    placeholders: {type: Array, default: () => []},
})
const focused = ref(false)

const data = reactive({
    // add link input
    link: { url: "", text: "", }
})

const menu = reactive([
    [
        {label: "actions.format.bold", icon: "mdi-format-bold", action: "toggleBold" },
        {label: "actions.format.italic", icon: "mdi-format-italic", action: "toggleItalic" },
        {label: "actions.format.underline", icon: "mdi-format-underline", action: "toggleUnderline" },
        {label: "actions.format.strike", icon: "mdi-format-strikethrough", action: "toggleStrike" },
    ],[
        {label: "actions.format.list", icon: "mdi-format-list-bulleted", action: "toggleBulletList" },
        {label: "actions.format.list.numbered", icon: "mdi-format-list-numbered", action: "toggleOrderedList" },
    ],[
        {label: "actions.format.heading.1", icon: "mdi-format-header-1", action: "toggleHeading", args: [{level:3}] },
        {label: "actions.format.heading.2", icon: "mdi-format-header-2", action: "toggleHeading", args: [{level:4}] },
        {label: "actions.format.heading.3", icon: "mdi-format-header-3", action: "toggleHeading", args: [{level:5}] },
    ], [
        {label: "actions.format.align.left", icon: "mdi-format-align-left", action: "setTextAlign", args: ["left"]},
        {label: "actions.format.align.center", icon: "mdi-format-align-center", action: "setTextAlign", args: ["center"]},
        {label: "actions.format.align.right", icon: "mdi-format-align-right", action: "setTextAlign", args: ["right"]},
    ]

])

const editor = new Editor({
    content: props.modelValue,
    injectCss: false,
    onUpdate: ({editor}) => {
        emits('update:modelValue', editor.getHTML())
    },
    extensions: [
        StarterKit.configure({
            heading: {
                levels: [3, 4, 5]
            }
        }),
        Underline,
        Link.configure({autolink: true}),
        TextAlign.configure({ types: ['heading', 'paragraph'] }),

        // tables
        Table.configure({ resizable: true, }),
        TableRow,
        TableHeader,
        TableCell,

        // oxylus
        Placeholder.configure({placeholders: props.placeholders}),
    ],
})

const actions = {
    chain(action, ...args) {
        return editor.chain().focus()[action](...args)
    },

    edit(action, ...args) {
        this.chain(action, ...args).run()
    },

    setLink() {
        // this.edit("setLink", {href: this.$refs['link-url']})
        const previousUrl = editor.getAttributes('link').href
        const url = window.prompt(t('actions.format.set_link'), previousUrl)
        if(url === null)
            return

        if(url === '') {
            editor.chain().focus().extendMarkRange('link').unsetLink().run()
            return
        }

        const test = rules.url(url)
        if(test !== true) {
            alert(test)
            return this.setLink()
        }

        editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
    },

    insertPlaceholder(obj) {
        editor.chain().focus().insertContent({
            type: "placeholder",
            attrs: obj,
        })
        .run()
    },
}


function modelValueUpdated(val) {
    if (editor.getHTML() !== val)
        editor.commands.setContent(val, false)
}


function placeholderProps(item) {
    return {
        title: item.label,
        subtitle: item.description
            ? `${item.description} | {{ ${item.name} }}`
            : `{{ ${item.name} }}`
    }
}


watch(() => props.modelValue, modelValueUpdated)

onUnmounted(() => editor.destroy())
</script>
