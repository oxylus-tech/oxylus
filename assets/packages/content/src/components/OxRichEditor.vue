<template>
    <div class="ox-rich-editor">
        <v-input v-bind="attrs" :modelValue="props.modelValue"
                :focused="focused"
                @update:modelValue="modelValueUpdated">
            <template #default>
                <v-container class="ox-rich-editor">
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

                        <v-btn
                            variant="text" size="small"
                            :title="t('actions.content.link.unset')"
                            :aria-label="t('actions.content.link.unset')"
                            icon="mdi-link-variant-minus"
                            @click="editor.chain().focus().unsetLink().run()" />
                        <v-btn v-if="!editor.isActive('link')"
                            variant="text" size="small"
                            :title="t('actions.content.link.set')"
                            :aria-label="t('actions.content.link.set')"
                            icon="mdi-link-variant-plus"
                            @click="actions.setLink()"/>

                        <slot name="extra-actions" :editor="editor"></slot>
                    </v-row>
                    <v-row>
                        <editor-content class="editor" :editor="editor"
                            :style="`height: ${props.height}`"
                            @focusin="focused = true" @focusout="focused = false"/>
                    </v-row>
                </v-container>
            </template>
        </v-input>
    </div>
</template>
<script setup lang="ts">
/**
 * @component Render a rich text editor.
 *
 * When `variables` property is provided, it adds support for adding variable
 * content. However, **this value is expected not to change once mounted.**
 */
import { defineEmits, defineExpose, reactive, ref, onUnmounted, useAttrs, watch } from 'vue'
import { t, rules } from '@oxylus/ox'

import { Editor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import Link from '@tiptap/extension-link'
import TextAlign from '@tiptap/extension-text-align'
/*import Table from '@tiptap/extension-table'
import TableRow from '@tiptap/extension-table-row'
import TableHeader from '@tiptap/extension-table-header'
import TableCell from '@tiptap/extension-table-cell'*/



const emits = defineEmits(['update:modelValue'])
const attrs = useAttrs()
const props = defineProps({
    /** Actual model value to edit */
    modelValue: {type: String, default: ''},
    /** Editor's height in pixels. **/
    height: {type: String, default: "300px;"},
    /** Provide extra extensions to add to tiptap editor instance at init */
    editorExtensions: {type: Array, default: () => []},
    variables: {type: Array, default: () => []},
})
const focused = ref(false)

const menu = reactive([
    [
        {label: "actions.content.bold", icon: "mdi-format-bold", action: "toggleBold" },
        {label: "actions.content.italic", icon: "mdi-format-italic", action: "toggleItalic" },
        {label: "actions.content.underline", icon: "mdi-format-underline", action: "toggleUnderline" },
        {label: "actions.content.strike", icon: "mdi-format-strikethrough", action: "toggleStrike" },
    ],[
        {label: "actions.content.list", icon: "mdi-format-list-bulleted", action: "toggleBulletList" },
        {label: "actions.content.list.numbered", icon: "mdi-format-list-numbered", action: "toggleOrderedList" },
    ],[
        {label: "actions.content.heading.1", icon: "mdi-format-header-1", action: "toggleHeading", args: [{level:3}] },
        {label: "actions.content.heading.2", icon: "mdi-format-header-2", action: "toggleHeading", args: [{level:4}] },
        {label: "actions.content.heading.3", icon: "mdi-format-header-3", action: "toggleHeading", args: [{level:5}] },
    ], [
        {label: "actions.content.align.left", icon: "mdi-format-align-left", action: "setTextAlign", args: ["left"]},
        {label: "actions.content.align.center", icon: "mdi-format-align-center", action: "setTextAlign", args: ["center"]},
        {label: "actions.content.align.right", icon: "mdi-format-align-right", action: "setTextAlign", args: ["right"]},
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
        /*Table.configure({ resizable: true, }),
        TableRow,
        TableHeader,
        TableCell,*/

        ...props.editorExtensions
    ],
})

const actions = {
    /** Create Tiptap editor chain for the provided action and arguments */
    chain(action, ...args) {
        return editor.chain().focus()[action](...args)
    },

    /** Run an an action using provided argument */
    edit(action, ...args) {
        this.chain(action, ...args).run()
    },

    /** Set link on current selection */
    setLink({url=null, prompt=true}={}) {
        // this.edit("setLink", {href: this.$refs['link-url']})
        if(prompt) {
            url = url || editor.getAttributes('link').href
            url = window.prompt(t('actions.content.link.set'), url)
        }
        if(url === null)
            return

        if(url === '') {
            editor.chain().focus().extendMarkRange('link').unsetLink().run()
            return
        }

        if(prompt) {
            const test = rules.url(url)
            if(test !== true)
                return this.setLink()
        }

        editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
    },
}


function modelValueUpdated(val) {
    if (editor.getHTML() !== val)
        editor.commands.setContent(val, false)
}


watch(() => props.modelValue, modelValueUpdated)

onUnmounted(() => editor.destroy())

defineExpose({
    /** Actions on Tiptap editor. */
    actions,
    /** Tiptap editor */
    editor,

})
</script>
