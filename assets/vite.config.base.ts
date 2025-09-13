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
        emptyOutDir: true,
        manifest: true,

        optimizeDeps: {
            include: ['vuetify'],
        },

        rollupOptions: {
            external: [
                'vue', /*'pinia',*/ 'axios',
                '@oxylus/core', '@oxylus/core/components', '@oxylus/core/vendor'
            ],
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

                    /*const match = id.match(/\/@oxylus\/([^/]+)\//)
                    if (match)
                        return match[1]*/
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
    test: {
        // enable jest-like global test APIs
        globals: true,
        // simulate DOM with happy-dom
        // (requires installing happy-dom as a peer dependency)
        environment: 'happy-dom'
    },
    resolve: {
        extensions: ['.js', '.ts', '.json', '.vue', '.scss'],
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
            //'@oxylus': fileURLToPath(new URL('./ox/src/', import.meta.url)),
            //'@oxylus_locations': fileURLToPath(new URL('./@oxylus/locations/src/', import.meta.url)),
        }
    }
})
