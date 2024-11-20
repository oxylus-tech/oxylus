import { resolve } from 'path'
import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
import commonjs from '@rollup/plugin-commonjs'


// https://vitejs.dev/config/
export default defineConfig({
    base: resolve('static/ox_core'),
    plugins: [
        vue(),
        vuetify(),
    ],
    build: {
        outDir: "../../static/ox_core",
        sourcemap: true,

        rollupOptions: {
            external: ['vue', 'vuex', 'axios', 'ox', 'ox/app', 'ox/components'],
            input: {
                index: "src/index.ts",
                // sfc: "src/sfc.js",
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
        }
    }
})
