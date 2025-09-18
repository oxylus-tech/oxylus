import { defineConfig, mergeConfig } from 'vite'
import baseConfig from '@oxylus/ox/vite.config.base'


export default mergeConfig(
    baseConfig,
    defineConfig({
        build: {
            rollupOptions: {
                input: {
                    sfc: 'src/sfc.ts'
                }
            }
        },
    })
)
