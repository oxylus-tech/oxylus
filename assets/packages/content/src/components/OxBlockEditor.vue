<template>
    <ox-rich-editor ref="richEditor" v-if="renderer" v-bind="$attrs" v-on="$attrs"
            :editor-extensions="extensions" v-model="value">
        <template #extra-actions="{editor}">
            <v-spacer/>
            <template v-for="block in renderer.blocks">
                <ox-variables-menu v-if="block.group == 'variable'"
                    :label="block.label"
                    :icon="block.icon"
                    :items="renderer.variables"
                    @click:select="actions[block.name](editor, $event)"/>
                <!-- For variable block, extra insert url menu -->
                <ox-variables-menu v-if="block.name == 'variable'"
                    :label="block.label"
                    icon="mdi-link-variant"
                    :items="renderer.variables"
                    @click:select="actions['variable-add-link'](editor, $event)"/>
            </template>
        </template>
    </ox-rich-editor>
</template>
<script setup lang="ts">
/**
 * @component This component add dynamic blocks to editor.
 *
 * It fetches renderer capabilities using provided url, and display accordingly
 * different menu items.
 */
import {defineModel, ref, onMounted, useAttrs, watch} from 'vue'
import {Selection} from "@tiptap/pm/state"

import {t} from '@oxylus/ox'

import * as blocks from '../tiptap'
import {asyncLoadRenderer} from '../composables'
import OxRichEditor from './OxRichEditor'
import OxVariablesMenu from './OxVariablesMenu'


const value = defineModel()
const emits = defineEmits(['update:modelValue'])
const props = defineProps({
    /** Renderer info fetched from API (see python `WithRendererViewSet`) */
    renderer: {type: Object, default: null},
})
const attrs = useAttrs()
const renderer = props.renderer


const extensions = [
    blocks.Variable.configure({block: renderer.blocks?.variable, variables: renderer.variables}),
    blocks.IfVariable.configure({block: renderer.blocks?.ifvariable, variables: renderer.variables}),
]
const richEditor = ref(null)


const actions = {
    chain(editor) {
        return editor.chain().focus()
            .command(({ tr, dispatch }) => {
                const pos = editor.state.selection.$anchor.after(); // enter the block
                tr.setSelection( Selection.near(tr.doc.resolve(pos)) );
                if (dispatch) dispatch(tr);
                return true;
            })
    },

    "variable": (editor, obj) => {
        actions.chain(editor).insertContent({
            type: "variable",
            attrs: obj,
        })
        .run()
    },

    "variable-add-link": (editor, obj) => {
        richEditor.value?.actions.setLink({url: `{{ ${obj.name} }}`, prompt: false})
    },

    "ifvariable": (editor, obj) => {
        actions.chain(editor).insertContent({
            type: "ifvariable",
            attrs: obj,
            content: [],
        })
        .run()
    }
}
</script>
