import { resolve } from 'path'
import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
// import vueI18n from '@intlify/unplugin-vue-i18n/vite'
import commonjs from '@rollup/plugin-commonjs'


// https://vitejs.dev/config/
export default defineConfig({
    base: resolve('static/ox_core'),
    plugins: [
        vue(),
        vuetify(),
        /*vueI18n({
            include: [resolve(__dirname, './src/locales/**')],
        })*/
    ],
    define: {
        'process.env.NODE_ENV': '"production"',
    },
    build: {
        outDir: "../../ox/static/ox",
        sourcemap: true,

        lib : {
            entry : {
                // main library, including:
                // - composables
                // - utils
                // - app
                'ox': resolve(__dirname , 'src/lib.ts'),
                // main library components
                'components': resolve(__dirname, 'src/components/index.ts'),
                'vendor': resolve(__dirname, 'src/vendor.ts'),
            },
            name : 'ox',
            // the proper extensions will be added
            fileName: (format, entryName) => {
                const extension = format === 'es' ? 'js' : 'cjs';
                return `${entryName}.${extension}`;
            }
        },

        rollupOptions: {
            external: [
                'vue', 'vuex', 'axios',
                'ox', 'ox/components', 'ox/vendor',
            ],
            /*input: {
                index: "src/index.js",
                lib: "src/lib.js",
            },*/
            output: {
                globals: {
                    vue: 'Vue',
                    vuetify: 'Vuetify',
                    vuex: 'Vuex',
                },
                assetFileNames: "[name].[ext]",
                // chunkFileNames: "[name].js",
                // entryFileNames: "[name].js",
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
            '@composables': fileURLToPath(new URL('./src/composables', import.meta.url)),
        }
    }
})
