<template>
    <v-carousel v-model="item" height="90vh" hide-delimiters class="ox-file-viewer">
        <v-carousel-item v-for="item in items"
                :key="key" :value="item">
            <div class="h-100 flex-column py-auto position-relative">
                <v-spacer/>
                <div class="position-relative" style="max-height:100%;">
                    <div class="overflow-auto h-100">
                        <v-img
                            :src="item?.[props.previewValue]"
                            :style="{cursor: viewer.zoom ? 'zoom-out' : 'zoom-in'}"
                            :max-height="viewer.zoom ? 'none': '100%'"
                            @click="viewer.zoom = !viewer.zoom"
                            />
                    </div>

                    <v-overlay v-if="item" :scrim="false"
                            content-class="w-100 flex-column align-center justify-space-between pointer-pass-through py-3"
                            contained model-value no-click-animation persistent>
                        <v-sheet :key="item.id" rounded="xl">
                            <div class="d-flex flex-row">
                                <v-list-item :subtitle="item.name" class="pa-1"/>
                                <slot name="actions.close" />
                            </div>
                        </v-sheet>
                    </v-overlay>

                    <v-overlay v-if="item" :scrim="false"
                            content-class="w-100 bottom-0 flex-row pointer-pass-through py-3"
                            style="bottom: 0px; position: absolute;"
                            contained model-value no-click-animation persistent>
                        <v-spacer/>
                        <ox-action :href="item.file" icon="mdi-download" button
                            variant="elevated"
                            :title="t('actions.download')" />
                        <slot name="actions" :item="item" :items="items" :viewer="viewer"/>
                        <v-spacer/>
                    </v-overlay>
                </div>
                <v-spacer/>
            </div>
        </v-carousel-item>
    </v-carousel>
</template>
<script setup lang="ts">
/**
 * @component This component provides a v-card displaying a file preview.
 */
import { computed, defineEmits, defineExpose, defineModel, ref, reactive, watch } from 'vue'
import { t } from '@oxylus/ox'
import { OxAction } from '@oxylus/ox/components'


const props = defineProps({
    /**
     * Item's list of items.
     *
     * When provided enable various capacities as next/prev buttons.
     * Items must be an array containing the exact object instance of item.
     */
    items: Array,
    /** Which item field to use for preview url. **/
    previewValue: {type: String, default: 'preview' },
})

/** Current item **/
const item = defineModel()

/**
 * Simple controller to interact with the viewer.
 */
const viewer = reactive({
    /** Current item **/
    item,

    /** Provided list of items **/
    items: computed(() => props.items),

    zoom: false,

    /**
     * Go to item by path relative to current one.
     */
    go(dir) {
        if(!props.items?.length)
            return

        const items = props.items
        let idx = items.findIndex((i) => (i.id == item.value.id))
        idx = this.normIndex(idx+dir)

        item.value = items[idx]
    },

    /**
     * Normalize item index.
     */
    normIndex(index) {
        const items = props.items
        if(index >= items.length)
            return 0
        else if(index < 0)
            return items.length-1
        return index
    }
})

watch(item, () => { viewer.zoom = false })

defineExpose(viewer)
</script>
