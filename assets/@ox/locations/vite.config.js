import { defineConfig, mergeConfig } from 'vite'
import baseConfig, {staticRoot} from '../../vite.config.base.ts'


// https://vitejs.dev/config/
export default mergeConfig(
    baseConfig,
    defineConfig({
        base: 'static/ox_locations',
        build: {
            outDir: `${staticRoot}/ox_locations/`,
        },
    })
)
