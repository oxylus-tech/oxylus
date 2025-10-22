import { resolve } from 'path'
import { defineConfig, mergeConfig } from 'vite'
import baseConfig, {staticRoot} from './src/vite.config.base'


export default defineConfig(({mode}) => {
    const baseConf = {...baseConfig}
    if(baseConf.build?.rollupOptions?.input)
        delete baseConf.build.rollupOptions.input

    delete baseConf.build.rollupOptions.chunkFileNames
    delete baseConf.build.rollupOptions.entryFileNames

    return mergeConfig(baseConf, {
        define: { 'process.env.NODE_ENV': '"production"', },
        build: {
            lib: {
                entry : {
                    // main library, including:
                    // - composables
                    // - utils
                    // - app
                    index: resolve(__dirname , 'src/index.ts'),
                    // main library components
                    components: resolve(__dirname, 'src/components/index.ts'),
                    vendor: resolve(__dirname, 'src/vendor.ts'),
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
    })
})
