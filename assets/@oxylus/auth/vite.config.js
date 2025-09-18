import { defineConfig, mergeConfig } from 'vite'
import baseConfig, {staticRoot} from '@oxylus/ox/vite.config.base'


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
