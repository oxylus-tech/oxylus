import { resolve } from 'path'
import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vuetify from 'vite-plugin-vuetify'
import commonjs from '@rollup/plugin-commonjs';


export const staticRoot = fileURLToPath(new URL('../ox/static', import.meta.url))


// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        vuetify({ autoImport: true }),
    ],
    build: {
        sourcemap: true,

        optimizeDeps: {
            include: ['vuetify'],
        },

        rollupOptions: {
            external: ['vue', 'vuex', 'axios', 'ox', 'ox/app', 'ox/components', 'ox/vendor'],
            format: 'esm',
            input: {
                index: "src/index.ts",
                // sfc: "src/sfc.ts",
            },
            output: {
                globals: {
                    vue: 'Vue',
                    vuetify: 'Vuetify',
                },
                manualChunks: (id) => {
                    if(id.includes("vuetify"))
                        return "vuetify"
                },
                assetFileNames: "[name].[ext]",
                chunkFileNames: "[name].js",
                entryFileNames: "[name].js",
            },
            plugins: [commonjs()],
        },
    },
    css: {
        devSourcemap: true,
    },
    resolve: {
        extensions: ['.js', '.ts', '.json', '.vue', '.scss'],
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
            //'@ox': fileURLToPath(new URL('./ox/src/', import.meta.url)),
            //'@ox_locations': fileURLToPath(new URL('./@ox/locations/src/', import.meta.url)),
        }
    }
})
