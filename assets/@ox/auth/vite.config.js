import { defineConfig, mergeConfig } from 'vite'
import baseConfig, {staticRoot} from '../../vite.config.base.ts'


export default mergeConfig(
    baseConfig,
    defineConfig({
        base: 'static/ox_auth',
        build: {
            outDir: `${staticRoot}/ox_auth/`,
            rollupOptions: {
                input: {
                    sfc: 'src/sfc.ts'
                }
            }
        },
    })
)
