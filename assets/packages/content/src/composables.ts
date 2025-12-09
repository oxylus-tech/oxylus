import { ref, onMounted } from 'vue'
import type {Ref} from 'vue'


export type Renderer = Record<string, any>

export async function fetchRenderer(renderer: Ref<Renderer>, url: string) {
    const resp = await fetch(url)
    const content = await resp.json()

    // blocks are transformed as dict
    content.blocks = content.blocks.reduce((dst, val) => {
        dst[val.name] = val
        return dst
    }, {})
    renderer.value = content
}

export function asyncLoadRenderer(url: string): Ref<Renderer> {
    const renderer = ref({})
    onMounted(() => url && fetchRenderer(renderer, url))
    return renderer
}
