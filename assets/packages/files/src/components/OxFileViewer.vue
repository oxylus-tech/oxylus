<template>
    <v-card :title="item?.name" style="max-height: 90vh">
      <v-carousel v-model="item" hide-delimiters max-height="100%">
          <v-carousel-item v-for="item in items"
              :key="key" :value="item"
              :src="item?.[props.previewValue]"
              />
      </v-carousel>

      <v-card-actions>
        <ox-action :href="item.file" icon="mdi-download" button
            :title="t('actions.download')" />
        <slot name="actions" :item="item" :items="items" :viewer="viewer"/>
        <v-spacer/>
        <slot name="actions.append" :item="item" :items="items" :viewer="viewer"/>
      </v-card-actions>
    </v-card>
</template>
<script setup lang="ts">
/**
 * @component This component provides a v-card displaying a file preview.
 */
import { computed, defineEmits, defineExpose, defineModel, ref, reactive } from 'vue'
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
const viewer = {
    /** Current item **/
    item,

    /** Provided list of items **/
    items: computed(() => props.items),

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
}

defineExpose(viewer)
</script>
