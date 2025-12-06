import { Node } from '@tiptap/core'

/**
 * Provide a variable placeholder in tiptap rich text editor.
 *
 * User configure extension with a list of variables as ``{name, label, description}``
 * to sanitize user input.
 *
 * The node has also those values as attributes for rendering a single variable.
 *
 * Rendered node is ``<span>``.
 */
export const Placeholder = Node.create({
    name: 'placeholder',

    inline: true,
    group: 'inline',
    atom: true,

    addOptions() {
        return {
            variables: [],
        }
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
                    const name = el.dataset.placeholder
                    const ph = this.options.variables.find(p => p.name == name)

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



export const Conditional = Node.create({
  name: 'conditional',

  group: 'block',
  content: 'inline*',
  atom: false,
  draggable: false,

  addAttributes() {
    return {
      condition: { default: '', },
      label: {default: '', }
    }
  },

  parseHTML() {
    return [
      {
        tag: 'div[data-condition]',
        getAttrs: el => ({
          condition: el.getAttribute('data-condition') || '',
        }),
      },
    ]
  },

  renderHTML({ node, HTMLAttributes }) {
    return [
      'div',
      {
        'data-condition': node.attrs.condition,
        ...HTMLAttributes,
      },
      0, // render inner content
    ]
  },

  addNodeView() {
    return ({ node, editor, getPos }) => {
      const container = document.createElement('div')
      container.classList.add('tiptap-conditional-node')

      // top label
      const label = document.createElement('div')
      label.classList.add('tiptap-conditional-label')
      label.innerHTML = (
          '<span class="v-icon"><i class="mdi mdi-application-variable-outline"></i></span> ' +
          node.attrs.label || node.attrs.condition
      )

      // editable content
      const content = document.createElement('div')
      content.classList.add('tiptap-conditional-content')
      content.contentEditable = 'true'

      container.appendChild(label)
      container.appendChild(content)

      return { dom: container, contentDOM: content, }
    }
  },
})
