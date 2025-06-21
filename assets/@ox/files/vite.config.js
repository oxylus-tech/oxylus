import { defineConfig, mergeConfig } from 'vite'
import baseConfig, {staticRoot} from '../../vite.config.base.ts'


export default mergeConfig(
    baseConfig,
    defineConfig({
        base: 'static/ox_files',
        build: {
            outDir: `${staticRoot}/ox_files/`,
            rollupOptions: {
                input: {
                    sfc: 'src/sfc.ts'
                }
            }
        },
    })
)
