import { defineConfig, mergeConfig } from 'vite'
import baseConfig from '../ox/src/vite.config.base'


export default mergeConfig(
    baseConfig,
    defineConfig({
        build: {
            rollupOptions: {
                input: {
                    sfc: 'src/sfc.ts'
                },

                /*
                output: {
                    manualChunks: (id) => {
                        if(id.includes('tiptap'))
                            return 'tiptap'
                        return null
                    }
                }
                */
            }
        },
    })
)
