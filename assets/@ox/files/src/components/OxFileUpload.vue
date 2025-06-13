<template>
    <div
        class="ox-file-upload"
        :class="{'drag-over': isDragging}"
        @dragover.prevent="isDragging = true"
        @dragleave.prevent="isDragging = false"
        @drop.prevent="handleDrop"
    >
        <input ref="fileInput" type="file"
            :name="props.name" :accept="props.accept"
            class="hidden-input"
            @change="handleFileChange" />

        <div class="previews mt-4">
            <div class="preview">
                <template v-if="preview?.isImage">
                    <img :src="preview.preview" :alt="preview.name" />
                </template>
                <template v-else-if="preview">
                    <v-icon class="file-icon" :icon="preview.icon" />
                    <div class="filename">{{ file?.name }}</div>
                </template>
                <template v-else>
                    <v-icon size="x-large">mdi-cloud-upload</v-icon>
                    <div class="filename">{{ t('actions.select_file.help') }}</div>
                </template>
            </div>
        </div>

        <v-btn @click="triggerFileInput" prepend-icon="mdi-upload"
            :text="t('actions.select_file')"/>
    </div>
</template>

<script setup lang="ts">
import { defineExpose, defineEmits, ref, defineModel, watch } from 'vue'
import { VIcon } from 'vuetify/components'
import { t } from 'ox'

interface FilePreview {
    preview?: string
    name: string
    isImage: boolean
    icon: string
}

const emits = defineEmits(['change'])

const props = defineProps({
    /** Input field name */
    name: String,
    /** Input field accept */
    accept: {type: String, default: '*/*'}

})

/**
 * Selected file as File instance.
 */
const file: File = defineModel()

const fileInput = ref<HTMLInputElement | null>(null)
const isDragging = ref(false)
const preview = ref<FilePreview | null>(null)

/** Icons by file type */
const typeIcons = {
    _default: 'mdi-file-outline',
    pdf: 'mdi-file-pdf',
    text: 'mdi-file-document-outline',
    audio: 'mdi-file-music-outline',
    video: 'mdi-file-video-outline',
    zip:/*|| file.name.endsWith('.zip')) return*/ 'mdi-folder-zip',
}


const triggerFileInput = () => fileInput.value?.click()

const handleFileChange = (event: Event) => {
    const input = event.target as HTMLInputElement
    if (input.files?.[0])
        handleFile(input.files[0])
    else
        preview.value = null
}

const handleDrop = (event: DragEvent) => {
    isDragging.value = false
    const files = event.dataTransfer?.files
    if(files) {
        fileInput.files = event.dataTransfer.files
        // handleFile(droppedFile)
    }
}

const handleFile = (newFile: File) => {
    const isImage = newFile.type.startsWith('image/')
    const icon = getIconForFile(newFile)

    const entry: FilePreview = {
        isImage,
        icon,
    }
    file.value = newFile

    if (isImage) {
        const reader = new FileReader()
        reader.onload = () => {
            entry.preview = reader.result as string
            preview.value = entry
        }
        reader.readAsDataURL(newFile)
    }
    else
        preview.value = entry

    emits("change", file.value)
}


const getIconForFile = (file: File): string => {
    let icon = typeIcons[file.type]
    return icon || (
        file.name.endsWith('.zip') ? typeIcons.zip : typeIcons._default
    )
}

// watch(file, (val) => (val != preview?.file) && handleFile(val))

defineExpose({file, preview})
</script>

<style scoped>
.ox-file-upload {
    border: 2px dashed #ccc;
    padding: 16px;
    border-radius: 12px;
    text-align: center;
    transition: background-color 0.2s ease;
}
.ox-file-upload.drag-over {
    /*background-color: #f5f5f5;*/
}
.hidden-input {
    display: none;
}
.previews {
    display: flex;
    justify-content: center;
    margin-top: 1rem;
    min-height: 100px;
}
.preview {
    text-align: center;
    max-width: 90%;
}
.preview img {
    max-height: 400px;
    width: 100%;
    object-fit: contain;
    border-radius: 6px;
}
.file-icon {
    font-size: 48px;
    color: #888;
}
.filename {
    margin-top: 4px;
    font-size: 0.85rem;
    color: #555;
    word-break: break-word;
}
</style>
