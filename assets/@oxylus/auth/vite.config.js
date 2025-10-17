import { defineConfig, mergeConfig } from 'vite'
import baseConfig, {staticRoot} from '../ox/src/vite.config.base'


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
