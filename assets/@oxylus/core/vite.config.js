import { resolve } from 'path'
import { fileURLToPath, URL } from 'node:url'

import { defineConfig, mergeConfig } from 'vite'
import baseConfig, {staticRoot} from '../../vite.config.base.ts'


const appConf = {
    base: resolve('static/ox_core'),
    build: {
        outDir: `${staticRoot}/ox_core/`,
    },
}


const libConf = {
    base: resolve('static/ox'),
    define: {
        'process.env.NODE_ENV': '"production"',
    },
    build: {
        outDir: `${staticRoot}/ox/`,
        lib: {
            entry : {
                // main library, including:
                // - composables
                // - utils
                // - app
                lib: resolve(__dirname , 'src/lib.ts'),
                // main library components
                components: resolve(__dirname, 'src/components/index.ts'),
                vendor: resolve(__dirname, 'src/vendor.ts'),
                // core app
                index: resolve(__dirname, 'src/index.ts'),
            },
            name : 'oxylus',
            // the proper extensions will be added
            fileName: (format, entryName) => {
                const extension = format === 'es' ? 'js' : 'cjs';
                return `${entryName}.${extension}`;
            },
            formats: ['es'],
        }
    },
}


export default defineConfig(({mode}) => {
    if(mode == "lib") {
        const baseConf = {...baseConfig}
        if(baseConf.build?.rollupOptions?.input)
            delete baseConf.build.rollupOptions.input

        delete baseConf.build.rollupOptions.chunkFileNames
        delete baseConf.build.rollupOptions.entryFileNames

        return mergeConfig(baseConf, libConf)
    }
    return mergeConfig(baseConfig, appConf)
})
