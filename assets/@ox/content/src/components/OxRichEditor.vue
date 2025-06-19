<template>
    <template v-for="group, index in menu" :key="index">
        <div class="button-group d-inline-block mr-3">
            <template v-for="info, index in group" :key="index">
                <v-btn
                    variant="outline" size="small" rounded="0"
                    :title="t(info.label)" :aria-label="t(info.label)"
                    :icon="info.icon"
                    @click="actions.edit(info.action, ...(info.args || []))" />
            </template>
        </div>
    </template>

    <editor-content class="editor" :editor="editor" :style="`height: ${props.height}`"/>
</template>
<style>
.editor {
    display: flex;
    flex-direction: column;
}

.editor .tiptap {
    flex-grow: 1;
    border: 1px black solid;
    padding: 0.3em;
}
.editor .tiptap ul, .editor .tiptap ol {
    margin-left: 1.3em;
}

.editor .tiptap ul { list-style: disc }
</style>
<script setup lang="ts">
import { defineEmits, reactive, onUnmounted, watch } from 'vue'
import { t } from 'ox'

import { Editor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import Link from '@tiptap/extension-link'
import TextAlign from '@tiptap/extension-text-align'
import Table from '@tiptap/extension-table'
import TableRow from '@tiptap/extension-table-row'
import TableHeader from '@tiptap/extension-table-header'
import TableCell from '@tiptap/extension-table-cell'


const emits = defineEmits(['update:modelValue'])
const props = defineProps({
    modelValue: {type: String, default: ''},
    height: {type: String, default: "300px;"},
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
    },
}


watch(() => props.modelValue, (val) => {
    if (editor.value && editor.value.getHTML() !== val)
        editor.value.commands.setContent(val, false)
})

onUnmounted(() => editor.destroy())
</script>
