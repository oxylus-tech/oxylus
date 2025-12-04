import { Node } from '@tiptap/core'

export const Placeholder = Node.create({
    name: 'placeholder',

    inline: true,
    group: 'inline',
    atom: true,

    addOptions() {
        return {
            placeholders: [],
        }
    },

    getPlaceholder(name) {
        return this.options.placeholders.find(p => p.name == name)
    },

    addAttributes() {
        return {
            name: { default: null, },
            label: { default: null, },
            description: { default: null, },
        }
    },

    parseHTML() {
        return [
            {
                tag: 'span[data-placeholder]',
                getAttrs: el => {
                    const name = element.datalist.get("placeholder")
                    const ph = this.getPlaceholder(name)

                    if(!ph)
                        return false
                    return {name: ph.name, label: ph.label, description: ph.description}
                }
            },
        ]
    },

    renderHTML({ node }) {
        // stored version (backend): {{ name }}
        return [
            'span',
            {
                'data-placeholder': node.attrs.name,
                class: 'tiptap-placeholder-node',
            },
            `{{ ${node.attrs.name} }}`,
        ]
    },

    addNodeView() {
        return ({ node, editor }) => {
            const dom = document.createElement('span')
            dom.classList.add('tiptap-placeholder-node-view')
            dom.contentEditable = 'false'
            dom.innerText = node.attrs.label || node.attrs.name
            if(node.attrs.description)
                dom.setAttribute("title", node.attrs.description)
            return { dom }
        }
    },
})
