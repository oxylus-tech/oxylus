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
        outDir: "../../static/ox",
        sourcemap: true,

        lib : {
              // Could also be a dictionary or array of multiple entry points
            entry : {
                'ox': resolve(__dirname , 'src/lib.ts'),
                'app': resolve(__dirname, 'src/app.ts'),
                'components': resolve(__dirname, 'src/components/index.ts'),
            },
            name : 'ox',
            // the proper extensions will be added
            fileName: (format, entryName) => {
                const extension = format === 'es' ? 'js' : 'cjs';
                return `${entryName}.${extension}`;
            }
        },

        rollupOptions: {
            external: ['vue', 'vuex', 'axios'],
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
        }
    }
})
