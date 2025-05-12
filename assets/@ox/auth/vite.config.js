import { defineConfig, mergeConfig } from 'vite'
import baseConfig from '../../vite.config.base.ts'


export default mergeConfig(
    baseConfig,
    defineConfig({
        base: 'static/ox_auth',
        build: {
            outDir: "../../../static/ox_auth/",
        },
    })
)
